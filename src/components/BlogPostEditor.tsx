import React, { RefObject, useMemo, useState } from 'react';
import {  StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, HStack, VStack } from "native-base";
import ReactQuill, { Quill } from 'react-quill';
import * as ImagePicker from 'expo-image-picker';
import ImageCompress from 'quill-image-compress';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import MediaManagementToolbar from './MediaManagementToolbar';
import useStorage from '../jot-zone/storage';
import { Blog } from '../jot-zone/blogs';
import { getImageMeta, uriToBlob } from '../jot-zone/file-helpers';
import { BlogPost, BlogPostInput, BlogPostMedia, BlogPostMediaType } from '../jot-zone/blog-posts';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/react-quill-custom.css';
import { set } from 'react-native-reanimated';

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
    const navigation = useNavigation();
    

    const _editor: RefObject<ReactQuill> = React.createRef();

    const [medias, setMedias] = useState<Array<BlogPostMedia>>(blogPost?.medias ?? []);
    const [addingMedia, setAddingMedia] = useState(false);

    const onImageInsert = async (imageBase64URL, imageBlob, editor) => {    
        setAddingMedia(true);
        const url = await Storage.uploadBlogImage(imageBlob, blog.slug, 'jpg');

        const imageMeta = await getImageMeta(url);

        const media: BlogPostMedia = {
            type: BlogPostMediaType.Image,
            url,
            width: imageMeta.width,
            height: imageMeta.height,
        };

        setMedias(medias => [media, ...medias]);
        setAddingMedia(false);
    }

    const onRemoveMediaByIndex = (index: number) => {
        setMedias(medias => medias.filter((_, i) => i !== index));
    };

    const onSave = async () => {
        onSaveProp({
            content: _editor.current.value.toString(),
            medias: medias, //todo
        });
    };

    const quillModules = useMemo(() => ({
        toolbar: [
            [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            ['blockquote', 'code-block'],
            [{ 'indent': '-1'}, { 'indent': '+1' }],  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image'],
        ],

        imageCompress: {
            quality: 1, // 0-1
            maxWidth: 1000,
            maxHeight: 1000,
            imageType: 'image/jpeg',
            debug: true,
            suppressErrorLogging: false,
            insertIntoEditor: onImageInsert,
        }
    }), []);

    return (
        <>
            <VStack alignSelf="center" w="full" maxW="desktop">
                <Box style={{ height: '642px' }}>
                    <ReactQuill 
                        ref={_editor}
                        theme="snow" 
                        placeholder='Jot here...'
                        modules={quillModules}
                        style={styles.quill}
                        defaultValue={blogPost?.content ?? ''}
                    />  
                </Box>

                <Box>
                    <MediaManagementToolbar
                        showAddButtons={ false }
                        medias={ medias }
                        addingMedia={ addingMedia }
                        onRemoveMediaPress={ onRemoveMediaByIndex }
                        style={{
                            backgroundColor: 'lightgray',
                        }}
                    />
                </Box>

                <Box marginTop="5" alignItems="center">
                    <HStack w="full" space={5}
                        justifyContent="center"
                    >
                        <Button
                            colorScheme="light"
                            /* @ts-ignore */
                            onPress={ () => navigation.navigate('Blog Edit', {blog: blog.slug}) }
                            flexGrow={1}
                            width="1/2"
                            maxW="md"
                        >
                            Cancel
                        </Button>

                        <Button
                            onPress={ onSave }
                            flexGrow={1}
                            width="1/2"
                            maxW="md"
                        >
                            Save
                        </Button>
                    </HStack>
                </Box>
            </VStack>
        </>
    );
}

const styles = StyleSheet.create({
    quill: {
        height: '600px',
    }
});
