import { Box, Button, Center, FormControl, Input, Link, Text, VStack } from "native-base"
import { AppStackScreenProps } from "../../navigators"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { Controller } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useLoginContext } from "../../Context/LoginContext"

import OTPRecieveComponent from "./OTPRecieveComponent"
import ContactNumberComponent from "./ContactNumberComponent"
import NewPassword from "./NewPassword"
interface ForgotPasswordProps extends AppStackScreenProps<"ForgotPassword"> {}
// const logo = require("../../assets/")
export const ForgotPassword: FC<ForgotPasswordProps> = observer(function ForgotPassword(_props) {
  const {
    control,
    handleSubmit,
    onSubmit,
    isShowOTP,
    isShowPasswordField,
    componentsForgetPassword,
    indexNumberOfForgetPassword,
  } = useLoginContext()
  const RenderComponent = componentsForgetPassword[indexNumberOfForgetPassword]
  console.log("renderComponent ", RenderComponent, indexNumberOfForgetPassword)

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#white" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <Center flex={1} w="100%" padding={responsiveWidth(2)}>
        <Box flex={1} safeArea w="95%" bg="white" borderRadius={responsiveWidth(3)}>
          <VStack flex={1} space={responsiveWidth(3)}>
            <Center flex={1}>
              <FormControl>
                <Center>
                  <Text fontSize={responsiveFontSize(3)} color="warmGray.700">
                    पासवर्ड रिसेट करा
                  </Text>
                </Center>
                <RenderComponent />
              </FormControl>
            </Center>
          </VStack>
        </Box>
      </Center>
    </KeyboardAwareScrollView>
  )
})
