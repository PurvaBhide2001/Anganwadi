import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { responsiveFontSize } from "react-native-responsive-dimensions"
import { useHeader } from "../../utils/useHeader"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import NipunBharatList from "./NipunBharatList"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box } from "native-base"

interface NipunBharatProps extends AppStackScreenProps<"NipunBharat"> {}

export const NipunBharatScreen: FC<NipunBharatProps> = observer(function NipunBharat({
  navigation,
}) {
  // const { navigation } = _props

  useHeader({
    title: "निपुण भारत",
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
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} bg="white">
          <NipunBharatList />
        </Box>
      </SafeAreaView>
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
