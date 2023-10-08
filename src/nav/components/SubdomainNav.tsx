import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Box, Button, Text } from 'native-base';
import useBlogs, { Blog } from '../../jot-zone/blogs';
import BlogViewScreen from '../../screens/BlogViewScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/elements';
import BlogPostViewScreen from '../../screens/BlogPostViewScreen';
import { SCREEN_BLOG_VIEW, SCREEN_BLOG_POST_VIEW, SCREEN_SUBDOMAIN_NAV, SCREEN_BLOG_EDIT } from '../nav-constants';
import { goToAppDashboard } from '../../jot-zone/navigation-helpers';

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

          headerRight: () => (
            <Button
              onPress={ () => goToAppDashboard() }
              marginRight={3}
              colorScheme="secondary"
              size="xs"
            >
              <Text>
                Create your own zone!
              </Text>
            </Button>
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
          headerTitle: blog.name,
          title: blog.name + ' | Jot.zone',

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

  const [loading, setLoading] = useState<boolean>(true);
  const [currentBlog, setCurrentBlog] = useState<Blog|null>(null);

  useEffect(() => {
    (async () => {
      const _blog = await Blogs.getBlogBySlug(subdomain);
      setCurrentBlog(_blog);
      setLoading(false);
    })();
  }, [subdomain]);

  if (loading) {
    return (
      <Box safeArea p="5">
        <Text>
          Loading...
        </Text>
      </Box>
    );
  }

  if (!currentBlog) {
    return (
      <Box safeArea p="5">
        <Text>
          Jot Zone for '{subdomain}' not found.
        </Text>
      </Box>
    );
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
