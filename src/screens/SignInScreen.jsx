import  MainLayout from '../layouts/MainLayout';
import { Box, Button, Heading, Text } from 'native-base';
import * as WebBrowser from "expo-web-browser";
import { AuthContext } from '../contexts/auth';
import { useContext } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
    const { promptGoogleLogin } = useContext(AuthContext);

    return <MainLayout>
        <Box safeArea alignItems="center">
            <Text>
                Welcome to
            </Text>

            <Heading>
                Jot.zone
            </Heading>

            <Box marginTop="10">
                <Button size="lg" onPress={ () => promptGoogleLogin() }>
                    Sign in with Google
                </Button>
            </Box>
        </Box>
    </MainLayout>
}