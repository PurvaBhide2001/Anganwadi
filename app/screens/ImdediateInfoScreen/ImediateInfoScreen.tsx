import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useImdediateInfoContext } from "../../Context/ImdediateInfoContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"
import { useHeader } from "../../utils/useHeader"

import ImdediateInfoList from "./ImdediateInfoList"
import ImediateInfoModalComponent from "./ImediateInfoModalComponent"

interface ImediateInfoScreenProps extends AppStackScreenProps<"Imediate"> {}

export const ImediateInfoScreen: FC<ImediateInfoScreenProps> = observer(
  function ImediateInfoScreen({ navigation }) {
    useHeader({
      title: "तातडीचा अहवाल",
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
    const { onRefresh, refereshing } = useMainMenuContext()

    return (
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
        <ScrollView
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <ImdediateInfoList />
        </ScrollView>
      </LinearGradient>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.micro,
  // paddingHorizontal: spacing.tiny,
  margin: 0,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
  textAlign: "center",
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
