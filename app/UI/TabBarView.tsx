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

interface IProps {
  index: number
  routes: any
  renderScene: any
  setIndex: Function
  initialLayout: any
  title: string
  RenderTabBar?: any
}
export default ({
  index,
  routes,
  renderScene,
  setIndex,
  initialLayout,
  title,
  RenderTabBar,
}: IProps) => {
  return (
    <Box height="100%" flexDirection="column" bg={"white"}>
      <Box flex={1}>
        <Text
          textAlign="center"
          fontSize={responsiveFontSize(2.6)}
          fontWeight={700}
          color="#1b7fb6"
        >
          {title}
        </Text>
      </Box>
      <Box flex={11}>
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
  )
}
