import { Box, Heading, Link, VStack, Text, Button, List, FlatList } from "native-base";
import MainLayout from "../layouts/MainLayout";
import { goToAppDashboard } from "../jot-zone/navigation-helpers";

export default function HomeScreen() {
    return (
        <MainLayout>
            <Box margin={3} textAlign="center">
                <VStack space={5}>
                    <Heading fontSize="5xl">Jot.zone</Heading>

                    <Text fontSize="xl">
                        Your own place (<Text color="secondary.700" fontStyle="italic">zone</Text>) for simple blog posts (<Text color="secondary.700" fontStyle="italic">jots</Text>).
                    </Text>

                    <Button width="sm" maxWidth="full" margin="auto" onPress={goToAppDashboard}>
                        Get Started
                    </Button>

                    <Heading marginTop="8" marginBottom="0">
                        Features
                    </Heading>

                    <img
                        src={require('../../assets/img/jot-reader-example.jpg')}
                        alt="Jot Reader Example"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            margin: 'auto',
                            borderRadius: '5px',
                        }}
                    />

                    <Button marginTop="8" width="sm" maxWidth="full" margin="auto" onPress={goToAppDashboard}>
                        Get Started
                    </Button>
                </VStack>
            </Box>
        </MainLayout>
    );
}