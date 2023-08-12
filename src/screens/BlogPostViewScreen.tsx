import { useEffect, useState } from 'react';
import { Box, Text } from 'native-base';
import useBlogPosts, { BlogPost } from '../jot-zone/blog-posts';
import { Blog } from '../jot-zone/blogs';
import MainLayout from '../layouts/MainLayout';
import BlogPostList from '../components/BlogPostList';

interface BlogPostViewScreenProps {
    navigation: any;
    route: any;
    blog: Blog;
    blogPostId: string;
}

export default function BlogPostViewScreen({
    navigation,
    route,
    blog,
}: BlogPostViewScreenProps) {
    const BlogPosts = useBlogPosts();

    const [loading, setLoading] = useState(true);
    const [currentBlogPost, setCurrentBlogPost] = useState<BlogPost>(null);

    const initialize = async () => {
        setLoading(true);
        const _blogPost = await BlogPosts.getBlogPostBySlug(blog.slug, route.params.blogPost);
        setCurrentBlogPost(_blogPost);
        setLoading(false);
    };

    useEffect(() => {
        initialize();
    }, [route.params.blogPost]);

    if (loading) {
        return (
            <MainLayout>
                <Text>Loading blog post view screen...</Text>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Box alignSelf="center" w="full" maxW="desktop" marginTop="2">
                <BlogPostList
                    blogPosts={[currentBlogPost]}
                />
            </Box>
        </MainLayout>
    );
}