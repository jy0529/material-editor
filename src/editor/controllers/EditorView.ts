import { AmbientLight, Color, PerspectiveCamera, Scene, TextureLoader, Vector2, WebGLRenderer, WebGLRenderTarget } from "three";
import { EditorView as IEditorView } from "../type";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Logger } from "../../utils/Logger";
import { getEditorStore } from "../store";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { degToRad } from "three/src/math/MathUtils.js";

export class EditorView implements IEditorView {
    container: HTMLDivElement
    camera: PerspectiveCamera | null = null
    scene: Scene | null = null
    renderer: WebGLRenderer | null = null
    controls: OrbitControls | null = null
    model: any = null
    modelMaterials: any[] = []
    composer: EffectComposer | null = null
    renderPass: RenderPass | null = null
    outlinePass: OutlinePass | null = null
    private logger = Logger.getInstance();

    constructor(container: HTMLDivElement) {
        this.container = container
    }

    async init(): Promise<void> {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initControls();
        this.addEventListeners();
        this.createLight();

        await this.loadModel({ filePath: 'threeFiles/glbs/su7.glb' });

        // 效果合成
        this.initEffectComposer();

        this.animate();
    }

    private initRenderer(): void {
        this.renderer = new WebGLRenderer({
            antialias: true, // 抗锯齿
            alpha: true, // 透明
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        this.container.appendChild(this.renderer.domElement)
    }

    private initCamera(): void {
        this.camera = new PerspectiveCamera(20, this.container.clientWidth / this.container.clientHeight, 1, 10000)
        this.camera.position.set(0, 5, 10);
    }

    private initScene(): void {
        this.scene = new Scene();
    }

    private initControls(): void {
        this.controls = new OrbitControls(this.camera as PerspectiveCamera, this.renderer?.domElement as HTMLCanvasElement)
        this.controls.enableDamping = true; // 惯性
    }

    private addEventListeners(): void {
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    private onWindowResize(): void {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = this.container.clientWidth / this.container.clientHeight
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    }

    private createLight(): void {
        if (!this.scene) return;

        const ambientLight = new AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);
    }

    private async loadModel({ filePath }: { filePath: string }): Promise<void> {
        if (!this.scene) return;

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('draco/');
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.preload();

        const loader = new GLTFLoader().setDRACOLoader(dracoLoader);

        return new Promise((resolve, reject) => {
            try {
                loader.load(
                    filePath,
                    (gltf) => {
                        this.logger.log('模型加载成功:', gltf);
                        this.model = gltf.scene;

                        this.model.rotation.set(0, degToRad(-90), 0);

                        this.model.traverse((child: any) => {
                            if (child.isMesh) {
                                this.modelMaterials.push(child);
                                this.logger.log('找到网格:', child.name);
                            }
                        });

                        getEditorStore().setModelMaterials(this.modelMaterials);

                        if (this.scene) {
                            this.scene.add(this.model);
                            this.logger.log('模型已添加到场景');
                        }
                        resolve();
                    },
                    (progress) => {
                        this.logger.log('加载进度:', (progress.loaded / progress.total) * 100, '%');
                    },
                    (error) => {
                        this.logger.error('模型加载错误:', error);
                        reject(error);
                    }
                );
            } catch (error) {
                this.logger.error('加载模型时发生异常:', error);
                reject(error);
            }
        });
    }

    private initEffectComposer(): void {
        if (!this.renderer || !this.container) return;

        this.composer = new EffectComposer(this.renderer as WebGLRenderer, new WebGLRenderTarget(this.container.clientWidth, this.container.clientHeight, {
            samples: 4 // 增加采样次数来提高抗锯齿的效果
        }));
        this.renderPass = new RenderPass(this.scene as Scene, this.camera as PerspectiveCamera);
        this.composer.addPass(this.renderPass);
        this.outlinePass = new OutlinePass(new Vector2(this.container.clientWidth, this.container.clientHeight), this.model, this.camera as PerspectiveCamera);
        this.outlinePass.visibleEdgeColor = new Color("#FF8C00"); // 可见边缘的颜色
        this.outlinePass.hiddenEdgeColor = new Color("#8a90f3"); // 不可见边缘的颜色
        this.outlinePass.edgeGlow = 2; // 发光强度
        this.outlinePass.usePatternTexture = false; // 是否使用纹理图案
        this.outlinePass.edgeThickness = 1; // 边缘浓度
        this.outlinePass.edgeStrength = 4; // 边缘的强度，值越高边框范围越大
        this.outlinePass.pulsePeriod = 200; // 闪烁频率，值越大频率越低
        this.composer.addPass(this.outlinePass);
        this.composer.addPass(new OutputPass());

        getEditorStore().setSelectedMesh(this.modelMaterials[0]);
    }

    onSelectedMesh(mesh: any): void {
        if (!this.outlinePass) return;
        this.outlinePass.selectedObjects = [mesh];
    }

    setMap(map: any): void {
        if (!this.scene) return;
        const mesh = getEditorStore().selectedMesh;
        new TextureLoader().load(map.url, (texture) => {
            const newMaterial = mesh.material.clone();
            newMaterial.map = texture;
            // 如果存在旧材质的纹理，先释放它
            if (mesh.material.map) {
                mesh.material.map.dispose();
            }
            // apply
            mesh.material = newMaterial;
            mesh.mapId = map.id;
            mesh.meshFrom = map.id;
        });
    }

    private animate(): void {
        if (!this.renderer || !this.scene || !this.camera) return;

        const render = () => {
            requestAnimationFrame(render);

            if (this.composer) {
                this.composer.render();
            }

            if (this.controls) {
                this.controls.update();
            }
        };

        render();
    }
}