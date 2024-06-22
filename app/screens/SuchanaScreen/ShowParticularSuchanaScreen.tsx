import { observer } from "mobx-react-lite"
import { Avatar, Box, Image, Link, Text } from "native-base"
import React, { FC } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
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
import { useSuchanaContext } from "../../Context/SuchanaContext"
import { randIntWithZero } from "../../filter/requireFunction"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"
interface ShowParticularSuchanaScreenProps extends AppStackScreenProps<"ShowParticularSuchana"> {}

export const ShowParticularSuchanaScreen: FC<ShowParticularSuchanaScreenProps> = observer(
  function ShowParticularSuchanaScreen({ navigation }) {
    const { colorData, suchanaData, selectedScuchanaItem, selectedColorData } = useSuchanaContext()
    const giveColorData = colorData[randIntWithZero(colorData.length)]
    const { refereshing, onRefresh } = useMainMenuContext()

    useHeader({
      title: "सूचना फलक",
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
        <ScrollView
          style={{ backgroundColor: "white" }}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box width="100%" padding={responsiveWidth(2)}>
            <Box flex={1} paddingY={responsiveWidth(4)}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigate("ShowParticularSuchana")}
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
                    <Box flex={1} flexDirection="row"></Box>
                    <Box flex={1} flexDirection="row">
                      <Box
                        flex={9}
                        flexDirection="row"
                        padding={responsiveWidth(3)}
                        paddingTop={responsiveWidth(8)}
                        bg={selectedColorData.bg}
                        borderTopRadius={responsiveWidth(3)}
                      >
                        <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                          {selectedScuchanaItem?.title}
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      flex={1}
                      flexDirection="row"
                      bg={selectedColorData.bg}
                      borderTopRightRadius={responsiveWidth(3)}
                    >
                      <Box flex={9} borderTopRightRadius={responsiveWidth(3)}></Box>
                      <Box
                        flex={2.5}
                        flexDirection="row"
                        bg={selectedColorData.bg}
                        alignItems="flex-end"
                      >
                        <Link href={selectedScuchanaItem?.file}>
                          <Text color="blue.800" fontSize={responsiveFontSize(2)} fontWeight={500}>
                            फाइल पहा
                          </Text>
                        </Link>
                      </Box>
                    </Box>
                    <Box flex={1} padding={responsiveWidth(5)}>
                      <Text
                        fontSize={responsiveFontSize(2)}
                        color="#7D8592"
                        textAlign={"justify"}
                        // numberOfLines={3}
                        // ellipsizeMode="tail"
                      >
                        {selectedScuchanaItem?.description}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </ScrollView>
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
