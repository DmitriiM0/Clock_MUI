import { createContext, useState, useMemo } from 'react';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import OnestRegular from './assets/fonts/OnestRegular1602-hint.woff';
import OnestMedium from './assets/fonts/OnestMedium1602-hint.woff';
import OdudoRegular from './assets/fonts/OdudoMono-Regular.woff2';
import OdudoLight from './assets/fonts/OdudoMono-Light.woff2';

export const tokens = (mode: string) => ({
  ...(mode === 'dark'
    ? {
        grey: {
          50: '#fafafa',
          100: '#ececec',
          200: '#d8d8d8',
          300: '#c5c5c5',
          400: '#b1b1b1',
          500: '#9e9e9e',
          600: '#7e7e7e',
          700: '#5f5f5f',
          800: '#3f3f3f',
          900: '#202020',
        },
        primary: {
          100: '#fbe2cc',
          200: '#f8c49a',
          300: '#f4a767',
          400: '#f18935',
          500: '#ed6c02',
          600: '#be5602',
          700: '#8e4101',
          800: '#5f2b01',
          900: '#2f1600',
        },
        green: {
          100: '#e0f2f8',
          200: '#c1e4f1',
          300: '#a3d7e9',
          400: '#84c9e2',
          500: '#65bcdb',
          600: '#5196af',
          700: '#3d7183',
          800: '#284b58',
          900: '#090f11',
        },
      }
    : {
        grey: {
          100: '#202020',
          200: '#3f3f3f',
          300: '#5f5f5f',
          400: '#7e7e7e',
          500: '#9e9e9e',
          600: '#b1b1b1',
          700: '#c5c5c5',
          800: '#d8d8d8',
          900: '#ececec',
        },
        primary: {
          100: '#2f1600',
          200: '#5f2b01',
          300: '#8e4101',
          400: '#be5602',
          500: '#ed6c02',
          600: '#f18935',
          700: '#f4a767',
          800: '#f8c49a',
          900: '#fbe2cc',
        },
        green: {
          100: '#141a1c',
          200: '#284b58',
          300: '#3d7183',
          400: '#5196af',
          500: '#65bcdb',
          600: '#84c9e2',
          700: '#a3d7e9',
          800: '#c1e4f1',
          900: '#e0f2f8',
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: string): any => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // dark mode
            primary: {
              main: colors.primary[500],
              light: colors.primary[400],
              dark: colors.primary[600],
              contrastText: '#fff',
            },
            secondary: {
              main: colors.grey[900],
              light: colors.grey[400],
              dark: colors.grey[600],
            },
            neutral: {
              dark: colors.grey[900],
              main: '#131516',
              light: colors.grey[600],
              line: colors.grey[900],
            },
            background: {
              default: '#090b0b',
              paper: colors.grey[900],
            },
          }
        : {
            // light mode
            primary: {
              main: colors.primary[500],
              light: colors.primary[400],
              dark: colors.primary[600],
              contrastText: '#fff',
            },
            secondary: {
              main: colors.green[800],
              light: colors.grey[400],
              dark: colors.grey[600],
            },
            neutral: {
              dark: '#121212',
              main: '#fff',
              light: colors.grey[400],
              line: colors.grey[300],
            },
            background: {
              default: colors.primary[700],
              paper: '#fff',
            },
          }),
    },
    typography: {
      fontFamily: 'Onest, Odudo, Arial',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Onest';
          font-style: regular;
          font-display: swap;
          font-weight: 400;
          src: local('Onest'), local('Onest-Regular'), url(${OnestRegular}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

		@font-face {
          font-family: 'Onest';
          font-style: medium;
          font-display: swap;
          font-weight: 500;
          src: local('Onest'), local('Onest-Medium'), url(${OnestMedium}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
		@font-face {
          font-family: 'Odudo';
          font-style: regular;
          font-display: swap;
          font-weight: 400;
          src: local('Odudo'), local('Odudo-Regular'), url(${OdudoRegular}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
		@font-face {
          font-family: 'Odudo';
          font-style: light;
          font-display: swap;
          font-weight: 200;
          src: local('Odudo'), local('Odudo-Light'), url(${OdudoLight}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
      },
    },
  };
};

interface ColorContextSchema {
  toggleColorMode: () => void;
}

// context for color mode
export const ColorModeContext: any = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};

export interface ThemeModeContextType {
    toggleThemeMode: () => void,
    resetThemeMode: () => void
};