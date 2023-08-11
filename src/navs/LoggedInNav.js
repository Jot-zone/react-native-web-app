import * as React from 'react';
import { Text } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CreateBlogScreen from '../screens/CreateBlogScreen';
import BlogEditScreen from "../screens/BlogEditScreen";
import BlogPostEditScreen from '../screens/BlogPostEditScreen';
import MenuBar from "../components/MenuBar";
import useBlogs from "../jot-zone/blogs";
import { Platform } from 'react-native';

export const SCREEN_BLOG_EDIT = 'Zone Dashboard';
export const SCREEN_BLOG_POST_EDIT = 'New Jot';
export const SCREEN_CREATE_BLOG = 'Create Zone';

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
        prefixes: [
            'https://jot.zone', 
            'https://app.jot.zone',
            'http://localhost:19006',
            'http://app.localhost:19006',
        ],
        config: {
            screens: {
                [SCREEN_BLOG_EDIT]: {
                    path: 'zone/:blog',
                    // parse: {
                    //     blog: async (blog) => await Blogs.getBlogBySlug(blog),
                    // },
                    // stringify: {
                    //     blog: (blog) => blog.slug,
                    // }
                },

                [SCREEN_BLOG_POST_EDIT]: {
                    path: 'zone/:blog/jot-edit',
                },

                [SCREEN_CREATE_BLOG]: 'new',
            },
        },
    };

    return (
        <>
        { loading ? (
            <Text>Loading...</Text>
        ) : (
            <NavigationContainer 
                linking={linking}
                initialState={{
                    routes: [
                        { name: usersBlogSlugs.length !== 0 ? SCREEN_BLOG_EDIT : SCREEN_CREATE_BLOG },
                    ],
                }}
            >
                <Drawer.Navigator
                    backBehavior="history"
                    screenOptions={{
                        header: ({ navigation, route, options }) => {
                            return <MenuBar navigation={navigation} />
                        },
                    }}
                >
                    <>
                        <Drawer.Screen
                            name={SCREEN_BLOG_EDIT}
                            component={BlogEditScreen}
                            initialParams={{
                                blog: usersBlogSlugs[0],
                            }}
                        />

                        <Drawer.Screen
                            name={SCREEN_BLOG_POST_EDIT}
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
                    
                    <>
                        <Drawer.Screen
                            name={SCREEN_CREATE_BLOG}
                            component={CreateBlogScreen}
                        />
                    </>
                </Drawer.Navigator>
            </NavigationContainer>
        ) }
        </>
    );
}
