import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';
import PagesMenuBar from '../../components/MenuBars/PagesMenuBar';

const Stack = createStackNavigator();

export default function PagesNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, route, options }) => {
              return <PagesMenuBar navigation={navigation} />
          },
        }}
      >
        <Stack.Screen 
          name="Jot.zone" 
          component={HomeScreen} 
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
