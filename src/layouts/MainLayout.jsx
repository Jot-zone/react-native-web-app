import { Box, Container, ScrollView, View } from 'native-base';
import { Platform } from 'react-native';

export default function MainLayout({ children }) {
    return (
        <>
            { Platform.OS === 'web' ? (
                <Box
                    backgroundColor="gray.100" 
                    minH="80vh"
                    paddingX="2" paddingTop="5" paddingBottom="12"
                    style={{
                        userSelect: 'text',
                    }}
                >
                    {children}
                </Box>
            ) : (
                <ScrollView backgroundColor="gray.100">
                    <Box safeAreaBottom paddingX="2" paddingTop="5" paddingBottom="12">
                        {children}
                    </Box>
                </ScrollView>
            )}
        </>
    )
}