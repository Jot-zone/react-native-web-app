import { createDrawerNavigator } from '@react-navigation/drawer';

import SignInScreen from "../screens/SignInScreen";

const Drawer = createDrawerNavigator();

export default function LoggedOutNav() {
  return (
    <SignInScreen />
  );
}
