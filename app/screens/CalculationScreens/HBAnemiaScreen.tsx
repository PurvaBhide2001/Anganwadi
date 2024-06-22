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
// import { useHBAnemiaContext } from "../../Context/HBAnemiaContext"
import { useHeader } from "../../utils/useHeader"
// import { TouchableOpacity } from "react-native-gesture-handler"

import { AppStackScreenProps, navigate } from "./../../navigators"
import { colors, spacing } from "./../../theme"

interface HBAnemiaProps extends AppStackScreenProps<"HBAnemia"> {}

export const HBAnemiaScreen: FC<HBAnemiaProps> = observer(function HBAnemia({ navigation }) {
  // const { navigation } = _props

  useHeader({
    title: "एचबी ऍनेमिया",
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

  //   const { menuSMList, menuMDList } = useHBAnemiaContext()
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
        <SafeAreaView style={{ flex: 1 }}>
          <Box flex={1}>
            <Image
              bg={"red.300"}
              source={require("../../../assets/gif/Comp1.gif")}
              alt="Image"
              height={"100%"}
              width="100%"
              resizeMode="cover"
            />
          </Box>
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
