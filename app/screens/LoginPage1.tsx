import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "native-base"
import CodePin from "react-native-pin-code"
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useLoginContext } from "../Context/LoginContext"
import { Controller } from "react-hook-form"
interface LoginPage1Props extends AppStackScreenProps<"LoginPage1"> {}

const logo = require("../../assets/images/ZP-Jalgaon-5.png")

export const LoginPage1: FC<LoginPage1Props> = observer(function LoginPage1(_props) {
  const { control, handleSubmit, onSubmit } = useLoginContext()
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#white" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      // contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <Center flex={1} w="100%" padding={responsiveWidth(2)}>
        <Box flex={1} safeArea w="90%" bg="white" borderRadius={responsiveWidth(3)}>
          <VStack flex={1} space={responsiveWidth(3)}>
            <Center
              flex={1}
              bg="pink.100"
              borderTopColor={"red.500"}
              borderTopWidth={responsiveWidth(1)}
            >
              <Image
                width="50%"
                height={responsiveHeight(25)}
                source={logo}
                alt="logo"
                bgColor={"pink.100"}
              />
            </Center>
            <Center flex={1}>
              <FormControl>
                <Center>
                  <Text fontSize={responsiveFontSize(3)}>लॉग इन करा</Text>
                </Center>
                <Center>
                  <Text
                    fontSize={responsiveFontSize(2.5)}
                    w={responsiveWidth(80)}
                    m={responsiveWidth(3)}
                  >
                    मोबाईल नंबर
                  </Text>
                </Center>
                <Center>
                  <Controller
                    control={control}
                    name="contact_no"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Input
                        keyboardType={"phone-pad"}
                        placeholder="मोबाईल नंबर"
                        borderWidth={responsiveWidth(0.4)}
                        borderColor="black"
                        fontSize={responsiveFontSize(2.2)}
                        onChangeText={(value) => onChange(value)}
                        w={responsiveWidth(80)}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Field is required!",
                      },
                    }}
                  />
                </Center>
                <Center>
                  <Text
                    fontSize={responsiveFontSize(2.5)}
                    w={responsiveWidth(80)}
                    m={responsiveWidth(3)}
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
                          style={{
                            // padding: responsiveWidth(1),
                            width: "90%",
                            height: responsiveHeight(4),
                            backgroundColor: "#FFFFFF",
                          }}
                          onCodeChanged={(value) => onChange(value)}
                          codeInputFieldStyle={{
                            color: "black",
                            borderColor: "black",
                            borderWidth: responsiveWidth(0.4),
                          }}
                          codeInputHighlightStyle={{
                            width: responsiveWidth(11),
                            height: responsiveHeight(7),
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
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  एम-पिन विसरलात?
                </Link>
              </FormControl>
            </Center>

            <Center flex={1} width={"100%"}>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  borderRadius: responsiveWidth(3),
                }}
                onPress={handleSubmit(onSubmit)}
              >
                <Text
                  textAlign="center"
                  color={"white"}
                  justifyContent="center"
                  fontWeight={600}
                  fontSize={responsiveFontSize(2.3)}
                >
                  साइन इन
                </Text>
              </TouchableOpacity>
            </Center>
            <Box
              flex={1}
              width={"100%"}
              style={{ alignItems: "flex-end" }}
              padding={responsiveWidth(2)}
            >
              <Text fontSize={responsiveFontSize(2.6)}>तुमचे खाते नाही ?</Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "lg",
                }}
                href="#"
              >
                कृपया नोंदणी करा.
              </Link>
            </Box>
          </VStack>
        </Box>
      </Center>
    </KeyboardAwareScrollView>
  )
})
