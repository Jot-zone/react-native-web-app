import { Box, HStack, Button, IconButton, VStack, Image, Icon, Text, ScrollView } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { BlogPostMedia } from '../jot-zone/blog-posts';

const loadingGif = require('../../assets/img/loading.gif');

interface MediaManagementToolbarProps {
    medias: Array<BlogPostMedia>;
    addingMedia: boolean;
    showAddButtons?: boolean;
    onAddMediaPress?: () => void;
    onRemoveMediaPress?: (mediaIdx: number) => void;
    style?: any;
}

export default function MediaManagementToolbar({
    medias,
    addingMedia,
    showAddButtons = true,
    onAddMediaPress = () => {},
    onRemoveMediaPress = () => {},
    style = {},
}: MediaManagementToolbarProps) {
    return (
        <Box w="full" style={style}>
            <HStack
                alignItems="center"
            >
                { showAddButtons && (
                    <HStack space="5" p="2"
                        alignItems="center"
                    >
                        <IconButton
                            size="md"
                            _icon={{
                                name: "image",
                                as: MaterialIcons,
                            }}
                            onPress={ onAddMediaPress }
                        />
                    </HStack>
                ) }

                { (medias.length > 0 || addingMedia) && (
                    <ScrollView horizontal={true}>
                        <HStack 
                            space="2" 
                            paddingBottom="2" 
                            paddingX="2" 
                            borderBottomWidth="1" 
                            borderBottomColor="gray.300"
                        >
                            { addingMedia && (
                                <Box>
                                    {/* <Text>Loading</Text> */}
                                    <Image
                                        source={loadingGif}
                                        size="sm"
                                        alt="Loading"
                                    />
                                </Box>
                            ) }

                            { medias.map((media, idx) => (
                                <Box key={idx}>
                                    <IconButton
                                        size="xs"
                                        colorScheme={"danger"}
                                        _icon={{
                                            name: "close",
                                            as: MaterialIcons,
                                        }}
                                        onPress={ () => onRemoveMediaPress(idx) }
                                    />

                                    <Image
                                        source={{ uri: media.url }}
                                        alt="Uploaded image"
                                        size="sm"
                                    />
                                </Box>
                            )) }
                        </HStack>
                    </ScrollView>
                ) }
            </HStack>
        </Box>
    );
}