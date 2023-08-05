import { Modal } from 'native-base';
import { BlogPostMedia } from '../jot-zone/blog-posts';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import { useEffect, useState } from 'react';

interface MediaGallerFullProps {
    medias: Array<BlogPostMedia>;
    isOpen: boolean;
    startIndex: number;
    onClose: () => void;
}

export default function MediaGalleryFull({
    medias,
    isOpen,
    startIndex,
    onClose,
}: MediaGallerFullProps) {
    const [images, setImages] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollBottom, setScrollBottom] = useState(0);

    useEffect(() => {
        setImages(medias.map(media => ({
            original: media.url,
            thumbnail: media.url,
        })));
    }, [medias]);

    useEffect(() => {
        setScrollPosition(window.pageYOffset);
        setScrollBottom(window.pageYOffset + window.innerHeight);
    }, [isOpen]);

    return (
        <>
            <style>{`
                #root {
                    height: ${scrollBottom}px;
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
                    style={{

                    }}
                />
            </Modal>
        </>
    )
}