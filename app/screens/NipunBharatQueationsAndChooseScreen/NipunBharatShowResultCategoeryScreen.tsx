import { observer } from "mobx-react-lite"
import { Box, Center, Image, InputLeftAddon, Pressable, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity, View, ScrollView } from "react-native"
import { RefreshControl } from "react-native-gesture-handler"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import FlatList2 from "../../components/FlatList2"
import { useMainMenuContext } from "../../Context/MainMenuContext"

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
import MenuList from "./MenuList"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import { useNipunBharatQuestionContext } from "../../Context/NipunBharatQuestionContext"
import { useNipunBharatStudentContextContext } from "../../Context/NipunBharatStudentContext"

interface NipunBharatShowResultCategoeryScreenProps
  extends AppStackScreenProps<"NipunBharatShowResultCategoery"> {}

export const NipunBharatShowResultCategoeryScreen: FC<NipunBharatShowResultCategoeryScreenProps> =
  observer(function NipunBharatShowResultCategoeryScreen({ navigation }) {
    const { onRefresh, refereshing } = useMainMenuContext()
    const { purvPrathmikData, purvPrathmikDataAnother, typesOfPurvPrathmik, nipunBharatList } =
      usePurvPrathmikContextContext()
    const { examCategoeries, examCategoery, onSumitShowExamResult } =
      useNipunBharatStudentContextContext()
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
        <ScrollView
          style={{ backgroundColor: "white" }}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Box flex={1} bg="white" flexDirection="column" padding={responsiveWidth(2)}>
              <Box flex={4}>
                <MenuList
                  examCategoery={examCategoery}
                  onClickQuestionCategoery={onSumitShowExamResult}
                />
              </Box>
            </Box>
          </SafeAreaView>
        </ScrollView>
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
