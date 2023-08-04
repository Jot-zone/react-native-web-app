import { Modal} from 'native-base';
import Gallery from 'react-native-image-gallery';
import { BlogPostMedia } from '../jot-zone/blog-posts';

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
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
                initialPage={startIndex}
            />
        </Modal>
    )
}