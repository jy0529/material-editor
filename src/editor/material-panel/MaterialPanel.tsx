import { MaterialModels } from "@/materials/index.tsx";
import { Stack, Grid, Image, Title, UnstyledButton, Text, ScrollArea } from "@mantine/core";
import useEditorStore from "../store";
import clsx from "clsx";

export default function MaterialPanel() {
    const { modelMaterials, setSelectedMesh, selectedMesh } = useEditorStore()
    return (
        <section className="material-panel mx-1 ml-2">
            <Title order={3}>当前模型：</Title>
            <Grid gutter={10} className="mt-2">
                {MaterialModels.map((model) => (
                    <Grid.Col span={6} key={model.id}>
                        <Image src={model.icon} alt={model.name} />
                    </Grid.Col>
                ))}
            </Grid>
            <Stack className="mt-4">
                <Title order={3}>当前材质：</Title>
                <ScrollArea h={200}>
                    {modelMaterials.map((material) => (
                        <Stack className="p-2" key={material.uuid}>
                            <section className={clsx(
                                "p-2 rounded-md",
                                material.uuid === selectedMesh?.uuid ? "bg-gray-200" : ""
                            )}>
                                <UnstyledButton onClick={() => setSelectedMesh(material)}>
                                    <Text>{material.name}</Text>
                                </UnstyledButton>
                            </section>
                        </Stack>
                    ))}
                </ScrollArea>
            </Stack>
        </section>
    )

}
