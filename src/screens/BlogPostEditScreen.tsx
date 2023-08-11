import React, { useState, useEffect, useCallback } from 'react';
import useBlogs from '../jot-zone/blogs';
import BlogPostEditor from '../components/BlogPostEditor';
import { Box, Text } from 'native-base';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import useBlogPosts, { BlogPostInput } from '../jot-zone/blog-posts';
import { SCREEN_BLOG_EDIT } from '../navs/LoggedInNav';

export default function BlogPostEditScreen({ navigation, route }) {
    const isFocused = useIsFocused();
    
    const Blogs = useBlogs();
    const BlogPosts = useBlogPosts();

    
    const [loading, setLoading] = useState(true);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [currentBlogPost, setCurrentBlogPost] = useState(null);

    const initialize = async () => {
        setLoading(true);

        const _currentBlog = await Blogs.getBlogBySlug(route.params.blog);
        console.log({currentBlog: _currentBlog});
        setCurrentBlog(_currentBlog);

        const _currentBlogPost = route.params.blogPost 
            ? await BlogPosts.getBlogPostBySlug(_currentBlog.slug, route.params.blogPost) 
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


    const onSave = async (blogPostInput: BlogPostInput) => {
        console.log({currentBlogPost, blogPostInput});
        if (currentBlogPost) {
            await BlogPosts.update(
                currentBlog.slug, 
                route.params.blogPost, 
                blogPostInput
            );
        } else {
            await BlogPosts.create(currentBlog.slug, blogPostInput);
        }

        navigation.navigate(SCREEN_BLOG_EDIT, {blog: currentBlog.slug});
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
