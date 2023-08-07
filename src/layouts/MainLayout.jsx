import { Box, Container, ScrollView } from 'native-base';
import MenuBar from '../components/MenuBar';

export default function MainLayout({ children }) {
    return (
        <>
            <ScrollView backgroundColor="gray.100">
                <Box safeAreaBottom paddingX="2" paddingTop="5" paddingBottom="12">
                    {children}
                </Box>
            </ScrollView>
        </>
    )
}