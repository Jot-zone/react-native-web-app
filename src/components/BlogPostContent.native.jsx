import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import { useWindowDimensions } from 'react-native';

const BlogPostContent = ({ blogPostContent }) => {
    const { width } = useWindowDimensions();
    const imgMaxWidth = width - 50;

    const renderers = {
        iframe: IframeRenderer
    };
      
      const customHTMLElementModels = {
        iframe: iframeModel
    };

    return (
        <>
            <RenderHTML
                contentWidth={width}
                source={{ html: blogPostContent }}
                renderers={renderers}
                WebView={WebView}
                customHTMLElementModels={customHTMLElementModels}
                tagsStyles={{
                    img: {
                        maxWidth: imgMaxWidth
                    },
                    p: {
                        margin: 0,
                        // lineHeight: 1.3 // no good
                    }
                }}
                classesStyles={{
                    'ql-video': {
                        width: imgMaxWidth,
                        aspectRatio: 16 / 9
                    }
                }}
            />
        </>
    );
};

export default BlogPostContent;
