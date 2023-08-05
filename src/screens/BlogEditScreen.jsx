import { useState, useEffect } from "react";
import { Box, Text, Stack, HStack, VStack, Heading, Link, Button } from "native-base";
import MainLayout from "../layouts/MainLayout";
import useBlogs from "../jot-zone/blogs";
import BlogPostList from "../components/BlogPostList";
import useBlogPosts from "../jot-zone/blog-posts";

const POST_LIMIT = 5;

export default function BlogEditScreen({ navigation, route }) {
    const Blogs = useBlogs();
    const BlogPosts = useBlogPosts();

    const [blog, setBlog] = useState(null);
    const [totalBlogPosts, setTotalBlogPosts] = useState(0);
    const [blogPosts, setBlogPosts] = useState([]);
    const [moreBlogPosts, setMoreBlogPosts] = useState(false);

    const initialize = async () => {
        const _blog = await Blogs.getBlogBySlug(route.params.blog);
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
                            onPress={ () => navigation.navigate('New Blog Post', {blog: blog.slug}) }
                        >
                            Jot something
                        </Button>
                    </Box>

                    <Box>
                        <BlogPostList 
                            editMode={true}
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
