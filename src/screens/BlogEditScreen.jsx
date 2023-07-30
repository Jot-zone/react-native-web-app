import { useState, useEffect } from "react";
import { Box, Text, Stack, HStack, VStack, Heading, Link, Button } from "native-base";
import MainLayout from "../layouts/MainLayout";
import useBlogs from "../jot-zone/blogs";
import BlogPostList from "../components/BlogPostList";

const POST_LIMIT = 5;

export default function BlogEditScreen({ navigation, route }) {
    const Blogs = useBlogs();

    const blog = route.params.blog;

    const [totalBlogPosts, setTotalBlogPosts] = useState(0);
    const [blogPosts, setBlogPosts] = useState([]);
    const [moreBlogPosts, setMoreBlogPosts] = useState(false);

    const initialize = async () => {
        const totalBlogPosts = await Blogs.getBlogPostCountBySlug(blog.slug);
        setTotalBlogPosts(totalBlogPosts);

        const blogPostDocs = await Blogs.getBlogPostsBySlug(blog.slug, POST_LIMIT);
        setBlogPosts(blogPostDocs);

        setMoreBlogPosts(blogPostDocs.length < totalBlogPosts);
    };

    
    useEffect(() => {
        initialize();
    }, []);

    const loadMoreBlogPosts = async () => {
        const currentBlogPostCount = blogPosts.length;

        const moreBlogPosts = await Blogs.getBlogPostsBySlug(
            blog.slug, 
            POST_LIMIT, 
            blogPosts[blogPosts.length - 1]
        );

        setBlogPosts([...blogPosts, ...moreBlogPosts]);

        setMoreBlogPosts((currentBlogPostCount + moreBlogPosts.length) < totalBlogPosts);
    }

    navigation.addListener('focus', () => {
        initialize();
    });


    return (
        <MainLayout>
            <Box alignSelf="center" w="full" maxW="xl">
                <VStack space="5">
                    <Heading size="md" textAlign="center">
                        {blog.name}
                    </Heading>

                    <Heading size="xs" textAlign="center">
                        {blog.slug}.jot.zone
                    </Heading>

                    <Box>
                        <Button
                            onPress={ () => navigation.navigate('New Blog Post', {blog}) }
                        >
                            Jot something
                        </Button>
                    </Box>

                    <Box>
                        <BlogPostList blogPosts={blogPosts} />
                    </Box>

                    { moreBlogPosts && (
                        <Box>
                            <Button
                                w="1/5"
                                onPress={ loadMoreBlogPosts }
                            >
                                Load More
                            </Button>
                        </Box>
                    )}
                </VStack>
            </Box>
        </MainLayout>
    );
}
