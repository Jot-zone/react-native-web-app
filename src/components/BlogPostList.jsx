import { Box, Text, VStack, HStack, Button, Pressable, IconButton, Icon } from "native-base";
import moment from 'moment';
import BlogPostContent from "./BlogPostContent";
import MediaGallery from "./MediaGallery";
import Clipboard from '@react-native-clipboard/clipboard';
import { getBlogPostUrl } from "../jot-zone/blog-posts";
import { MaterialIcons } from "@expo/vector-icons";

export default function BlogPostList({ 
    editMode = false,
    blog,
    blogPosts, 
    handlePostDelete = () => {}, 
    handleEditPost = () => {},
    handlePostClick = () => {},
}) {
    blogPosts = blogPosts.map(function(post) {
        const createdMoment = moment(post.created_at);
        const nowMoment = moment();

        const diff = nowMoment.diff(createdMoment, 'hours');

        post.created_at_string = diff > 24
            ? createdMoment.format('MMM DD YYYY, h:mm a')
            : createdMoment.fromNow();

        return post;
    });

    return (
        <VStack space="5">
            {blogPosts.map((post) => (
                <Box 
                    key={post.id}
                    backgroundColor="white"
                    borderWidth="1"
                    borderColor="gray.300"
                    borderRadius="md"
                    paddingX="3"
                    paddingY="2"
                >
                    <HStack space="1" justifyContent="space-between"
                        marginBottom="5"
                    >
                        <Pressable 
                            onPress={ () => handlePostClick(post.id) }
                        >
                            <Text
                                color="gray.700" 
                                fontSize="sm"
                            >
                                { post.created_at_string }
                            </Text>
                        </Pressable>

                        { editMode && (
                            <Box>
                                <HStack space="2">
                                    <Button size="sm" colorScheme="primary"
                                        onPress={ () => Clipboard.setString(getBlogPostUrl(blog.slug, post.id)) }
                                        leftIcon={<Icon as={MaterialIcons} name="content-copy" color="white" />}
                                    >
                                        Link
                                    </Button>

                                    <IconButton size="sm" colorScheme="info"
                                        onPress={ () => handleEditPost(post.id)}
                                        variant="solid"
                                        _icon={{
                                            name: "edit",
                                            as: MaterialIcons,
                                        }}
                                    />

                                    <IconButton size="sm" colorScheme="danger"
                                        onPress={ () => handlePostDelete(post.id) }
                                        variant="solid"
                                        _icon={{
                                            name: "delete",
                                            as: MaterialIcons,
                                        }}
                                    />
                                </HStack>
                            </Box>
                        )}
                    </HStack>
                    
                    { post.content && (
                        <Box marginBottom="5">
                            <BlogPostContent blogPostContent={post.content} />
                        </Box>
                    )}

                    { post.medias?.length ? (
                        <Box>
                            <MediaGallery medias={post.medias} />
                        </Box>
                    ) : ''}
                </Box>
            ))}
        </VStack>
    );
}
