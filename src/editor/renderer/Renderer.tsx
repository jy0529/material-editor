import classes from './Renderer.module.css';
import clsx from 'clsx';

export default function Renderer({
    className
}: {
    className?: string
}) {
    return (
        <section className={clsx(classes.renderer, className)}>
            renderer
        </section>
    )
}
