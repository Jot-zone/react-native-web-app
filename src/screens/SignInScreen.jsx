import  MainLayout from '../layouts/MainLayout';
import { Box, Button } from 'native-base';
import { AuthContext } from '../contexts/auth';
import { useContext, useState } from 'react';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
    const { firebaseUser, promptGoogleLogin, logOut } = useContext(AuthContext);

    return <MainLayout>
        <Box>
            { firebaseUser ? (
                <Button onPress={ () => logOut() }>
                    Log Out
                </Button>
            ) : (
                <Button onPress={ () => promptGoogleLogin() } m={3}>
                    Sign In with G
                </Button>
            ) }

        </Box>
    </MainLayout>
}