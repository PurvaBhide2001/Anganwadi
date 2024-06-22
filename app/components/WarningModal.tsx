// @ts-nocheck
import React from "react"
import { Modal, Button, ScrollView, Text, Center, VStack, NativeBaseProvider } from "native-base"
interface IProps {
  message: string
  isOpen: boolean
  closeModal: Function
  maxH: string
  yesToDelete: Function
  yesToDeleteName: string
  cancelToDeleteName: string
  cancelToDelete: Function
  title: string
  size: string
}
export default ({
  message,
  isOpen,
  closeModal,
  maxH,
  yesToDelete,
  cancelToDelete,
  cancelToDeleteName,
  yesToDeleteName,
  size,
  title,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => closeModal()} size={size}>
      <Modal.Content maxH={maxH}>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <Text>{message}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                cancelToDelete()
              }}
            >
              {cancelToDeleteName}
            </Button>
            <Button
              onPress={() => {
                yesToDelete()
              }}
            >
              {yesToDeleteName}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
