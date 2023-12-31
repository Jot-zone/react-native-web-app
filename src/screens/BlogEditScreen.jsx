import { useState, useEffect, useRef } from "react";
import { Box, Link, Text, VStack, Heading, Button, AlertDialog, Icon, HStack } from "native-base";
import MainLayout from "../layouts/MainLayout";
import useBlogs from "../jot-zone/blogs";
import BlogPostList from "../components/BlogPostList";
import useBlogPosts from "../jot-zone/blog-posts";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { MaterialIcons } from '@expo/vector-icons';
import { SCREEN_BLOG_POST_EDIT } from '../nav/nav-constants';

const POST_LIMIT = 5;

export default function BlogEditScreen({ navigation, route }) {
    const Blogs = useBlogs();
    const BlogPosts = useBlogPosts();

    const [blog, setBlog] = useState(null);
    const [totalBlogPosts, setTotalBlogPosts] = useState(0);
    const [blogPosts, setBlogPosts] = useState([]);
    const [moreBlogPosts, setMoreBlogPosts] = useState(false);

    const [deletePostId, setDeletePostId] = useState(null);

    const initialize = async () => {
        setDeletePostId(null);

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

        setMoreBlogPosts(
            (currentBlogPostCount + moreBlogPosts.length) < totalBlogPosts
        );
    }

    const handlePostDelete = (postId) => {
        setDeletePostId(postId);
    };

    const handlePostDeleteConfirmation = async () => {
        await BlogPosts.destroy(blog.slug, deletePostId);
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
            <Box alignSelf="center" w="full" maxW="desktop">
                <VStack space="5">
                    <Heading size="md" textAlign="center">
                        {blog.name}
                    </Heading>

                    <Text textAlign="center">
                        <Link
                            href={`https://${blog.slug}.jot.zone`}
                            target="_blank"
                            isExternal={true}
                            _text={{
                                fontSize: "md",
                                fontWeight: "bold",
                                color: "blue.700",
                                textDecoration: "none",
                            }}
                        >
                            {blog.slug}.jot.zone
                        </Link>
                    </Text>

                    <Box 
                        // alignItems="center"
                    >
                        <Button
                            w="full"
                            maxW="48"
                            size="lg"
                            alignSelf="center"
                            onPress={ () => navigation.navigate(SCREEN_BLOG_POST_EDIT, {blog: blog.slug}) }
                        >
                            <HStack alignItems="center" space="1">
                                <Icon as={MaterialIcons} name="add" color="white" />

                                <Text color="white">
                                    Jot something
                                </Text>
                            </HStack>
                        </Button>
                    </Box>

                    <Box marginTop="3">
                        <BlogPostList 
                            editMode={true}
                            blog={blog}
                            blogPosts={blogPosts} 
                            handlePostDelete={handlePostDelete} 
                            handleEditPost={ (blogPostId) => navigation.navigate(
                                SCREEN_BLOG_POST_EDIT, 
                                { blog: blog.slug, blogPost: blogPostId }
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

            <DeleteConfirmation
                isOpen={ deletePostId !== null }
                onClose={ () => setDeletePostId(null) }
                onDelete={ handlePostDeleteConfirmation }
                recordType="Blog Post"
            />
        </MainLayout>
    );
}
