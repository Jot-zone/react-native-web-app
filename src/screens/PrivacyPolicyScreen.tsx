import { Box, Heading, Link } from "native-base";
import { SafeAreaView } from "react-native";


export default function PrivacyPolicyScreen() {
    return (
        <SafeAreaView>
            <Box margin={5}>
                <Heading>Privacy Policy</Heading>

                <Link href="https://www.iubenda.com/privacy-policy/90071246">
                    Click here
                </Link>
            </Box>
        </SafeAreaView>
    );
}