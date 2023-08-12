import { useState, useEffect } from "react";
import { Box, Text, Stack, HStack, VStack, Heading, Link, Button } from "native-base";
import MainLayout from "../layouts/MainLayout";
import BlogPostList from "../components/BlogPostList";
import useBlogPosts from "../jot-zone/blog-posts";
import { SCREEN_BLOG_POST_VIEW } from "../navs/SubdomainNav";

const POST_LIMIT = 5;

export default function BlogViewScreen({ navigation, route, blog }) {
    const BlogPosts = useBlogPosts();

    const [totalBlogPosts, setTotalBlogPosts] = useState(0);
    const [blogPosts, setBlogPosts] = useState([]);
    const [moreBlogPosts, setMoreBlogPosts] = useState(false);

    const initialize = async () => {
        const totalBlogPosts = await BlogPosts.getBlogPostCountBySlug(blog.slug);
        setTotalBlogPosts(totalBlogPosts);

        const blogPostDocs = await BlogPosts.getBlogPostsBySlug(blog.slug, POST_LIMIT);
        setBlogPosts(blogPostDocs);

        setMoreBlogPosts(blogPostDocs.length < totalBlogPosts);
    };

    
    useEffect(() => {
        navigation.addListener('focus', () => {
            initialize();
        });
    }, [navigation]);

    const loadMoreBlogPosts = async () => {
        const currentBlogPostCount = blogPosts.length;

        const moreBlogPosts = await BlogPosts.getBlogPostsBySlug(
            blog.slug, 
            POST_LIMIT, 
            blogPosts[blogPosts.length - 1]
        );

        setBlogPosts([...blogPosts, ...moreBlogPosts]);

        setMoreBlogPosts((currentBlogPostCount + moreBlogPosts.length) < totalBlogPosts);
    }

    // navigation.addListener('focus', () => {
    //     initialize();
    // });

    if (!blog) {
        return (
           <Text>Loading...</Text>
        );
    }

    return (
        <MainLayout>
            <Box alignSelf="center" w="full" maxW="desktop" marginTop="2">
                <VStack space="5">
                    <Heading size="lg" textAlign="center">
                        {blog.name}
                    </Heading>

                    <Heading size="sm" textAlign="center" color="blue.700"
                        href={`https://${blog.slug}.jot.zone`}
                    >
                        {blog.slug}.jot.zone
                    </Heading>

                    <Box>
                        <BlogPostList 
                            blog={blog}
                            editMode={false}
                            blogPosts={blogPosts} 
                            handlePostClick={ (blogPostId) => navigation.navigate(
                                SCREEN_BLOG_POST_VIEW,
                                { blogPost: blogPostId }
                            )}
                        />
                    </Box>

                    { moreBlogPosts && (
                        <Box>
                            <Button
                                w="full"
                                maxW="48"
                                colorScheme="secondary"
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
