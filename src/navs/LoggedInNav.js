import * as React from 'react';
import { useContext } from "react";
import { Button, StatusBar } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from "../contexts/auth";

import CreateBlogScreen from '../screens/CreateBlogScreen';
import BlogEditScreen from "../screens/BlogEditScreen";
import NewBlogPostScreen from '../screens/NewBlogPostScreen';
import SignInScreen from "../screens/SignInScreen";
import MenuBar from "../components/MenuBar";
import useBlogs from "../jot-zone/blogs";

const Drawer = createDrawerNavigator();

export default function LoggedInNav() {
    const Blogs = useBlogs();

    const [usersBlogs, setUsersBlogs] = React.useState([]);

    const fetchUsersBlogs = async () => {
        const usersBlogs = await Blogs.getCurrentUsersBlogs();
        setUsersBlogs(usersBlogs);
    }

    React.useEffect(() => {
        fetchUsersBlogs();
    }, []);

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
                { usersBlogs.length !== 0 ? (
                    <>
                        <Drawer.Screen
                            name="Blog Edit"
                            component={BlogEditScreen}
                            initialParams={{
                                blog: usersBlogs[0],
                            }}
                        />

                        <Drawer.Screen
                            name="New Blog Post"
                            component={NewBlogPostScreen}
                            initialParams={{
                                blog: usersBlogs[0],
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Drawer.Screen
                            name="Sign In"
                            component={CreateBlogScreen}
                        />
                    </>
                ) }
            </Drawer.Navigator>

            
        </NavigationContainer>
    );
}
