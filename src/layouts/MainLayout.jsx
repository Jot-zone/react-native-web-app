import { Box } from 'native-base';
import MenuBar from '../components/core/MenuBar';

export default function MainLayout({ children }) {
    return (
        <Box m="5">
            {/* <MenuBar /> */}

            {children}
        </Box>
    )
}