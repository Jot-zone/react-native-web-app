import { Box, HStack, IconButton, Icon, Text, Menu, Pressable, HamburgerIcon, Button, Avatar } from "native-base";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MenuBar({ navigation }) {
    const { firebaseUser, logOut } = useContext(AuthContext);

    return (
        <Box safeAreaTop bg="black">
          <HStack justifyContent="space-between" alignItems="center" bg="black" px="5" py="3">
              <HStack
                alignItems="center" 
                space="5"
              >
                <Pressable accessibilityLabel="Nav menu" onPress={() => navigation.toggleDrawer()}>
                  <HamburgerIcon size="6" />
                </Pressable>

              <Text color="white" fontSize="2xl" fontWeight="bold">Jot.zone</Text>
            </HStack>

            <HStack space="2">
              <Box>
                { firebaseUser ? (
                  <>
                    <HStack space="2" alignItems="center">
                      <Box>
                        <Menu trigger={triggerProps => {
                          return <Pressable accessibilityLabel="Nav menu" {...triggerProps}>
                            <Avatar
                              source={{
                                uri: firebaseUser.photoURL,
                              }}
                            ></Avatar>
                          </Pressable>;
                        }}>
                          <Menu.Item onPress={logOut}>
                            Log out
                          </Menu.Item>
                        </Menu>
                      </Box>

                      <Text color="white" fontSize="md">
                        {firebaseUser.displayName}
                      </Text>
                    </HStack>
                  </>
                ) : (
                  <>
                    {/* <Button onPress={doAuth}>
                      <HStack space="2" alignItems="center">
                        <Icon
                          as={<MaterialCommunityIcons name="google" />}
                          size="sm"
                          color="white"
                        />

                        <Text color="white" fontSize="md">
                          Log in / Register
                        </Text>
                      </HStack>
                    </Button> */}
                  </>
                )}
              </Box>
            </HStack>
          </HStack>
      </Box>
    );
}