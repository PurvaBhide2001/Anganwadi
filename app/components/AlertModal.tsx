import { Box, Modal, Text } from "native-base"
import { responsiveFontSize } from "react-native-responsive-dimensions"

interface IProps {
  alertText: string
  isOpen: boolean
  onClose: Function
}
export default ({ alertText, isOpen, onClose }: IProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()} size="full">
        <Modal.Content maxWidth="300">
          {/* <Modal.Header>Select Address</Modal.Header> */}
          <Modal.Body>
            <Box>
              <Text style={{ fontSize: responsiveFontSize(2) }}>{alertText}</Text>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
