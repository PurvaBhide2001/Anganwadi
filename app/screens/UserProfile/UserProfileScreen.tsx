import { observer } from "mobx-react-lite"
import { Center } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import {
  Button,
  Card,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"

interface UserProfileScreenProps extends AppStackScreenProps<"UserProfile"> {}

export const UserProfileScreen: FC<UserProfileScreenProps> = observer(function UserProfileScreen(
  _props,
) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      <Center flex={1}>This is user profile page</Center>
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
