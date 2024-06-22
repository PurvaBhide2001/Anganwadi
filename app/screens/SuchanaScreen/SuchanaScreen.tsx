import { observer } from "mobx-react-lite"
import { Box, Center, Image, InputLeftAddon, Pressable, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import FlatList2 from "../../components/FlatList2"
// import { useSuchanaContext } from "../../Context/SuchanaContext"
import { useHeader } from "../../utils/useHeader"
// import { TouchableOpacity } from "react-native-gesture-handler"

import {
  Button,
  Card,
  Icon,
  Screen,
  // Text,
  TextField,
  TextFieldAccessoryProps,
} from "../../components"

import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import SuchanaItem from "./SuchanaItem"
import SuchanaList from "./SuchanaList"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useSuchanaContext } from "../../Context/SuchanaContext"

interface SuchanaProps extends AppStackScreenProps<"Suchana"> {}

export const SuchanaScreen: FC<SuchanaProps> = observer(function Suchana({ navigation }) {
  // const { navigation } = _props

  const { onRefreshSuchana, refereshSuchna } = useSuchanaContext()
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          style={{}}
          refreshControl={
            <RefreshControl refreshing={refereshSuchna} onRefresh={() => onRefreshSuchana()} />
          }
        >
          <Box flex={1} flexDirection="column" bgColor={"red"}>
            <SuchanaList />
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
