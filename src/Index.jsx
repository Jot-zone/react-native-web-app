import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Box, NativeBaseProvider, Text, View } from "native-base";
import { AuthProvider } from "./contexts/auth";
import useUsers from './jot-zone/users';

import LoggedOutNav from './navs/LoggedOutNav';
import LoggedInNav from './navs/LoggedInNav';
import { Platform } from 'react-native';
import SubdomainNav from './navs/SubdomainNav';

const APP_REDIRECT_SUBDOMAINS = [
  'www',
  'jot',
  'localhost',
];

export default function App() {
  const Users = useUsers();

  const subdomain = Platform.OS === 'web'
    ? window.location.hostname.split('.')[0]
    : null;

  // Redirect to app subdomain.
  if (APP_REDIRECT_SUBDOMAINS.includes(subdomain)) {
    return window.location.replace(
      window.location.protocol + '//' + 'app.' + window.location.hostname
      + (window.location.port ? ':' + window.location.port : '')
    ); 
  }


  // Route for a subdomain.
  if (subdomain && subdomain !== 'app') {
    return (
      <>
        <SubdomainNav subdomain={subdomain} />
      
        <StatusBar bg="#3700B3" barStyle="light-content" />
      </>
    );
  }

  // Before user initialized.
  if ( ! Users.userInitialized) {
    return (
      <Box safeArea>
        <Text>
          Initializing user...
        </Text>
  
        <StatusBar bg="#3700B3" barStyle="light-content" />
      </Box>
    );
  }
  
  // Main app.
  return (
    <>
      { Users.firebaseUser ? (
        <LoggedInNav />
      ) : (
        <LoggedOutNav />
      ) }

      <StatusBar bg="#3700B3" barStyle="light-content" />
    </>
  )
}
