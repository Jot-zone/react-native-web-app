import React, { useState } from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Text } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Box, Button } from "native-base";
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { uriToBlob } from '../jot-zone/file-helpers';
import TextInputModal from '../components/TextInputModal';

export default function BlogPostEditor({ blog, blogPost, onSave: onSaveProp }) {
    console.log({bpEditor: blogPost});

    const [status, requestPermission] = MediaLibrary.usePermissions();
    if (status === null) {
        requestPermission();
      }

    const _editor = React.createRef();

    const [showVideoUrlModal, setShowVideoUrlModal] = useState(false);

    const toolbarHandler = async (name, value) => {
        if (name === 'image') {
            console.log('image handler');

            let result = await ImagePicker.launchImageLibraryAsync({
                // quality: 0,
                selectionLimit: 1,
            });

            console.log({result});
          
            if (!result.canceled) {
                const imageUri = result.assets[0].uri;

                const resizedImage = await ImageResizer.createResizedImage(
                    imageUri,
                    1000, // maxWidth
                    1000, // maxHeight
                    'JPEG',
                    50, // quality
                    0, // rotation
                    null, // output path
                );

                console.log({resizedImage});

                // const uriWithoutFilePrefix = resizedImage.uri.replace('file://', '');
                // console.log({uriWithoutFilePrefix});

                // const imageBlob = await fetch(resizedImage.uri).then(r => r.blob()); // this works for ios
                const imageBlob = await uriToBlob(resizedImage.uri); // this works for android
                // const imageBlob = await RNFetchBlob.fetch('GET', uriWithoutFilePrefix); // this hadn't worked for android

                // console.log({imageBlob});

                const url = await Storage.uploadBlogImage(imageBlob, blog.slug, 'jpg');

                // console.log({url});
                
                _editor.current.focus();

                const range = await _editor.current.getSelection();
                const index = range.index ?? 0;

                _editor.current.insertEmbed(
                    index,
                    'image', 
                    url
                );
            } else {
                console.log('Image picker canceled.');
            }
        } else if (name === 'video') {
            setShowVideoUrlModal(true);
        }
    };

    const onSave = async () => {
        const html = await _editor.current.getHtml();
        onSaveProp(html);
    }

    const quillModules = {
        toolbar: [
            [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            ['blockquote', 'code-block'],
            [{ 'indent': '-1'}, { 'indent': '+1' }],  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image'],
        ],
    };

    return (
        <Box style={styles.root}>
            <StatusBar style="auto" />

            <TextInputModal
                isOpen={showVideoUrlModal}
                title="Video URL"
                placeholder="Video URL"
                onSubmit={ (url) => {
                    _editor.current.focus();
                    _editor.current.insertEmbed(
                        0,
                        'video',
                        url
                    );
                    setShowVideoUrlModal(false);
                }}
                onClose={ () => setShowVideoUrlModal(false) }
            />
            
            <QuillToolbar 
                editor={_editor} 
                options={quillModules.toolbar} 
                custom={{
                    handler: toolbarHandler,
                    actions: [
                        'image',
                        'video'
                    ]
                }}
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

            <Box alignItems="center">
                <Button
                    w="full"
                    onPress={ onSave }
                >
                    Save
                </Button>
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
