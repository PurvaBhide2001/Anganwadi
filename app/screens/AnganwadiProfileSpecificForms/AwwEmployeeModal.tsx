import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  Pressable,
  Spinner,
  Text,
} from "native-base"
import { TouchableOpacity, Image } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useCommanContextContext } from "../../Context/CommanContext"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { usePlayingToysContext } from "../../Context/PlayingToysContext"
import SelectDropdown3 from "../../UI/SelectDropdown3"
import { emploayeeTypeList } from "../../../assets/constant/commanConstant"
import InputField2 from "../../UI/InputField2"
import { useAnganwadiProfileContext } from "../../Context/AnganwadiProfileContext"
import { useAnganwadiEmployeeContext } from "../../Context/AnganwadiEmployeeContext"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ScrollView } from "react-native-gesture-handler"
import { KeyboardAvoidingView } from "react-native"

interface Iprops {
  maxWidth: number
  isShowModal: boolean
  closeModal: Function
  cancelButton: Function
  submitButton: Function
}
export default ({ maxWidth, cancelButton, submitButton }: Iprops) => {
  const { control, onUpdatedEmployee, isUpdate, handleSubmit, onAddEmployee } =
    useAnganwadiEmployeeContext()

  return (
    <Modal.Content maxWidth={maxWidth}>
      <Modal.CloseButton />
      <ScrollView style={{}} automaticallyAdjustKeyboardInsets={true}>
        <KeyboardAwareScrollView
          style={{ backgroundColor: "#white" }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          // contentContainerStyle={styles.container}
          scrollEnabled={false}
          enableOnAndroid
          alwaysBounceVertical
        >
          <Modal.Body>
            <Box flex={1} flexDirection="column">
              <Box flex={1}>
                <Modal.Header
                  flex={1}
                  justifyItems="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Text fontSize={responsiveFontSize(2.9)} fontWeight={700} color="#ff9900">
                    कर्मचारी माहिती
                  </Text>
                </Modal.Header>
              </Box>
              <Box flex={1}>
                <Box flex={1}>
                  <Box flex={1} flexDirection="column" paddingY={responsiveWidth(1.5)}>
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <SelectDropdown3
                        control={control}
                        name={`role`}
                        placeholder={"रोल निवडा"}
                        listItem={emploayeeTypeList}
                        label={"value"}
                        labelValue={"id"}
                        bgColor="white"
                        borderBottomColor="warmGray.200"
                        borderColor="white"
                        borderRadius={2}
                        borderWidth={0.4}
                        fontSize={2.2}
                      />
                    </Box>
                  </Box>
                  <Box flex={1} flexDirection="row" paddingY={responsiveWidth(1.5)}>
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={control}
                        name={`f_name`}
                        placeholder={"पहिले नाव"}
                        keyPadType={"default"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                      />
                    </Box>
                  </Box>
                  <Box flex={1} flexDirection="row" paddingY={responsiveWidth(1.5)}>
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={control}
                        name={`m_name`}
                        placeholder={"मधले नाव"}
                        keyPadType={"default"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                      />
                    </Box>
                  </Box>
                  <Box flex={1} flexDirection="row" paddingY={responsiveWidth(1.5)}>
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={control}
                        name={`l_name`}
                        placeholder={"आडनाव"}
                        keyPadType={"default"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                      />
                    </Box>
                  </Box>
                  <Box flex={1} flexDirection="row" paddingY={responsiveWidth(1.5)}>
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={control}
                        name={`contact_number`}
                        placeholder={"दूरध्वनी"}
                        keyPadType={"phone-pad"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        maxLength={10}
                        isRequiredValue={true}
                        errorMsg="Please enter a valid contact number."
                      />
                    </Box>
                  </Box>

                  <Box flex={1} flexDirection="row" paddingY={responsiveWidth(1.5)}>
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={control}
                        name={`email`}
                        placeholder={"ई-मेल (Optional)"}
                        keyPadType={"email-address"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isRequiredValue={false}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  cancelButton()
                }}
              >
                <Text fontSize={responsiveFontSize(2)} color="gray.900" fontWeight={650}>
                  रद्द करा
                </Text>
              </Button>
              {isUpdate ? (
                <Button onPress={handleSubmit(onUpdatedEmployee)}>
                  <Text fontSize={responsiveFontSize(2)} color="gray.200" fontWeight={650}>
                    अपडेट करा
                  </Text>
                </Button>
              ) : (
                <Button onPress={handleSubmit(onAddEmployee)}>
                  <Text fontSize={responsiveFontSize(2)} color="gray.200" fontWeight={650}>
                    सबमिट करा
                  </Text>
                </Button>
              )}
            </Button.Group>
          </Modal.Footer>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Modal.Content>
  )
}
