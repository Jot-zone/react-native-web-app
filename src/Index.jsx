import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./contexts/auth";
import useUsers from './jot-zone/users';

import LoggedOutNav from './navs/LoggedOutNav';
import LoggedInNav from './navs/LoggedInNav';
export default function App() {
  const Users = useUsers();

  return (
    <>
      { Users.userInitialized ? (
        <>
          { Users.firebaseUser ? (
            <LoggedInNav />
          ) : (
            <LoggedOutNav />
          ) }
        </>
      ) : (
        <></>
      ) }

      <StatusBar bg="#3700B3" barStyle="light-content" />
    </>
  );
}
