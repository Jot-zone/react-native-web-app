import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import React from 'react';

export default function BlogPostContent({ blogPostContent }) {
    const { width } = useWindowDimensions();
    const imgMaxWidth = width - 50;

    return (
        <RenderHtml
            contentWidth={width}
            source={{ html: blogPostContent }}
            tagsStyles={{
                img: {
                    // maxWidth: imgMaxWidth
                    maxWidth: '300px'
                },
                p: {
                    margin: 0
                }
            }}
        />
    );
}
