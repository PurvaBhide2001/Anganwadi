import { observer } from "mobx-react-lite"
import { Box, Center, InputLeftAddon, Pressable, Text } from "native-base"
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
} from "./../../components"
import { useStores } from "./../../models"
import { AppStackScreenProps, navigate } from "./../../navigators"
import { colors, spacing } from "./../../theme"
import GovermentPlansList from "./GovermentPlansList"
import { useLoginContext } from "../../Context/LoginContext"

interface MorePlansScreenProps extends AppStackScreenProps<"MorePlans"> {}

export const MorePlansScreen: FC<MorePlansScreenProps> = observer(function MorePlansScreen({
  navigation,
}) {
  useHeader({
    title: " अंगणवाडी योजना",
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
  const { onRefresh, refereshing } = useLoginContext()

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1} flexDirection="column" bgColor={"white"}>
            <Box flex={2} flexDirection="column">
              <Box flex={1} flexDirection="column">
                {/* <Box flex={1} bg="#f1f1f1" height={responsiveHeight(2)}></Box> */}
              </Box>
              <Text
                padding={responsiveWidth(2)}
                fontSize={responsiveFontSize(2.1)}
                color="#7D8592"
                bold
              >
                महत्वाच्या योजना
              </Text>
              <Box flex={1}></Box>
              <Box flex={11}>
                <Box flex={10}>
                  <GovermentPlansList />
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  )
})
