import { useState, useMemo } from 'react';
import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme, ThemeOptions, createTheme } from '@mui/material/styles';
import { ColorModeContext, themeSettings } from './theme';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Clock from './views/global/Clock';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light'
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev: string) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Clock mode={mode} />
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
