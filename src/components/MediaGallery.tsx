import { createRef, RefObject, useEffect, useState, useCallback } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Box, Text, Container, Flex, AspectRatio, Pressable, Modal} from 'native-base';
import Gallery from 'react-native-image-gallery';
import { Image } from 'expo-image';
import { BlogPostMedia } from '../jot-zone/blog-posts';
import { set } from 'react-native-reanimated';

interface MediaGalleryProps {
    medias: Array<BlogPostMedia>;
}

export default function MediaGallery({
    medias,
}: MediaGalleryProps) {
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [fullscreenInitialPage, setFullscreenInitialPage] = useState(0);
    
    const onMediaPress = (idx: number) => {
        setFullscreenInitialPage(idx);
        setShowFullscreen(true);
    }

    if (showFullscreen) {
        return (
            <Modal
                isOpen={showFullscreen}
                onClose={() => setShowFullscreen(false)}
                size="full"
                style={{ backgroundColor: 'red' }}
            >
                <Modal.CloseButton />
                
                <Gallery
                    style={{ 
                        backgroundColor: 'black',
                        width: '100%',
                        margin: 0,
                    }}
                    images={medias.map(media => ({
                        source: { uri: media.url },
                    }))}
                    initialPage={fullscreenInitialPage}
                />
            </Modal>
        )
    }

    return (
        <Flex direction="row" wrap="wrap">
            { medias.map((media, idx) => (
                <Pressable
                    key={idx}
                    onPress={() => onMediaPress(idx)}
                    style={styles.container}
                    // height={{
                    //     base: 300,
                    //     md: 300,
                    // }}
                    width={{
                        base: '50%',
                        md: '50%',
                    }}
                >
                    <Image
                        style={styles.image}
                        source={media.url}
                        placeholder={blurhash}
                        contentFit="cover"
                        contentPosition="center"
                        transition={1000}
                    />
                </Pressable>
            )) }
        </Flex>
    );
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    //   width: '100%',
    //   height: 200,
      padding: 2,
      aspectRatio: 1,
    },
    image: {
      flex: 1,
      width: '100%',
      backgroundColor: '#0553',
    },
  });

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';