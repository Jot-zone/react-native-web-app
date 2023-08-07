import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Box, Text } from 'native-base';
import useBlogs, { Blog } from '../jot-zone/blogs';
import BlogViewScreen from '../screens/BlogViewScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

interface SubdomainNavProps {
  subdomain: string;
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

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
            name={currentBlog.name}
            component={BlogViewScreen}
            initialParams={{
              blog: currentBlog,
            }}
            options={{
              title: currentBlog.name + ' | Jot.zone',
              headerTitle: 'Jot.zone',
            }}
          />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
