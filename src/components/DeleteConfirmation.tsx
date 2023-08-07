import React from "react";
import { Button, AlertDialog } from "native-base";

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;

    recordType?: string;
}

export default function DeleteConfirmation({
    isOpen,
    onClose,
    onDelete,
    recordType = '',
}: DeleteConfirmationProps) {
    const cancelRef = React.useRef(null);

    return (
        <>
            { isOpen && (
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Body>
                        {`Are you sure you want to delete this${recordType && ' ' + recordType}?`}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={onDelete}>
                            Delete
                        </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            )}
        </>
    );
}