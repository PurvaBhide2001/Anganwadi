import { observer } from "mobx-react-lite"
import { Box, Center, Pressable, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
// import { TouchableOpacity } from "react-native-gesture-handler"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import {
  Button,
  Card,
  Icon,
  Screen,
  // Text,
  TextField,
  TextFieldAccessoryProps,
} from "./../../components"
import { useStores } from "./../../models"
import { AppStackScreenProps } from "./../../navigators"
import { colors, spacing } from "./../../theme"
import MenuList from "./MenuList"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const {
    updateProfile,
    chooseStudent,
    evaluationDoIt,
    evaluationWatch,
    immediatelyInformation,
    anganwadiFacility,
    weeklyProgress,
    monthlyProgress,
  } = useHomeScreenContext()
  const { navigation } = _props

  return (
    <>
      <LinearGradient
        colors={["#D7DAF2", "#F5D6E5"]}
        style={{
          width: "100%",
          height: "100%",
          padding: responsiveWidth(1),
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <MenuList />
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
