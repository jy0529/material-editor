import Editor from './editor/Edtior';
import RootLayout from './layout/RootLayout';
import { MantineProvider, createTheme } from "@mantine/core";
import '@mantine/core/styles.css';
import './App.css';

const theme = createTheme({})
const App = () => {
  return (
    <MantineProvider theme={theme}>
      <div className="material-editor-root overflow-hidden">
        <RootLayout>
          <Editor />
        </RootLayout>
      </div>
    </MantineProvider>
  );
};

export default App;
