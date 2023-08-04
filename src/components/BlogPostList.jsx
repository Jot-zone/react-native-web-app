import { Box, Text, VStack, HStack, Button } from "native-base";
import moment from 'moment';
import BlogPostContent from "./BlogPostContent";
import MediaGallery from "./MediaGallery";

export default function BlogPostList({ blogPosts, handlePostDelete, handleEditPost }) {
    blogPosts = blogPosts.map(function(post) {
        const createdMoment = moment(post.created_at);
        const nowMoment = moment();

        const diff = nowMoment.diff(createdMoment, 'hours');

        post.created_at_string = diff > 24
            ? createdMoment.format('MMMM DD YYYY, h:mm:ss a')
            : createdMoment.fromNow();

        return post;
    });

    return (
        <VStack space="5" marginTop="5">
            {blogPosts.map((post) => (
                <Box 
                    key={post.id}
                    borderWidth="1"
                    borderColor="gray.300"
                    borderRadius="md"
                    paddingX="3"
                    paddingY="2"
                >
                    <HStack space="1" justifyContent="space-between">
                        <Text color="gray.700" fontSize="sm">
                            { post.created_at_string }
                        </Text>

                        <Box>
                            <HStack space="2">
                                <Button size="xs" colorScheme="primary"
                                    onPress={ () => handleEditPost(post.id)}
                                >
                                    Edit
                                </Button>

                                <Button size="xs" colorScheme="danger"
                                    onPress={ () => handlePostDelete(post.id) }
                                >
                                    Delete
                                </Button>
                            </HStack>
                        </Box>
                    </HStack>
                    
                    { post.content && (
                        <Box marginY="3">
                            <BlogPostContent blogPostContent={post.content} />
                        </Box>
                    )}

                    { post.medias?.length && (
                        <Box marginY="2">
                            <MediaGallery medias={post.medias} />
                        </Box>
                    )}
                </Box>
            ))}
        </VStack>
    );
}
