import * as React from 'react';
import { Text } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CreateBlogScreen from '../screens/CreateBlogScreen';
import BlogEditScreen from "../screens/BlogEditScreen";
import BlogPostEditScreen from '../screens/BlogPostEditScreen';
import MenuBar from "../components/MenuBar";
import useBlogs from "../jot-zone/blogs";
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

export default function LoggedInNav() {
    const Blogs = useBlogs();

    const [loading, setLoading] = React.useState(true);
    const [usersBlogSlugs, setUsersBlogSlugs] = React.useState([]);

    const fetchUsersBlogs = async () => {
        const usersBlogSlugs = await Blogs.getCurrentUsersBlogSlugs();
        setUsersBlogSlugs(usersBlogSlugs);
        setLoading(false);
    }

    React.useEffect(() => {
        fetchUsersBlogs();
    }, []);

    const linking = {
        prefixes: ['https://jot.zone', 'http://localhost:19006'],
        config: {
            screens: {
                'Blog Edit': {
                    path: 'blog/:blog',
                    // parse: {
                    //     blog: async (blog) => await Blogs.getBlogBySlug(blog),
                    // },
                    // stringify: {
                    //     blog: (blog) => blog.slug,
                    // }
                },
                'New Blog Post': {
                    path: 'blog/:blog/new-post',
                    // stringify: {
                    //     blog: (blog) => blog.slug,
                    // }
                },
                'Sign In': 'sign-in',
            },
        },
    };

    return (
        <>
        { loading ? (
            <Text>Loading...</Text>
        ) : (
            <NavigationContainer linking={linking}>
                <Drawer.Navigator
                    backBehavior="history"
                    screenOptions={{
                        header: ({ navigation, route, options }) => {
                            return <MenuBar navigation={navigation} />
                        },
                    }}
                >
                    { usersBlogSlugs.length !== 0 ? (
                        <>
                            <Drawer.Screen
                                name="Blog Edit"
                                component={BlogEditScreen}
                                initialParams={{
                                    blog: usersBlogSlugs[0],
                                }}
                            />

                            <Drawer.Screen
                                name="New Blog Post"
                                component={BlogPostEditScreen}
                                initialParams={{
                                    blog: usersBlogSlugs[0],
                                    blogPost: null,
                                }}
                                options={{
                                    headerShown: Platform.OS === 'web' ? true : false,
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
        ) }
        </>
    );
}
