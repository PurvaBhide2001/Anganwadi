import { Box, Center, FormControl, Input, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { Controller } from "react-hook-form"
import { useLoginContext } from "../../Context/LoginContext"
import OTPInputView from "@twotalltotems/react-native-otp-input"

export default () => {
  const { setFirstPin, setSecondPin, onFillMpin, isVerifiedPin, onClickToSubmitNewMPIN } =
    useLoginContext()
  return (
    <>
      <Box flex={1}>
        <Text
          fontSize={responsiveFontSize(2.5)}
          w={responsiveWidth(80)}
          m={responsiveWidth(3)}
          color={"warmGray.700"}
        >
          पासवर्ड प्रविष्ट करा
        </Text>

        <FormControl>
          <Box padding={responsiveWidth(2)} alignItems="center">
            <OTPInputView
              pinCount={4}
              secureTextEntry={false}
              style={{
                width: "100%",
                height: responsiveHeight(3),
                backgroundColor: "#FFFFFF",
              }}
              onCodeChanged={(value) => setFirstPin(value)}
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

        <Text
          fontSize={responsiveFontSize(2.5)}
          w={responsiveWidth(80)}
          m={responsiveWidth(3)}
          color={"warmGray.700"}
        >
          पासवर्ड पडताळणी करा
        </Text>

        <FormControl>
          <Box padding={responsiveWidth(2)} alignItems="center">
            <OTPInputView
              pinCount={4}
              secureTextEntry={true}
              style={{
                width: "100%",
                height: responsiveHeight(3),
                backgroundColor: "#FFFFFF",
              }}
              // onCodeFilled={(pin: string) => onFillMpin(pin)}
              onCodeChanged={(value) => {
                onFillMpin(value)
                setSecondPin(value)
              }}
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
          {!isVerifiedPin && <Text>कृपया बरोबर पासवर्ड टाका </Text>}
        </FormControl>
        <Center
          flex={1}
          width={"100%"}
          paddingTop={responsiveWidth(7)}
          padding={responsiveWidth(2)}
        >
          <TouchableOpacity
            disabled={!isVerifiedPin}
            style={{
              backgroundColor: "#dc3541",
              height: "100%",
              width: "95%",
              justifyContent: "center",
              borderRadius: responsiveWidth(2),
            }}
            onPress={() => onClickToSubmitNewMPIN()}
          >
            <Text
              textAlign="center"
              color={"white"}
              justifyContent="center"
              fontWeight={600}
              fontSize={responsiveFontSize(2.5)}
              padding={responsiveHeight(1)}
            >
              पासवर्ड अपडेट करा
            </Text>
          </TouchableOpacity>
        </Center>
      </Box>
    </>
  )
}
