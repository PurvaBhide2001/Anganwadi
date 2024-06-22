import { Box, Button, Center, FormControl, Input, Link, Text, VStack } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import { TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { useLoginContext } from "../../Context/LoginContext"
export default () => {
  const { setOtp, onClickToSubmitOTP } = useLoginContext()
  return (
    <>
      <Center>
        <Text
          fontSize={responsiveFontSize(2.5)}
          w={responsiveWidth(80)}
          m={responsiveWidth(3)}
          color={"warmGray.700"}
        >
          ओटीपी एंटर करा
        </Text>
      </Center>
      <FormControl>
        <Box padding={responsiveWidth(2)} alignItems="center">
          <OTPInputView
            pinCount={6}
            secureTextEntry={true}
            style={{
              // padding: responsiveWidth(1),
              width: "97%",
              height: responsiveHeight(3),
              backgroundColor: "#FFFFFF",
            }}
            onCodeChanged={(value) => setOtp(value)}
            codeInputFieldStyle={{
              color: "black",
              borderColor: "#e4e4e4",
              borderWidth: responsiveWidth(0.4),
              width: responsiveWidth(13.5),
              borderRadius: responsiveWidth(2),
            }}
            codeInputHighlightStyle={{
              width: responsiveWidth(13.5),
              borderWidth: responsiveWidth(0.4),

              color: "#87CEEB",
            }}
            autoFocusOnLoad
          />
        </Box>
      </FormControl>

      <Center flex={1} width={"100%"} paddingTop={responsiveWidth(7)} padding={responsiveWidth(2)}>
        <TouchableOpacity
          style={{
            backgroundColor: "#dc3541",
            height: "100%",
            width: "95%",
            justifyContent: "center",
            borderRadius: responsiveWidth(2),
          }}
          onPress={() => onClickToSubmitOTP()}
        >
          <Text
            textAlign="center"
            color={"white"}
            justifyContent="center"
            fontWeight={600}
            fontSize={responsiveFontSize(2.5)}
            padding={responsiveHeight(1)}
          >
            ओटीपी पडताळणी करा
          </Text>
        </TouchableOpacity>
      </Center>
    </>
  )
}
