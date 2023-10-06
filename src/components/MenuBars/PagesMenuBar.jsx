import { Box, HStack, IconButton, Icon, Text, Menu, Pressable, HamburgerIcon, Button, Avatar } from "native-base";
import { goToAppDashboard } from "../../jot-zone/navigation-helpers";

export default function PagesMenuBar({ navigation }) {
    return (
        <Box safeAreaTop bg="white">
          <HStack justifyContent="space-between" alignItems="center" bg="black" px="5" py="3">
              <HStack
                alignItems="center" 
                space="5"
              >
              <Text color="white" fontSize="2xl" fontWeight="bold">Jot.zone</Text>
            </HStack>

            <HStack space="2">
              <Box>
                  <>
                    <Button onPress={goToAppDashboard}>
                        <Text color="white" fontSize="md">
                          Log in / Open app
                        </Text>
                    </Button>
                  </>
              </Box>
            </HStack>
          </HStack>
      </Box>
    );
}