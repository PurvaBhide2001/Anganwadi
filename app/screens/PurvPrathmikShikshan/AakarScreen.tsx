import { observer } from "mobx-react-lite"
import { Box } from "native-base"
import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { responsiveFontSize } from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import { useHeader } from "../../utils/useHeader"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"

import AakarList from "./aakarList"

interface AakarProps extends AppStackScreenProps<"Aakar"> {}

export const AakarScreen: FC<AakarProps> = observer(function Aakar({ navigation }) {
  const { onRefresh, refereshing } = useMainMenuContext()

  useHeader({
    title: "आकार",
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
        <ScrollView
          style={{ backgroundColor: "white" }}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1} flexDirection="column" position="relative">
            <AakarList />
          </Box>
        </ScrollView>
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
