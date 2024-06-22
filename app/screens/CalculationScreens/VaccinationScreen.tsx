import { observer } from "mobx-react-lite"
import { Box, Center, Image, InputLeftAddon, Pressable, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity, View, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import FlatList2 from "../../components/FlatList2"
import { useHeader } from "../../utils/useHeader"
import { AppStackScreenProps, navigate } from "./../../navigators"
import { colors, spacing } from "./../../theme"
import { RefreshControl } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import VaccinationItem from "./VaccineItem"
import VaccineList from "./vaccineList"
import Vaccine1List from "./vaccine1List"
import Vaccine2List from "./vaccine2List"

interface VaccinationProps extends AppStackScreenProps<"Vaccination"> {}

export const VaccinationScreen: FC<VaccinationProps> = observer(function Vaccination({
  navigation,
}) {
  const { onRefresh, refereshing } = useMainMenuContext()

  useHeader({
    title: "लसीकरण",
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
    <ScrollView
      style={{ backgroundColor: "white" }}
      refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
    >
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text
          color={"warmGray.500"}
          justifyContent="center"
          fontSize={responsiveFontSize(2.2)}
          padding={responsiveWidth(1.2)}
          bold
        >
          गर्भवती महिलांसाठी
        </Text>
        <Box flex={1} flexDirection="row">
          <VaccineList />
        </Box>
        <Text
          color={"warmGray.500"}
          justifyContent="center"
          fontSize={responsiveFontSize(2.2)}
          padding={responsiveWidth(1.2)}
          bold
        >
          अर्भकासाठी
        </Text>
        <Box flex={1} flexDirection="row">
          <Vaccine1List />
        </Box>
        
        <Text
          color={"warmGray.500"}
          justifyContent="center"
          fontSize={responsiveFontSize(2.2)}
          padding={responsiveWidth(1.2)}
          bold
        >
          बालकांसाठी
        </Text>
        <Box flex={1} flexDirection="row">
          <Vaccine2List />
        </Box>
      </Box>
    </ScrollView>
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
