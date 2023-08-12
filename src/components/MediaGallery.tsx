import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Flex, Pressable } from 'native-base';
import { Image } from 'expo-image';
import { BlogPostMedia } from '../jot-zone/blog-posts';
import MediaGalleryFull from './MediaGalleryFull';

interface MediaGalleryProps {
    medias: Array<BlogPostMedia>;
}

export default function MediaGallery({
    medias,
}: MediaGalleryProps) {
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [fullscreenInitialPage, setFullscreenInitialPage] = useState(0);
    
    const onMediaPress = (idx: number) => {
        // console.log('onMediaPress', idx);
        setFullscreenInitialPage(idx);
        setShowFullscreen(true);
    }

    return (
        <>
            { showFullscreen && (
                <MediaGalleryFull
                    medias={medias}
                    isOpen={showFullscreen}
                    startIndex={fullscreenInitialPage}
                    onClose={() => setShowFullscreen(false)}
                />   
            )}

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
                            md: '1/3',
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
        </>
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