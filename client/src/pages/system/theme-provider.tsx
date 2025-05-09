import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';

const helixTheme = createTheme({
  colors: {
    'fr-yellow': [
      '#FFF8E5',
      '#FFEAB8',
      '#FFDD8A',
      '#FFCF5C',
      '#FFC22E',
      '#FFB400',
      '#CC9000',
      '#996C00',
      '#664800',
      '#332400',
    ],
    'fr-orange': [
      '#FDEDE8',
      '#F8CCBE',
      '#F4AC95',
      '#EF8B6B',
      '#EB6B42',
      '#E74A18',
      '#B93C13',
      '#8A2D0F',
      '#5C1E0A',
      '#2E0F05',
    ],
    'fr-cyan': [
      '#EAF9FA',
      '#C5EEF2',
      '#A0E2E9',
      '#7BD7E0',
      '#55CCD8',
      '#30C1CF',
      '#279AA5',
      '#1D747C',
      '#134D53',
      '#0A2729',
    ],
  },
});

const ThemeProvider = ({ children }: { children: JSX.Element[] }) => {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  // const toggleColorScheme = (value?: ColorScheme) =>
  //   setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <MantineProvider defaultColorScheme="auto" theme={helixTheme}>
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
