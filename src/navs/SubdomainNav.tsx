import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Box, Text } from 'native-base';
import useBlogs, { Blog } from '../jot-zone/blogs';
import BlogViewScreen from '../screens/BlogViewScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/elements';
import BlogPostViewScreen from '../screens/BlogPostViewScreen';

export const SCREEN_SUBDOMAIN_NAV = 'Subdomain nav';
export const SCREEN_BLOG_VIEW = 'Zone view';
export const SCREEN_BLOG_POST_VIEW = 'Jot view';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

interface SubdomainNavProps {
  subdomain: string;
}

function BlogViewStack({ navigation, route, blog }) {
  

  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
      }}
    >
      <Stack.Screen 
        name={SCREEN_BLOG_VIEW}
        // component={BlogViewScreen}
        options={{
          title: blog.name + ' | Jot.zone',
          headerTitle: 'Jot.zone',
          // no back button
          headerLeft: () => (
            <></>
          ),
        }}
        // initialParams={{
        //   blog: route.params.blog,
        // }}
      >
          { props => 
            <BlogViewScreen {...props} 
               blog={blog}
            /> 
          }
      </Stack.Screen>

      <Stack.Screen
        name={SCREEN_BLOG_POST_VIEW}
        // component={BlogPostViewScreen}
        initialParams={{
          // blog: route.params.blog,
          blogPost: route.params.blogPost,
        }}
        options={{
          // title: Date.parse(route.params.blogPost).toString(),
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate(SCREEN_BLOG_VIEW)}
            />
          ),
        }}
      >
          { props =>
            <BlogPostViewScreen {...props} 
              blog={blog}
              blogPostId={route.params.blogPost}
            />
          }
      </Stack.Screen>

    </Stack.Navigator>
  );
}

export default function SubdomainNav({
  subdomain,
}: SubdomainNavProps) {
  const Blogs = useBlogs();

  const [currentBlog, setCurrentBlog] = useState<Blog|null>(null);

  useEffect(() => {
    (async () => {
      const _blog = await Blogs.getBlogBySlug(subdomain);
      setCurrentBlog(_blog);
    })();
  }, [subdomain]);

  if (!currentBlog) {
    return (
      <Box safeArea p="5">
        <Text>
          Jot Zone for '{subdomain}' not found.
        </Text>
      </Box>
    )
  }

  const linking = {
    prefixes: [
        'https://jot.zone', 
        'https://app.jot.zone',
        'http://localhost:19006',
        'http://app.localhost:19006',
    ],
    config: {
      screens: {
            [SCREEN_SUBDOMAIN_NAV]: {
              path: '',

              screens: {
                [SCREEN_BLOG_VIEW]: {
                    path: '',
                },
      
                [SCREEN_BLOG_POST_VIEW]: {
                    path: ':blogPost',
                }
              }
            },
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
    >
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen 
            name={SCREEN_SUBDOMAIN_NAV}
            // component={BlogViewStack}
            initialParams={{
              blog: currentBlog,
            }}
            // options={{
            //   title: currentBlog.name + ' | Jot.zone',
            //   headerTitle: 'Jot.zone',
            // }}
          >
              { props =>
                <BlogViewStack {...props} 
                  blog={currentBlog}
                />
              }
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
