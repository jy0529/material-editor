import { Stack, Title } from "@mantine/core";
import Maps from "../features/maps/Maps";

export default function PropsPanel() {
    return (
        <section className="props-panel">
            <Stack>
                <Title order={3}>更换贴图：</Title>
                <Maps />
            </Stack>
        </section>
    )
}
