import { Box, Button, Center, FormControl, Input, Link, Text, VStack } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import { TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { useLoginContext } from "../../Context/LoginContext"
import NumberInput from "../../UI/MultipleInputField"
import NumberInputField from "../../UI/NumberInputField"
export default () => {
  const {
    onClickToGetOTP,
    setContactNumber,
    ForgetPasswordControl,
    ForgetPasswordHandleSubmit,
    ForgetPasswordError,
  } = useLoginContext()
  return (
    <>
      <Box>
        <Center>
          <Text
            fontSize={responsiveFontSize(2.5)}
            w={responsiveWidth(80)}
            m={responsiveWidth(3)}
            color="warmGray.600"
          >
            मोबाइल नंबर
          </Text>
        </Center>
        <Box flex={1} alignItems={"center"} alignContent={"center"} padding={responsiveWidth(1)}>
          <NumberInputField
            name={"contact_no"}
            control={ForgetPasswordControl}
            placeholder={"मोबाइल नंबर प्रविष्ट करा "}
            keyPadType={"numeric"}
            maxLength={10}
            style={{
              borderWidth: responsiveWidth(0.4),
              borderColor: "#e4e4e4",
              fontSize: responsiveFontSize(2.2),
            }}
            message={"मोबाइल नंबर"}
            isValue={true}
          />
          {ForgetPasswordError.contact_no && <Text>{ForgetPasswordError.contact_no.message}</Text>}
        </Box>
        <Center
          flex={1}
          width={"100%"}
          paddingTop={responsiveWidth(7)}
          padding={responsiveWidth(2)}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#dc3541",
              height: "100%",
              width: "95%",
              justifyContent: "center",
              borderRadius: responsiveWidth(2),
            }}
            onPress={ForgetPasswordHandleSubmit(onClickToGetOTP)}
          >
            <Text
              textAlign="center"
              color={"white"}
              justifyContent="center"
              fontWeight={600}
              fontSize={responsiveFontSize(2.5)}
              padding={responsiveHeight(1)}
            >
              ओटीपी पाठवा
            </Text>
          </TouchableOpacity>
        </Center>
      </Box>
    </>
  )
}
