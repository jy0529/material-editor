import classes from './Renderer.module.css';
import clsx from 'clsx';
import useEditorStore from '../store';
import { useEffect } from 'react';
import { EditorView } from '../controllers/EditorView';

export default function Renderer({
    className
}: {
    className?: string
}) {
    const { setEditorViewInstance, editorViewInstance } = useEditorStore()
    
    useEffect(() => {
        if (!editorViewInstance) {
            const editorViewInstance = new EditorView(document.getElementById('EditorView') as HTMLDivElement)
            setEditorViewInstance(editorViewInstance)
        }
        editorViewInstance?.init();
    }, [editorViewInstance]);
    return (
        <section className={clsx(classes.renderer, className)}>
            <div id="EditorView" className="w-full h-[500px]"></div>
        </section>
    )
}
