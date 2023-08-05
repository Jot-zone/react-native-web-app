import { Modal } from 'native-base';
import { BlogPostMedia } from '../jot-zone/blog-posts';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';

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
    const images = medias.map(media => ({
        original: media.url,
        thumbnail: media.url,
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="full"
            safeAreaTop={true}
            style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                // backgroundColor: 'red',
                // position: 'absolute',
                // top: '0px',
                // right: '0px',
                // bottom: '0px',
                // left: '0px',
            }}
        >
            <ImageGallery
                items={images}
                startIndex={startIndex}
                showPlayButton={false}
            />         
        </Modal>
    )
}