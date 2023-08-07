import { Modal, Text, Image } from 'native-base';
import { BlogPostMedia } from '../jot-zone/blog-posts';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MediaGallerFullProps {
    medias: Array<BlogPostMedia>;
    isOpen: boolean;
    startIndex: number;
    onClose: () => void;
}

interface ImageGalleryItem {
    original: string;
    thumbnail: string;
}

export default function MediaGalleryFull({
    medias,
    isOpen,
    startIndex,
    onClose,
}: MediaGallerFullProps) {
    const [images, setImages] = useState<Array<ImageGalleryItem>>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollBottom, setScrollBottom] = useState(0);

    useEffect(() => {
        setImages(medias.map(media => ({
            original: media.url,
            thumbnail: media.url,
        } as ImageGalleryItem)));
    }, [medias]);

    useEffect(() => {
        setScrollPosition(window.pageYOffset);

        // console.log('window.pageYOffset', window.pageYOffset);
        // console.log('window.innerHeight', window.innerHeight);

        setScrollBottom(window.pageYOffset + window.innerHeight);
        // setScrollBottom(window.innerHeight);
    }, [isOpen]);

    return (
        <>
            <style>{`
                #root {
                    height: ${scrollBottom}px;
                }

                .image-gallery-slides {
                    overflow: visible;
                }

                .image-gallery-right {
                    display: none !important;
                }

                .image-gallery-left {
                    display: none !important;
                }
            `}</style>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="full"
                safeAreaTop={true}
                style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    top: scrollPosition + 'px',
                    height: '100vh',
                }}
            >
                <ImageGallery
                    items={images}
                    startIndex={startIndex}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showThumbnails={false}
                    style={{

                    }}
                    renderItem={(item) => (
                        <TransformWrapper
                            // limitToBounds={false}
                        >
                            <TransformComponent
                                wrapperStyle={{
                                    // position: 'absolute',
                                    // height: '100vh',
                                    // width: '100vw',
                                    overflow: 'visible',
                                }}
                            >
                                <img
                                    src={item.original}
                                    alt="gallery image"
                                />
                            </TransformComponent>
                        </TransformWrapper>
                    )}
                />
            </Modal>
        </>
    )
}