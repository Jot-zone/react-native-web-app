import { useState, useEffect } from "react";
import { Box, Text, Stack, HStack, VStack, Heading, Link, Button } from "native-base";
import MainLayout from "../layouts/MainLayout";
import useBlogs from "../jot-zone/blogs";
import BlogPostList from "../components/BlogPostList";
import useBlogPosts from "../jot-zone/blog-posts";

const POST_LIMIT = 5;

export default function BlogViewScreen({ navigation, route }) {
    const BlogPosts = useBlogPosts();

    const [blog, setBlog] = useState(null);
    const [totalBlogPosts, setTotalBlogPosts] = useState(0);
    const [blogPosts, setBlogPosts] = useState([]);
    const [moreBlogPosts, setMoreBlogPosts] = useState(false);

    const initialize = async () => {
        const _blog = route.params.blog;
        setBlog(_blog);

        const totalBlogPosts = await BlogPosts.getBlogPostCountBySlug(_blog.slug);
        setTotalBlogPosts(totalBlogPosts);

        const blogPostDocs = await BlogPosts.getBlogPostsBySlug(_blog.slug, POST_LIMIT);
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

    const handlePostDelete = async (postId) => {
        await BlogPosts.destroy(blog.slug, postId);
        initialize();
    };

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
            <Box alignSelf="center" w="full" maxW="xl" marginTop="2">
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
                            editMode={false}
                            blogPosts={blogPosts} 
                            handlePostDelete={handlePostDelete} 
                            handleEditPost={ (blogPostId) => navigation.navigate(
                                'New Blog Post', 
                                { blog: blog.slug, blogPost: blogPostId }
                            )}
                        />
                    </Box>

                    { moreBlogPosts && (
                        <Box>
                            <Button
                                w="1/5"
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