import { Box, Text, Stack, HStack, VStack, Heading, Link } from "native-base";

export default function BlogList({blogs}) {
    return (
        <Box w="full">
            { blogs.map((blog) => ( 
                <Box key={blog.slug}
                    borderColor="coolGray.200" 
                    borderWidth="1"
                    w="full"
                >
                    <Box
                        m="3"
                    >
                        <HStack space="2" justifyContent="space-between">
                            <VStack space="2">
                                <Heading size="md">
                                    {blog.name}
                                </Heading>

                                <Link href={'https://' + blog.slug + '.jot.zone'}>
                                    {blog.slug}.jot.zone
                                </Link>
                            </VStack>

                            <VStack space="2">
                                foo
                            </VStack>
                        </HStack>
                    </Box>
                </Box>
            )) }
        </Box>
    );
}
