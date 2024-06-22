import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import { Box, Text } from "native-base"

import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { spacing } from "../theme"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

const welcomeLogo = require("../../assets/images/welcome1.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props
  const windowWidth = Dimensions.get("window").width
  const windowHeight = Dimensions.get("window").height

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("LoginPage")
    }, 30000)

    return () => {
      clearTimeout(timeout)
    }
  }, [navigation])

  return (
    <Box flex={1} safeArea w="100%" height="50%" bg="red">
      <ImageBackground source={welcomeLogo} style={$bgImage}>
        <Box flex={1} flexDirection="column">
          <Box flex={11}></Box>
          <Box flex={1} alignItems={"center"} justifyContent={"flex-end"}>
            <TouchableOpacity
              style={{
                backgroundColor: "#dc3541",
                borderRadius: responsiveWidth(2),
                width: "50%",
                bottom: 25,
              }}
              onPress={() => {
                navigation.navigate("LoginPage")
              }}
            >
              <Text
                textAlign="center"
                color={"white"}
                justifyContent="center"
                fontWeight={600}
                fontSize={responsiveFontSize(2.5)}
                padding={responsiveHeight(1)}
              >
                पुढे जा
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  )
})

const $welcomeLogo: ImageStyle = {
  height: "80%",
  width: "100%",
  marginBottom: spacing.huge,
}

const $bgImage: ImageStyle = {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center",
}

const $buttonContainer: ImageStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: "#dc3541",
  height: 50,
  width: 200,
  borderRadius: responsiveWidth(2),
}

const $remaningTime: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
}
