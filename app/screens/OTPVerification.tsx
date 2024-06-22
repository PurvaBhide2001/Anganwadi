import OTPInputView from "@twotalltotems/react-native-otp-input"
import { Box, Center, FormControl, Text } from "native-base"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { TouchableOpacity } from "react-native-gesture-handler"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../Context/LoginContext"
const { control, handleSubmit, onSubmit } = useLoginContext()

const [isShowOTP, setIsShowOTP] = useState(false)

const handlePress = () => {
  setIsShowOTP(!isShowOTP)
}
const OTPVerification = () => {
  return (
    <>
      <Box>
        <Center>
          <Text
            fontSize={responsiveFontSize(2.5)}
            w={responsiveWidth(80)}
            m={responsiveWidth(3)}
            color={"warmGray.700"}
          >
            OTP एंटर करा
          </Text>
        </Center>
        <FormControl>
          <Box padding={responsiveWidth(2)} alignItems="center">
            <Controller
              control={control}
              name="mpin"
              render={({ field: { onChange, value, onBlur } }) => (
                <OTPInputView
                  pinCount={6}
                  secureTextEntry={true}
                  style={{
                    // padding: responsiveWidth(1),
                    width: "97%",
                    height: responsiveHeight(3),
                    backgroundColor: "#FFFFFF",
                  }}
                  onCodeChanged={(value) => onChange(value)}
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
              )}
              rules={{
                required: {
                  value: true,
                  message: "Field is required!",
                },
              }}
            />
          </Box>
        </FormControl>
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
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              textAlign="center"
              color={"white"}
              justifyContent="center"
              fontWeight={600}
              fontSize={responsiveFontSize(2.5)}
              padding={responsiveHeight(1)}
            >
              OTP पडताळणी करा
            </Text>
          </TouchableOpacity>
        </Center>
      </Box>
    </>
  )
}

export default OTPVerification
