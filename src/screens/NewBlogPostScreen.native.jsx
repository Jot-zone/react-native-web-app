import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Box, Input, Text, Stack, HStack, VStack, Heading, Link, Button } from "native-base";
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import MainLayout from "../layouts/MainLayout";
import useBlogs from '../jot-zone/blogs';



export default function NewBlogPostScreen({ navigation, route }) {
    const Blogs = useBlogs();

    const currentBlog = route.params.blog;
    
    const _editor = React.createRef();

    const onSave = async () => {
        const html = await _editor.current.getHtml();
        await Blogs.createBlogPost(currentBlog.slug, html);
        navigation.navigate('Blog Edit', {currentBlog});
    }

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar style="auto" />
            
            {/* <QuillToolbar editor={_editor} options="full" theme="light" /> */}
            
            <QuillEditor
                style={styles.editor}
                ref={_editor}
                initialHtml=""
                quill={{
                    placeholder: 'Jot here...',
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
        </SafeAreaView>
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
