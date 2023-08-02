import React, { useState, useEffect, useCallback } from 'react';
import useBlogs from '../jot-zone/blogs';
import BlogPostEditor from '../components/BlogPostEditor';
import { Box, Text } from 'native-base';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function BlogPostEditScreen({ navigation, route }) {
    const isFocused = useIsFocused();
    
    const Blogs = useBlogs();

    
    const [loading, setLoading] = useState(true);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [currentBlogPost, setCurrentBlogPost] = useState(null);

    const initialize = async () => {
        setLoading(true);

        const _currentBlog = await Blogs.getBlogBySlug(route.params.blog);
        console.log({currentBlog: _currentBlog});
        setCurrentBlog(_currentBlog);

        const _currentBlogPost = route.params.blogPost 
            ? await Blogs.getBlogPostBySlug(_currentBlog.slug, route.params.blogPost) 
            : null;
        console.log({currentBlogPosttt: _currentBlogPost});
        setCurrentBlogPost(_currentBlogPost);

        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            initialize();
        }, [isFocused])
    );


    const onSave = async (html) => {
        console.log({currentBlogPost, html});
        if (currentBlogPost) {
            await Blogs.updateBlogPostBySlug(currentBlog.slug, route.params.blogPost, html);
        } else {
            await Blogs.createBlogPost(currentBlog.slug, html);
        }

        navigation.navigate('Blog Edit');
    }

    if (loading || !isFocused ) {
        return (
           <Text>Loading bp edit screen...</Text>
        );
    }

    return (
        <BlogPostEditor
            blog={currentBlog}
            blogPost={currentBlogPost}
            onSave={onSave}
        />
    );
}
