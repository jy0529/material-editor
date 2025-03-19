import { Container, Title } from '@mantine/core';
import classes from './Header.module.css';

export function Header() {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title order={2}>小米SU7 3D 编辑器</Title>
      </Container>
    </header>
  );
}