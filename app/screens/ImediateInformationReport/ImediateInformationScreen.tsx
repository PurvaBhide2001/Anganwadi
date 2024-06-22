import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, StatusBar } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { TabView } from "react-native-tab-view"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import RenderTabBar from "../../components/RenderTabBar"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useImediateInformationContext } from "../../Context/ImediateInformationContext"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"

interface ImediateInformationProps extends AppStackScreenProps<"ImediateInformation"> {}

export const ImediateInformationScreen: FC<ImediateInformationProps> = observer(
  function ImediateInformation(_props) {
    const { index, routes, renderScene, setIndex, initialLayout } = useImediateInformationContext()
    return (
      <>
        <Box flex={1} flexDirection="column" bg={"white"}>
          <Box>
            <Text
              textAlign="center"
              fontSize={responsiveFontSize(2.6)}
              fontWeight={700}
              color="#1b7fb6"
            >
              तत्काळ माहिती अहवाल
            </Text>
          </Box>
          <Box flex={1}>
            <TabView
              navigationState={{
                index,
                routes,
              }}
              renderScene={renderScene}
              renderTabBar={RenderTabBar}
              onIndexChange={(i: number) => setIndex(i)}
              initialLayout={initialLayout}
              style={{
                marginTop: StatusBar.currentHeight,
              }}
            />
          </Box>
        </Box>
      </>
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
