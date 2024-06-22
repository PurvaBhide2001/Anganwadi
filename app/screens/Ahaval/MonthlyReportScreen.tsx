import { observer } from "mobx-react-lite"
import { Box, Center, Image, InputLeftAddon, Pressable, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity, View, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import FlatList2 from "../../components/FlatList2"
// import { useMonthlyReportContext } from "../../Context/MonthlyReportContext"
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
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import MonthlyReportList from "./MonthlyReportList"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { RefreshControl } from "react-native-gesture-handler"

interface MonthlyReportProps extends AppStackScreenProps<"MonthlyReport"> {}

export const MonthlyReportScreen: FC<MonthlyReportProps> = observer(function MonthlyReport({
  navigation,
}) {
  // const { navigation } = _props
  const { onRefresh, refereshing } = useMainMenuContext()

  useHeader({
    title: "मासिक अहवाल",
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
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1} width="100%">
            <MonthlyReportList />
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
