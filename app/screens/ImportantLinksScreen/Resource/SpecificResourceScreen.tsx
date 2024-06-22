import { observer } from "mobx-react-lite"
import { Box, Image, Link, ScrollView, Text } from "native-base"
import React, { FC } from "react"
import { RefreshControl, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import { useHeader } from "../../../utils/useHeader"
import { AppStackScreenProps, navigate } from "../../../navigators"
import { useMainMenuContext } from "../../../Context/MainMenuContext"
import { colors, spacing } from "../../../theme"
import { useSansadhaneContext } from "../../../Context/SansadhaneContext"

interface SpecificResourceProps extends AppStackScreenProps<"SpecificResource"> {}
interface IProp {
  item: any
}
export const SpecificResourceScreen: FC<SpecificResourceProps> = observer(function SpecificResource(
  { navigation },
  { item }: any,
) {
  //   const { navigation } = _props
  const { particularSansadhan } = useSansadhaneContext()
  useHeader({
    title: "संसाधने ",
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

  const { refereshing, onRefresh } = useMainMenuContext()
  return (
    <>
      <LinearGradient
        colors={["#FFF1EB", "#ACE0F9"]}
        style={{
          width: "100%",
          height: responsiveHeight(30),
          padding: responsiveWidth(1),
          flex: 1,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            style={{}}
            refreshControl={
              <RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />
            }
          >
            <Box flex={1} flexDirection="column">
              <Box width="100%" padding={responsiveWidth(1.8)}>
                <Box flex={1}>
                  <Box
                    flex={1}
                    flexDirection="row"
                    borderRadius={responsiveWidth(3)}
                    bg="white"
                    shadow={4}
                  >
                    <Box flex={1} flexDirection={"column"}>
                      <Box flex={0.5}></Box>
                      <Box flex={1} flexDirection="row">
                        <Box flex={10} padding={responsiveWidth(2)}>
                          <Text
                            fontSize={responsiveFontSize(2.2)}
                            textAlign="center"
                            color="#7D8592"
                            fontWeight={600}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                          >
                            {particularSansadhan?.title}
                          </Text>
                        </Box>
                      </Box>

                      <Box
                        flex={1}
                        bg="warmGray.100"
                        flexDirection="row"
                        borderBottomRadius={responsiveWidth(3)}
                      >
                        <Box
                          flex={4}
                          alignItems="center"
                          padding={responsiveWidth(3)}
                          justifyContent="center"
                        >
                          <Text
                            color="#7D8592"
                            fontSize={responsiveFontSize(2)}
                            textAlign={"justify"}
                            fontWeight={500}
                          >
                            {particularSansadhan?.description}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  )
})

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
