import { Box, Text, Stack, HStack, VStack, Heading, Link, Button } from "native-base";
import moment from 'moment';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function BlogPostList({ blogPosts }) {
    const isWeb = Platform.OS === 'web';

    blogPosts = blogPosts.map(function(post) {
        post = {
            id: post.id,
            ...post.data()
        };

        const createdMoment = moment(post.created_at);
        const nowMoment = moment();

        const diff = nowMoment.diff(createdMoment, 'days');

        post.created_at_string = diff > 1
            ? createdMoment.format('MMMM Do YYYY, h:mm:ss a')
            : createdMoment.fromNow();

        return post;
    });

    return (
        <VStack space="3" marginTop="5">
            {blogPosts.map((post, idx) => (
                <Box 
                    key={idx}
                    borderWidth="1"
                    borderColor="gray.300"
                    borderRadius="md"
                    paddingX="5"
                    paddingY="2"
                >
                    <Text color="gray.700" fontSize="sm">
                        { post.created_at_string }
                    </Text>
                    
                    { isWeb ? (
                        <Text fontSize="md">
                            <div dangerouslySetInnerHTML={{__html: post.content}} />
                        </Text>
                    ) : (
                        <Box h="16">
                            <WebView
                                originWhitelist={['*']}
                                source={{ html: `
                                    <!DOCTYPE html>
                                    <html lang="en">
                                    <head>
                                    <meta charset="UTF-8" />
                                    <title>Hello, world!</title>
                                    <meta name="viewport" content="width=device-width,initial-scale=1" />
                                    </head>
                                    <body>
                                        <div style="background-color: transparent">
                                            ${post.content}
                                        </div>
                                    </body>
                                    </html>
                                `}}
                            />
                        </Box>
                    )}
                </Box>
            ))}
        </VStack>
    );
}
