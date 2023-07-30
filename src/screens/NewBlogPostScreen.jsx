import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { Box, Text, Stack, HStack, VStack, Heading, Link, Button } from "native-base";
import ReactQuill from 'react-quill';
import MainLayout from "../layouts/MainLayout";
import 'react-quill/dist/quill.snow.css';
import useBlogs from '../jot-zone/blogs';

export default function NewBlogPostScreen({ navigation, route }) {
    const Blogs = useBlogs();
    
    const currentBlog = route.params.blog;

    const [value, setValue] = useState('');

    const onSave = async () => {
        await Blogs.createBlogPost(currentBlog.slug, value);
        navigation.navigate('Blog Edit', {currentBlog});
    };

    return (
        <MainLayout>
            <Box alignSelf="center" w="full" maxW="desktop">
                <Box h="600px">
                    <ReactQuill 
                        theme="snow" 
                        placeholder='Jot here...'
                        style={styles.quill}
                        value={value} 
                        onChange={setValue} 
                    />  
                </Box>

                <Box marginTop="16" alignItems="center">
                    <Button
                        w="2/5"
                        onPress={ onSave }
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    quill: {
        height: '100%',
    }
});
