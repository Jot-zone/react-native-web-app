import React, { RefObject } from 'react';
import {  StyleSheet } from 'react-native';
import { Box, Button } from "native-base";
import ReactQuill, { Quill } from 'react-quill';
import ImageCompress from 'quill-image-compress';
import useStorage from '../jot-zone/storage';
import { Blog } from '../jot-zone/blogs';
import { BlogPost, BlogPostInput, BlogPostMedia, BlogPostMediaType } from '../jot-zone/blog-posts';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/react-quill-custom.css';

Quill.register('modules/imageCompress', ImageCompress);

interface BlogPostEditorProps {
    blog: Blog,
    blogPost?: BlogPost,
    onSave: (blogPostInput: BlogPostInput) => void,
}

export default function BlogPostEditor({ 
    blog, 
    blogPost, 
    onSave: onSaveProp 
}: BlogPostEditorProps) {
    console.log({bpEditor: blogPost});

    const Storage = useStorage();

    const _editor: RefObject<ReactQuill> = React.createRef();

    // const onImageInsert = async (imageBase64URL, imageBlob, editor) => {    
    //     const url = await Storage.uploadBlogImage(imageBlob, blog.slug, 'jpg');
    //     editor.insertEmbed(editor.getSelection().index, 'image', url);
    // }

    const onSave = async () => {
        onSaveProp({
            content: _editor.current.value.toString(),
            medias: [], //todo
        });
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            ['blockquote', 'code-block'],
            [{ 'indent': '-1'}, { 'indent': '+1' }],  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ],

        // imageCompress: {
        //     quality: 1,
        //     maxWidth: 1000,
        //     maxHeight: 1000,
        //     imageType: 'image/jpeg',
        //     debug: true,
        //     suppressErrorLogging: false,
        //     insertIntoEditor: onImageInsert,
        // }
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
