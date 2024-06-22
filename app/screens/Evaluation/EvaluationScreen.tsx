import { observer } from "mobx-react-lite"
import { Center } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import {
  Button,
  Card,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "./../../components"
import { useStores } from "./../../models"
import { AppStackScreenProps } from "./../../navigators"
import { colors, spacing } from "./../../theme"

interface EvaluationScreenProps extends AppStackScreenProps<"Evaluation"> {}

export const EvaluationScreen: FC<EvaluationScreenProps> = observer(function EvaluationScreen(
  _props,
) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      <Center flex={1} width="100%" flexDirection="column">
        evaluation screen
      </Center>
    </Screen>
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
