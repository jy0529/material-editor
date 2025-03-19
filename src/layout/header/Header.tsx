import { Burger, Container, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';


export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title order={2}>小米Su7 3D 编辑器</Title>
      </Container>
    </header>
  );
}