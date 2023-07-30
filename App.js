import { AuthProvider } from './src/contexts/auth';
import { NativeBaseProvider, extendTheme } from 'native-base';
import Index from './src/Index';

export default function App() {
  const theme = extendTheme({
    sizes: {
      desktop: '1200px'
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
