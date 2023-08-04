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
            style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
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