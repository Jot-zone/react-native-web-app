import React from 'react';
import { Box, Text, Input, Button } from 'native-base';
import  MainLayout from '../layouts/MainLayout';
import BlogList from '../components/BlogList';
import BlogEdit from './BlogEditScreen';
import useBlogs from '../jot-zone/blogs';

export default function CreateBlogScreen() {
    const Blogs = useBlogs();

    const [blogName, setBlogName] = React.useState('');
    const [blogSlug, setBlogSlug] = React.useState('');

    const createBlog = async () => {
        await Blogs.createBlogForCurrentUser(blogSlug, blogName);
    }

    return (
        <MainLayout>
            <Box alignSelf="center" w="full" maxW="xl">
                <Text>
                    You don't have a blog yet. Create one now!
                </Text>

                <Input
                    placeholder="Blog Slug"
                    onChangeText={setBlogSlug}
                />

                <Input 
                    placeholder="Blog Name"
                    onChangeText={setBlogName}
                />

                <Button onPress={ () => createBlog() }>
                    Create Blog
                </Button>
            </Box>
        </MainLayout>
    );
  }