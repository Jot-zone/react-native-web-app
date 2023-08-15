import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { memo } from 'react';

const BlogPostContent = ({ blogPostContent }) => {
    const { width } = useWindowDimensions();
    const imgMaxWidth = width - 50;

    return (
        <>
            <RenderHtml
                contentWidth={width}
                source={{ html: blogPostContent }}
                tagsStyles={{
                    img: {
                        maxWidth: imgMaxWidth
                    },
                    p: {
                        margin: 0,
                        lineHeight: 1.3 // untested
                    }
                }}
            />
        </>
    );
};

export default BlogPostContent;
