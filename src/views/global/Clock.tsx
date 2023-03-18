import { useState, Fragment, useContext } from 'react';
import { Box, Typography, Paper, Divider, Switch } from '@mui/material';
import { ColorModeContext } from '../../theme';
import useInterval from '../../hooks/useInterval';

export default function Clock({ mode }: { mode: string }) {
  const systemTime = new Date().getTime() / 1000;
  const colorMode = useContext(ColorModeContext);
  const [count, setCount] = useState(systemTime - 1679143900);
  const period = ['days', 'hours', 'minutes', 'seconds'];
  let dateTime = formatDuration(count);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);
  
  return (
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
          borderRadius: 4,
          backgroundColor: 'neutral.main',
        }}
      >
        <Box px={{ xs: 2, md: 4 }} display="flex" alignItems="center">
          <Typography fontWeight="regular">Dark Mode</Typography>
          <Switch
            checked={mode === 'dark'}
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

        <Box display="flex" flexDirection="column" justifyContent="center">
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
                <Box display="flex" flexDirection="column" alignItems="center">
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
  );
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
