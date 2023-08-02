import { Modal, Button, Input } from 'native-base';
import React, { useState } from 'react';

export default function TextInputModal({ isOpen, onClose, onSubmit, title, placeholder }) {
    const [text, setText] = useState('');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    <Input
                        placeholder={placeholder}
                        value={text}
                        onChangeText={setText}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                        <Button onPress={onClose}>Cancel</Button>
                        <Button onPress={() => onSubmit(text)}>Submit</Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}