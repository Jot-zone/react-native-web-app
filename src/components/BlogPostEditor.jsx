import React from 'react';
import {  StyleSheet } from 'react-native';
import { Box, Button } from "native-base";
import ReactQuill, { Quill } from 'react-quill';
import ImageCompress from 'quill-image-compress';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/react-quill-custom.css';

Quill.register('modules/imageCompress', ImageCompress);

export default function BlogPostEditor({ blog, blogPost, onSave: onSaveProp }) {
    console.log({bpEditor: blogPost});

    const _editor = React.createRef();

    const onImageInsert = async (imageBase64URL, imageBlob, editor) => {    
        const url = await Storage.uploadBlogImage(imageBlob, blog.slug, 'jpg');
        editor.insertEmbed(editor.getSelection().index, 'image', url);
    }

    const onSave = async () => {
        onSaveProp(_editor.current.value);
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            ['blockquote', 'code-block'],
            [{ 'indent': '-1'}, { 'indent': '+1' }],  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image', 'video'],
        ],

        imageCompress: {
            quality: 0.5,
            maxWidth: 1000,
            maxHeight: 1000,
            imageType: 'image/jpeg',
            debug: true,
            suppressErrorLogging: false,
            insertIntoEditor: onImageInsert,
        }
    };

    return (
        <>
            <Box alignSelf="center" w="full" maxW="desktop">
                <Box h="600px">
                    <ReactQuill 
                        ref={_editor}
                        theme="snow" 
                        placeholder='Jot here...'
                        modules={quillModules}
                        style={styles.quill}
                        defaultValue={blogPost?.content ?? ''}
                    />  
                </Box>

                <Box marginTop="20" alignItems="center">
                    <Button
                        w="2/5"
                        onPress={ onSave }
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
}

const styles = StyleSheet.create({
    quill: {
        height: '100%',
    }
});
