import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Text, Pressable, IconButton, VStack, Input, Checkbox, Button } from "native-base";
import { Blog } from "../jot-zone/blogs";
import useEmailSubscriptions from "../jot-zone/email-subscriptions";
import { useToast } from 'native-base';


interface SubscriptionDrawerProps {
    blog: Blog;
}

export default function SubscriptionDrawer({
    blog,
}: SubscriptionDrawerProps) {
    const EmailSubscriptions = useEmailSubscriptions();
    const toast = useToast();

    const [open, setOpen] = React.useState(false);

    const [cadences, setCadences] = React.useState([]); // ["daily", "weekly"]

    const emailRef = React.useRef(null);

    const onCheckboxChange = (value) => {
        setCadences(value);
    };

    const onSavePress = async () => {
        console.log("onSavePress");

        // test:
        await EmailSubscriptions.addEmailSubscription(
            blog.slug,
            emailRef.current.value,
            cadences,
        );

        toast.show({
            title: "Subscription saved.",
            colorScheme: 'success',
            duration: 3000,
        });

        setOpen(false);
    };

    return (
        <>
            <VStack
                alignItems="center"
            >
                <Pressable
                    paddingX="3"
                    paddingY="1"
                    rounded={5}
                    bg="green.700"
                    color="white"
                    maxW="50vw"
                    onPress={ () => setOpen(!open) }
                >
                    <HStack
                        space="5"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Text 
                                color="white"
                                fontSize="lg"
                            >
                                Subscribe
                            </Text>
                        </Box>

                        <IconButton
                            _icon={{
                                name: open ? "arrow-drop-up" : "arrow-drop-down",
                                as: MaterialIcons,
                                color: "white",
                            }}
                            onPress={ () => setOpen(!open) }
                        />
                    </HStack>
                </Pressable>

                { open && (
                    <Box
                        bg="white"
                        p="3"
                        rounded={5}
                        borderWidth="1"
                        borderColor="green.700"
                    >
                        <VStack
                            space="3"
                        >
                            <Input
                                ref={emailRef}
                                placeholder="Email"
                                bg="white"
                                borderWidth="1"
                                rounded={5}
                                size="lg"
                                // p="3"
                                // _focus={{
                                //     borderColor: "green.700",
                                // }}
                            />

                            <Checkbox.Group
                                accessibilityLabel="Daily"
                                onChange={ onCheckboxChange }
                            >
                                <Checkbox
                                    value="daily"
                                    // my="1"
                                    size="sm"
                                >
                                    Daily
                                </Checkbox>
                                
                                <Checkbox
                                    marginTop="1"
                                    value="weekly"
                                    // my="1"
                                    size="sm"
                                >
                                    Weekly
                                </Checkbox>
                            </Checkbox.Group>

                            <Button
                                bg="green.600"
                                color="white"
                                _pressed={{
                                    bg: "green.800",
                                }}
                                onPress={ onSavePress }
                            >
                                Save
                            </Button>
                        </VStack>
                    </Box>
                ) }
            </VStack>
        </>
    )
}