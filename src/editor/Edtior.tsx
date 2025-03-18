import { Grid } from '@mantine/core';
import MaterialPanel from './material-panel/MaterialPanel';
import PropsPanel from './props-panel/PropsPanel';
import Renderer from './renderer/Renderer';

export default function Editor() {
    return (
        <section className="material-editor">
            <Grid className='h-full'>
                <Grid.Col span={2}>
                    <MaterialPanel />
                </Grid.Col>
                <Grid.Col span={8}>
                    <Renderer className='h-[600px]' />
                </Grid.Col>
                <Grid.Col span={2}>
                    <PropsPanel />
                </Grid.Col>
            </Grid>
        </section>
    )
}