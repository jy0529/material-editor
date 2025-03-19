import { create } from 'zustand';
import { EditorView } from '../type';
import { Logger } from '@/utils/Logger';
export interface IEditorState {
    editorViewInstance: EditorView | null
    modelMaterials: any[]
    selectedMesh: any
    selectedMap: any
    setEditorViewInstance: (editorViewInstance: EditorView) => void
    setSelectedMesh: (mesh: any) => void
    setModelMaterials: (materials: any[]) => void
    setSelectedMap: (map: any) => void
}

const useEditorStore = create<IEditorState>((set) => ({
    editorViewInstance: null,
    setEditorViewInstance: (editorViewInstance: EditorView) => set({ editorViewInstance: editorViewInstance }),
    selectedMesh: null,
    setSelectedMesh: (mesh: any) => {
        Logger.getInstance().log('selectedMesh', mesh);
        set({ selectedMesh: mesh });
        useEditorStore.getState().editorViewInstance?.onSelectedMesh(mesh);
    },
    modelMaterials: [],
    setModelMaterials: (materials: any[]) => set({ modelMaterials: materials }),
    selectedMap: null,
    setSelectedMap: (map: any) => {
        Logger.getInstance().log('selectedMap', map);
        set({ selectedMap: map });
        useEditorStore.getState().editorViewInstance?.setMap(map);
    }
}))

export const getEditorStore = () => {
    return useEditorStore.getState();
}

export default useEditorStore;
