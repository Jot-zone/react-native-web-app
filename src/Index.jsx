import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Box, NativeBaseProvider, Text, View } from "native-base";
import useUsers from './jot-zone/users';

import LoggedOutNav from './nav/components/LoggedOutNav';
import LoggedInNav from './nav/components/LoggedInNav';
import { Platform, SafeAreaView } from 'react-native';
import SubdomainNav from './nav/components/SubdomainNav';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import PagesNav from './nav/components/PagesNav';

const APP_REDIRECT_SUBDOMAINS = [
  // 'www',
  // 'jot',
  'localhost',
];

export default function App() {
  const Users = useUsers();

  const subdomain = Platform.OS === 'web'
    ? window.location.hostname.split('.')[0]
    : null;

  const path = Platform.OS === 'web'
    ? window.location.pathname
    : null;

  // Redirect to app subdomain.
  if (APP_REDIRECT_SUBDOMAINS.includes(subdomain)) {
    return window.location.replace(
      window.location.protocol + '//' + 'app.' + window.location.hostname
      + (window.location.port ? ':' + window.location.port : '')
    ); 
  }

  if (subdomain === 'www') {
    // redirect to root
    return window.location.replace(
      window.location.toString().replace('www.', ''),
    );
  }

  // Page routes.
  if (subdomain === 'jot') {
    return (
      <PagesNav />
    )
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
