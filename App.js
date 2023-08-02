import { AuthProvider } from './src/contexts/auth';
import { NativeBaseProvider, extendTheme } from 'native-base';
import Index from './src/Index';

export default function App() {
  const theme = extendTheme({
    sizes: {
      desktop: '1200px'
    },
    colors: {
      secondary: {
          '50': '#fefde8',
          '100': '#fffcc2',
          '200': '#fff687',
          '300': '#ffe943',
          '400': '#ffd70f',
          '500': '#efbe03',
          '600': '#ce9300',
          '700': '#a46804',
          '800': '#88510b',
          '900': '#734210',
          '950': '#432205',
      }
    }
  });

  return (
    <AuthProvider>
      <NativeBaseProvider theme={theme}>
        <Index />
      </NativeBaseProvider>
    </AuthProvider>
  );
}
