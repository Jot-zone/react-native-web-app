import { Box } from 'native-base';
import MenuBar from '../components/MenuBar';

export default function MainLayout({ children }) {
    return (
        <Box p="5" backgroundColor="white">
            {children}
        </Box>
    )
}