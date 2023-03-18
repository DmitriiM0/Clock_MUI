import { useState, useEffect, useRef, Fragment } from 'react';
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  Button,
  Paper,
  AppBar,
  ThemeProvider,
  Divider,
  Switch,
} from '@mui/material';
import { ColorModeContext, useMode } from './theme';

function App() {
  const systemTime = new Date().getTime() / 1000;
  const [theme, colorMode] = useMode();
  const [count, setCount] = useState(systemTime - 1679143900);
  const period = ['days', 'hours', 'minutes', 'seconds'];
  let dateTime = formatDuration(count);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              height="100vh"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={{ xs: 2, md: 6 }}
                p={{ xs: 2, md: 6 }}
                sx={{
                  // height: { xs: '100vh', md: '100vh' },
                  // my: 10,
                  borderRadius: 4,
                  backgroundColor: 'neutral.main',
                }}
              >
                <Box px={{ xs: 2, md: 4 }} display="flex" alignItems="center">
                  <Typography fontWeight="regular">Dark Mode</Typography>
                  <Switch
                    checked={theme.palette.mode === 'dark'}
                    onChange={colorMode.toggleColorMode}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Box>
                <Box px={{ xs: 2, md: 4 }}>
                  <Typography
                    variant="h6"
                    fontWeight="regular"
                    color="neutral.light"
                    sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                  >
                    PROJECT NAME
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: '2.25rem', md: '6rem' } }}
                  >
                    The Clock
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography
                    variant="h6"
                    px={{ xs: 2, md: 4 }}
                    pb={{ xs: 1, md: 4 }}
                    fontWeight="regular"
                    color="neutral.light"
                    sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                  >
                    Total time elapsed since I deployed this project
                  </Typography>
                  <Paper
                    elevation={0}
                    // variant='outlined'
                    sx={{
                      borderRadius: 4,
                      backgroundColor: 'neutral.dark',
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-evenly',
                      alignContent: 'center',
                      py: { xs: 2, md: 4 },
                    }}
                  >
                    {dateTime.map((value, index) => (
                      <Fragment key={index}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1.75rem', md: '4.25rem' },
                              fontFamily: 'Odudo',
                              fontWeight: 200,
                              lineHeight: 1,
                              color: 'white',
                            }}
                          >
                            {value < 10 ? '0' + value : value}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontSize={{ xs: '0.75rem', md: '1.5rem' }}
                            //   display={{ xs: 'none', md: 'block' }}
                            color="neutral.light"
                            fontWeight="regular"
                          >
                            {period[index]}
                          </Typography>
                        </Box>
                        {index === 3 ? null : (
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ backgroundColor: 'neutral.line' }}
                          />
                        )}
                      </Fragment>
                    ))}
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;

function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  });
}

function formatDuration(seconds: number) {
  let days = Math.floor(seconds / (3600 * 24));
  let time = new Date(seconds * 1000)
    .toUTCString()
    .slice(17, 25)
    .split(':')
    .map((x) => +x);
  return [+days, time].flat();
}
