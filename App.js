import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./src/contexts/auth";

import Nav from './Nav';

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <Nav />
      </NativeBaseProvider>
    </AuthProvider>
  );
}
