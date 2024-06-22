import { Box, Center, FormControl, Image, Input, Link, Text, VStack } from "native-base"
import { AppStackScreenProps, navigate } from "../navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { Controller } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useLoginContext } from "../Context/LoginContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
interface LoginPageProps extends AppStackScreenProps<"LoginPage"> {}
const logo = require("../../assets/surveyimages/log-in-page.png")
export const LoginPage: FC<LoginPageProps> = observer(function LoginPage(_props) {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    validateNumber,
    setIndexNumberOfForgetPassword,
  } = useLoginContext()

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#white" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <Center flex={1} w="100%" padding={responsiveWidth(2)}>
        <Box flex={1} safeArea w="90%" bg="white" borderRadius={responsiveWidth(3)}>
          <VStack flex={1} space={responsiveWidth(3)}>
            <Box
              borderTopRadius={responsiveWidth(2)}
              flex={1}
              width="100%"
              height={responsiveHeight(30)}
              bg="pink.100"
              borderTopColor={"red.500"}
              borderTopWidth={responsiveWidth(1.3)}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                width="75%"
                height={responsiveHeight(27)}
                source={logo}
                alt="logo"
                overflow={"visible"}
                bgColor={"pink.100"}
              />
            </Box>
            <Center flex={1}>
              <FormControl>
                <Center>
                  <Text fontSize={responsiveFontSize(3)} color="warmGray.700">
                    लॉग इन करा
                  </Text>
                </Center>
                <Center>
                  <Text
                    fontSize={responsiveFontSize(2.5)}
                    w={responsiveWidth(80)}
                    m={responsiveWidth(3)}
                    color="warmGray.600"
                  >
                    मोबाईल नंबर
                  </Text>
                </Center>
                <Center>
                  <Controller
                    control={control}
                    name="contact_no"
                    render={({
                      field: { onChange, value, onBlur, ref, name },
                      formState: { errors },
                    }) => (
                      <Input
                        keyboardType={"phone-pad"}
                        placeholder="मोबाईल नंबर"
                        borderWidth={responsiveWidth(0.4)}
                        borderColor="#e4e4e4"
                        borderRadius={responsiveWidth(2)}
                        fontSize={responsiveFontSize(2.2)}
                        onChangeText={(value) => onChange(value)}
                        w={responsiveWidth(80)}
                        value={value}
                        ref={ref}
                        type={"text"}
                        maxLength={10}
                      />
                    )}

                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: "Field is required!",
                    //   },
                    // }}
                  />
                </Center>
                <Box flex={1} flexDirection={"row"}>
                  <Box flex={0.5}> </Box>
                  <Box flex={11}>
                    {errors.contact_no && <Text color="red.600">{errors.contact_no.message}</Text>}
                  </Box>
                </Box>
                <Center>
                  <Text
                    fontSize={responsiveFontSize(2.5)}
                    w={responsiveWidth(80)}
                    m={responsiveWidth(3)}
                    color={"warmGray.700"}
                  >
                    एम-पिन एंटर करा
                  </Text>
                </Center>
                <FormControl>
                  <Box padding={responsiveWidth(2)} alignItems="center">
                    <Controller
                      control={control}
                      name="mpin"
                      render={({ field: { onChange, value, onBlur } }) => (
                        <OTPInputView
                          pinCount={4}
                          secureTextEntry={true}
                          style={{
                            width: "95%",
                            height: responsiveHeight(4),
                            backgroundColor: "#FFFFFF",
                          }}
                          onCodeChanged={(value) => onChange(value)}
                          codeInputFieldStyle={{
                            color: "black",
                            borderColor: "#e4e4e4",
                            borderWidth: responsiveWidth(0.4),
                            width: responsiveWidth(17),
                            borderRadius: responsiveWidth(2),
                          }}
                          codeInputHighlightStyle={{
                            width: responsiveWidth(17),

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
                <Link
                  _text={{
                    fontSize: "md",
                    fontWeight: "500",
                    color: "#467dfa",
                  }}
                  alignSelf="center"
                  mt="1"
                  onPress={() => {
                    setIndexNumberOfForgetPassword(0)
                    navigate("ForgotPassword")
                  }}
                >
                  एम-पिन विसरलात?
                </Link>
              </FormControl>
            </Center>

            <Center flex={1} width={"100%"} padding={responsiveWidth(2)}>
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
                  साइन इन
                </Text>
              </TouchableOpacity>
            </Center>
          </VStack>
        </Box>
      </Center>
    </KeyboardAwareScrollView>
  )
})
