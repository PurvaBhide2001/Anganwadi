import { observer } from "mobx-react-lite"
import { Avatar, Box, Image, Link, Text } from "native-base"
import React, { FC } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { AppStackScreenProps, navigate } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useHeader } from "../../../utils/useHeader"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useSuchanaContext } from "../../../Context/SuchanaContext"
import { randIntWithZero } from "../../../filter/requireFunction"
interface ShowParticularResourceScreenProps extends AppStackScreenProps<"ShowParticularResource"> {}

export const ShowParticularResourceScreen: FC<ShowParticularResourceScreenProps> = observer(
  function ShowParticularResourceScreen({ navigation }) {
    const { colorData, suchanaData, selectedScuchanaItem, selectedColorData } = useSuchanaContext()
    const giveColorData = colorData[randIntWithZero(colorData.length)]
    // const { suchanaData } = useSuchanaContext()
    useHeader({
      title: "सूचना",
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
          <Box width="100%" padding={responsiveWidth(2)}>
            <Box flex={1} paddingY={responsiveWidth(4)}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigate("ShowParticularResource")}
              >
                <Box flex={1} flexDirection="column" paddingX={responsiveWidth(2)}>
                  <Box
                    flex={1}
                    flexDirection="column"
                    bg="white"
                    borderRadius={responsiveWidth(3)}
                    borderColor={selectedColorData.borderColor}
                    borderWidth={responsiveWidth(0.2)}
                    borderBottomWidth={responsiveWidth(1.2)}
                    shadow={5}
                  >
                    <Box flex={1} flexDirection="row">
                      <Box
                        position="absolute"
                        top={-30}
                        left={2}
                        alignSelf={"flex-start"}
                        height={responsiveHeight(6)}
                        width={"13%"}
                        borderRadius={responsiveWidth(9)}
                        zIndex={3}
                      ></Box>
                    </Box>
                    <Box
                      flex={1}
                      padding={responsiveWidth(5)}
                      paddingTop={responsiveWidth(8)}
                      borderRadius={responsiveWidth(3)}
                      bg={selectedColorData.bg}
                    >
                      <Text
                        fontSize={responsiveFontSize(2.1)}
                        color="#7D8592"
                     
                        bold
                      >
                        {selectedScuchanaItem?.title}
                      </Text>
                    </Box>
                    <Box flex={1} padding={responsiveWidth(5)}>
                      <Text
                        fontSize={responsiveFontSize(2)}
                        color="#7D8592"
                        textAlign={"justify"}
                      
                      >
                        {selectedScuchanaItem?.desc}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </TouchableOpacity>
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
