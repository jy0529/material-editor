import { PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls, } from "three/examples/jsm/Addons.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";

export interface EditorView {
    container: HTMLDivElement
    camera: PerspectiveCamera | null
    scene: Scene | null
    renderer: WebGLRenderer | null
    controls: OrbitControls | null
    model: any
    modelMaterials: any[]
    composer: EffectComposer | null
    renderPass: RenderPass | null
    outlinePass: OutlinePass | null

    init(): void
    onSelectedMesh(mesh: any): void
    setMap(map: any): void
}

