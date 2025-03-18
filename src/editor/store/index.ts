import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { GeomeryObj } from '../type';
import { create } from 'zustand';
interface EditorState {
    geoList: GeomeryObj[];
    scene: Scene;
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
}

const useStore = create<EditorState>((set) => ({
    geoList: [],
    scene: new Scene(),
    camera: new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
    }),
}))

export default useStore;
