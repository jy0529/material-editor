import useEditorStore from "@/editor/store"
import { Grid, UnstyledButton } from "@mantine/core"

import { Image } from "@mantine/core"
import clsx from "clsx"

type SystemMaps = {
    id: string
    url: string
}

const maps: SystemMaps[] = [
    {
        id: '1',
        url: 'maps/5.jpg'
    },
    {
        id: '2',
        url: 'maps/6.jpg'
    },
    {
        id: '3',
        url: 'maps/7.jpg'
    },
    {
        id: '4',
        url: 'maps/8.jpg'
    },
    {
        id: '5',
        url: 'maps/9.jpg'
    },
    {
        id: '6',
        url: 'maps/10.jpg'
    },
    {
        id: '7',
        url: 'maps/11.png'
    },
    {
        id: '8',
        url: 'maps/12.jpg'
    },
    {
        id: '9',
        url: 'maps/13.jpg'
    },
    {
        id: '10',
        url: 'maps/14.jpg'
    },
]

export default function Maps() {
    const { selectedMap, setSelectedMap } = useEditorStore();
    console.log(1, selectedMap)
    return (
        <section className="maps">
            <Grid gutter={10}>
                {maps.map((map) => (
                    <Grid.Col span={6} key={map.id}>
                        <section className={clsx('w-[100px] h-[100px]', {
                            'border-2 border-blue-500': map.id === selectedMap?.id
                        })} key={map.id}>
                            <UnstyledButton className="w-full h-full" onClick={() => setSelectedMap(map)}>
                                <Image fit="contain" src={map.url} alt={map.id} />
                            </UnstyledButton>
                        </section>
                    </Grid.Col>
                ))}
            </Grid>
        </section>
    )
}