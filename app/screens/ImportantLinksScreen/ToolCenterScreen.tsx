import { observer } from "mobx-react-lite"
import { Box, Image, ScrollView } from "native-base"
import React, { FC } from "react"
import { RefreshControl, TextStyle, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import { useHeader } from "../../utils/useHeader"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import ResourceItem from "./Resource/ResourceItem"
import { Screen } from "../../components"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import ResourceList from "./Resource/ResourceList"
import { useSansadhaneContext } from "../../Context/SansadhaneContext"

interface ToolCenterProps extends AppStackScreenProps<"ToolCenter"> {}

export const ToolCenterScreen: FC<ToolCenterProps> = observer(function ToolCenter({ navigation }) {
  //   const { navigation } = _props

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
  const { onRefreshSansadhan, refreshSansadhan } = useSansadhaneContext()

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
              <RefreshControl
                refreshing={refreshSansadhan}
                onRefresh={() => onRefreshSansadhan()}
              />
            }
          >
            <Box flex={1} flexDirection="column">
              <ResourceList />
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
