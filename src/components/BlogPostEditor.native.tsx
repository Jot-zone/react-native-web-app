import React, { RefObject, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Box, Button, HStack } from "native-base";
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { uriToBlob } from '../jot-zone/file-helpers';
import useStorage from '../jot-zone/storage';
import MediaManagementToolbar from './MediaManagementToolbar';
import { Blog } from '../jot-zone/blogs';
import { BlogPost, BlogPostInput, BlogPostMedia, BlogPostMediaType } from '../jot-zone/blog-posts';
import { SCREEN_BLOG_EDIT } from '../navs/LoggedInNav';

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
    // console.log({bpEditor: blogPost});

    const Storage = useStorage();
    const navigation = useNavigation();

    const [cameraPermissionStatus, requestPermission] = ImagePicker.useCameraPermissions();

    const _editor: RefObject<QuillEditor> = React.createRef();

    const [medias, setMedias] = useState<Array<BlogPostMedia>>(blogPost?.medias ?? []);
    const [addingMedia, setAddingMedia] = useState(false);

    const addMediaHandler = async () => {
        // todo: handle gifs

        if (!cameraPermissionStatus.granted) {
            const result = await requestPermission();
            console.log({result});
            
            if (!result.granted) {
                alert('You need to enable camera permissions for this app, to use this feature.');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            quality: .8, // 0-1 (i think)
            allowsMultipleSelection: true,
            selectionLimit: 10,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        // console.log({result});
        
        setAddingMedia(true);

        if (!result.canceled) {
            result.assets.forEach(async (asset: ImagePicker.ImagePickerAsset) => {
                const imageUri = asset.uri;

                const resizedImage = await ImageResizer.createResizedImage(
                    imageUri,
                    1000, // maxWidth
                    1000, // maxHeight
                    'JPEG',
                    100, // quality (0-100)
                    0, // rotation
                    null, // output path
                );

                // console.log({resizedImage});

                // const uriWithoutFilePrefix = resizedImage.uri.replace('file://', '');
                // console.log({uriWithoutFilePrefix});

                // const imageBlob = await fetch(resizedImage.uri).then(r => r.blob()); // this works for ios
                const imageBlob = await uriToBlob(resizedImage.uri); // this works for android
                // const imageBlob = await RNFetchBlob.fetch('GET', uriWithoutFilePrefix); // this hadn't worked for android

                // console.log({imageBlob});

                const url = await Storage.uploadBlogImage(imageBlob, blog.slug, 'jpg');

                const media: BlogPostMedia = {
                    type: BlogPostMediaType.Image,
                    url,
                    width: resizedImage.width,
                    height: resizedImage.height,
                };

                setMedias(medias => [media, ...medias]);
            });
        }
  
        setAddingMedia(false);
    };

    const onRemoveMediaByIndex = (index: number) => {
        setMedias(medias => medias.filter((_, i) => i !== index));
    };

    const onSave = async () => {
        const html = await _editor.current.getHtml();

        onSaveProp({
            content: html,
            medias,
        });
    }

    const quillModules = {
        toolbar: [
            [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            ['blockquote', 'code-block'],
            [{ 'indent': '-1'}, { 'indent': '+1' }],  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // ['image'],
        ],
    };

    return (
        <Box style={styles.root}>
            <StatusBar />

            <QuillToolbar 
                editor={_editor} 
                options={quillModules.toolbar} 
                theme="light" 
            />


            <QuillEditor
                style={styles.editor}
                ref={_editor}
                initialHtml={ blogPost?.content ?? ''}
                quill={{
                    placeholder: 'Jot here...',
                    modules: {
                        toolbar: false,
                    },
                }}
            />

            <MediaManagementToolbar
                medias={ medias }
                addingMedia={ addingMedia }
                onAddMediaPress={ addMediaHandler }
                onRemoveMediaPress={ onRemoveMediaByIndex }
            />

            <Box w="full">
                <HStack>
                <Button
                        w="2/5"
                        borderRadius="0"
                        colorScheme="light"
                        /* @ts-ignore */
                        onPress={ () => navigation.navigate(SCREEN_BLOG_EDIT, {blog: blog.slug}) }
                    >
                        Cancel
                    </Button>

                    <Button
                        w="3/5"
                        borderRadius="0"
                        onPress={ onSave }
                    >
                        Save
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#eaeaea',
    },
    editor: {
        flex: 1,
        padding: 0,
        borderColor: 'gray',
        borderWidth: 1,
        // marginVertical: 5,
        backgroundColor: 'white',
    },
  });
