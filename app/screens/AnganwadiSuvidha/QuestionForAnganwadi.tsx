import { Box, Button, Modal, Radio, Text } from "native-base"
import React, { useState } from "react"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useLoginContext } from "../../Context/LoginContext"
interface Iprops {
  maxWidth: number
  isShowModal: boolean
  closeModal: Function
  cancelButton: Function
  submitButton: Function
}
export default ({ maxWidth, isShowModal, closeModal, cancelButton, submitButton }: Iprops) => {
  const { smartAnganwadiAns } = useAnganwadiSuvidhaContext()
  const { setAnganwadSmartSatus, anganwadSmartSatus } = useLoginContext()
  return (
    <Modal.Content maxWidth={maxWidth}>
      <Modal.CloseButton />
      <Modal.Body>
        <Box flex={1} flexDirection="column">
          <Box flex={1}>
            <Modal.Header flex={1} justifyItems="center" alignContent="center" alignItems="center">
              <Text fontSize={responsiveFontSize(2.9)} fontWeight={700} color="#ff9900">
                स्थिती
              </Text>
            </Modal.Header>
          </Box>
          <Box flex={1} padding={responsiveWidth(2)}>
            <Box flex={1}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="gray.600">
                आपली अंगणवाडी स्मार्ट अंगणवाडी आहे का ?
              </Text>
            </Box>
            <Box flex={1} paddingY={responsiveWidth(2)}>
              <Radio.Group
                name="myRadioGroup"
                value={anganwadSmartSatus}
                flex={1}
                flexDirection="row"
                onChange={(nextValue) => {
                  setAnganwadSmartSatus(nextValue)
                }}
              >
                <Radio flex={1} value="1" mx={responsiveWidth(1)}>
                  <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="gray.600">
                    होय
                  </Text>
                </Radio>
                <Radio flex={1} value="0" mx={responsiveWidth(1)}>
                  <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="gray.600">
                    नाही
                  </Text>
                </Radio>
              </Radio.Group>
            </Box>
            <Box flex={10}></Box>
          </Box>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            onPress={() => {
              submitButton()
            }}
          >
            <Text fontSize={responsiveFontSize(2)} color="gray.200" fontWeight={650}>
              सबमिट करा
            </Text>
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
