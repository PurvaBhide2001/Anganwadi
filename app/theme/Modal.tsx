import { Box, Button, Input, Modal, Pressable, Text } from "native-base"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../Context/AnganwadiSuvidhaContext"

interface Iprops {
  maxWidth: number
  isShowModal: boolean
  closeModal: Function
  cancelButton: Function
  submitButton?: Function
  Component: Function
  title?: string
}
export default ({
  maxWidth,
  isShowModal,
  closeModal,
  cancelButton,
  submitButton,
  Component,
  title,
}: Iprops) => {
  return (
    <>
      <Modal isOpen={isShowModal} onClose={() => closeModal()} avoidKeyboard>
        <Component
          maxWidth={maxWidth}
          isShowModal={isShowModal}
          closeModal={closeModal}
          cancelButton={cancelButton}
          submitButton={submitButton}
          Component={Component}
          title={title}
        />
      </Modal>
    </>
  )
}
