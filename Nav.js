import { useContext } from "react";
import { Button, StatusBar } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from "./src/contexts/auth";

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from "./src/screens/SignInScreen";
import MenuBar from "./src/components/core/MenuBar";

const Drawer = createDrawerNavigator();

export default function Nav() {
  const { firebaseUser } = useContext(AuthContext);

  return (
    <NavigationContainer>
        <Drawer.Navigator
            screenOptions={{
                header: ({ navigation, route, options }) => {
                    // return <Button onPress={() => navigation.toggleDrawer()}>Menu</Button>
                    return <MenuBar navigation={navigation} />
                },
            }}
        >
            { firebaseUser ? (
                <>
                    <Drawer.Screen
                        name="Home"
                        component={HomeScreen}
                    />
                </>
            ) : (
                <>
                    <Drawer.Screen
                        name="Sign In"
                        component={SignInScreen}
                    />
                </>
            ) }
        </Drawer.Navigator>

        <StatusBar bg="#3700B3" barStyle="light-content" />
    </NavigationContainer>
  );
}
