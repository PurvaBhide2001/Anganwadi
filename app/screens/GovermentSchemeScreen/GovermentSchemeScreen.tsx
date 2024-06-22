import { observer } from "mobx-react-lite"
import { Box, Image, Text, Icon, Link } from "native-base"
import React, { FC } from "react"
import { TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { AppStackScreenProps, navigate } from "./../../navigators"
import { colors, spacing } from "./../../theme"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useSchemeContext } from "../../Context/SchemeContext"
import { useHeader } from "../../utils/useHeader"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Octicons from "react-native-vector-icons/Octicons"

interface GovermentSchemeScreenProps extends AppStackScreenProps<"GovermentScheme"> {}

export const GovermentSchemeScreen: FC<GovermentSchemeScreenProps> = observer(
  function GovermentSchemeScreen({ navigation }) {
    const { schemeInfo } = useSchemeContext()

    useHeader({
      title: "अंगणवाडी योजना",
      titleStyle: {
        fontStyle: "normal",
        fontSize: responsiveFontSize(2.5),
        fontWeight: "700",
        color: "#7d8592",
      },

      onLeftPress(event) {
        navigation.goBack()
      },
      leftIcon: "back",
    })
    return (
      <>
        <KeyboardAwareScrollView
          style={{ backgroundColor: "#white" }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <Box flex={1} flexDirection="column" padding={responsiveWidth(1.8)}>
            <Box flex={1} flexDirection="row" padding={responsiveWidth(0.5)}>
              <Box flex={3.5} justifyContent={"center"}>
                <Image
                  height={responsiveHeight(9)}
                  width={responsiveWidth(19)}
                  source={{ uri: schemeInfo?.image ? schemeInfo?.image : "" }}
                  alt="some"
                />
              </Box>
              <Box flex={8.5} justifyContent={"center"}>
                <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                  {schemeInfo?.title}
                </Text>
              </Box>
            </Box>

            <Box
              flex={1}
              alignItems={"flex-end"}
              flexDirection="row"
              justifyContent={"flex-start"}
              paddingBottom={responsiveWidth(1.5)}
              paddingRight={responsiveWidth(1.5)}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  shadowOpacity: 3,
                }}
              >
                {schemeInfo.document.endsWith(".pdf") ? (
                  <Box flex={1} flexDirection="row">
                    <Box flex={8} flexDirection="row"></Box>
                    <Box
                      bg={"green.400"}
                      flex={3}
                      flexDirection="row"
                      borderRadius={responsiveWidth(2)}
                      padding={responsiveWidth(0.2)}
                    >
                      <Box flex={0.4} justifyContent={"center"} alignItems={"flex-end"}>
                        <Icon
                          as={Octicons}
                          name="download"
                          size={responsiveHeight(2.5)}
                          color="white"
                          justifyContent={"flex-end"}
                        />
                      </Box>
                      <Box flex={1} alignItems={"center"}>
                        <Link color={"blue.600"} href={schemeInfo.document}>
                          <Text
                            color={"white"}
                            justifyContent="flex-end"
                            fontWeight={300}
                            fontSize={responsiveFontSize(2.1)}
                            bold
                          >
                            डाउनलोड
                          </Text>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Text>{""}</Text>
                )}
              </TouchableOpacity>
            </Box>
            <Box
              flex={7.5}
              padding={responsiveHeight(2.5)}
              bgColor="white"
              borderRadius={responsiveHeight(3)}
            >
              <Text
                fontSize={responsiveFontSize(2)}
                paddingX={responsiveHeight(1)}
                textAlign="justify"
                color="warmGray.500"
              >
                {schemeInfo?.description}
              </Text>
            </Box>
          </Box>
        </KeyboardAwareScrollView>
      </>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

// @demo remove-file
