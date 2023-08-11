import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, Input, Button, VStack, FormControl } from 'native-base';
import  MainLayout from '../layouts/MainLayout';
import useBlogs from '../jot-zone/blogs';
import { SCREEN_BLOG_EDIT } from '../navs/LoggedInNav';

export default function CreateBlogScreen() {
    const Blogs = useBlogs();
    const navigation = useNavigation();

    const [blogName, setBlogName] = React.useState('');
    const [blogSlug, setBlogSlug] = React.useState('');

    const createBlog = async () => {
        if ( ! (blogName && blogSlug)) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await Blogs.createBlogForCurrentUser(blogSlug, blogName);
            
            navigation.navigate(SCREEN_BLOG_EDIT, {blog: blogSlug})
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <MainLayout>
            <VStack alignSelf="center" w="full" maxW="xl" space="5">
                <Text>
                    You don't have a Zone yet. Create one now!
                </Text>

                <FormControl isRequired>
                    <FormControl.Label>Zone subdomain</FormControl.Label>

                    <Input
                        placeholder="billy"
                        onChangeText={setBlogSlug}
                    />

                    <FormControl.HelperText>
                        { (blogSlug ? blogSlug : 'billy') + '.jot.zone' }
                    </FormControl.HelperText>
                </FormControl>

                <FormControl isRequired>
                    <FormControl.Label>Zone Name</FormControl.Label>

                    <Input 
                        placeholder="Billy's Travel Blog"
                        onChangeText={setBlogName}
                    />
                </FormControl>

                <Button onPress={ () => createBlog() }>
                    Create Zone
                </Button>
            </VStack>
        </MainLayout>
    );
  }