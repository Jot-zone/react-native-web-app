import { useContext } from "react";
import { Button, StatusBar } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from "../contexts/auth";

import CreateBlogScreen from '../screens/CreateBlogScreen';
import SignInScreen from "../screens/SignInScreen";
import MenuBar from "../components/MenuBar";
import useUsers from "../jot-zone/users";

const Drawer = createDrawerNavigator();

export default function LoggedOutNav() {
  return (
    <SignInScreen />
  );
}
