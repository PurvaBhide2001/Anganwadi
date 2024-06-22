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
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"

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
import MenuItem from "./MenuItem"
import MenuList from "./MenuList"

interface PurvPrathmikScreenProps extends AppStackScreenProps<"PurvPrathmik"> {}

export const PurvPrathmikScreen: FC<PurvPrathmikScreenProps> = observer(
  function PurvPrathmikScreen({ navigation }) {
    const {
      purvPrathmikData,
      purvPrathmikDataAnother,
      typesOfPurvPrathmik,
      nipunBharatList,
      studentList,
    } = usePurvPrathmikContextContext()
    const { onRefresh, refereshing } = useMainMenuContext()

    useHeader({
      title: "पूर्व प्राथमिक शिक्षण",
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
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Box flex={1} bg="white" flexDirection="column" padding={responsiveWidth(2)}>
              <Box flex={1} flexDirection="row">
                <Box flex={1}>
                  <Image
                    source={typesOfPurvPrathmik.student.icon}
                    resizeMode="contain"
                    alt="Image"
                    height="100%"
                  />
                </Box>

                <Box flex={5} paddingY={responsiveWidth(2)}>
                  <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                    {typesOfPurvPrathmik.student.title}
                  </Text>
                </Box>
              </Box>
              <Box flex={4}>
                <MenuList arrayMenuList={studentList} />
              </Box>
              <Box flex={1} flexDirection="row">
                <Box flex={1}>
                  <Image
                    source={typesOfPurvPrathmik.pbsmsp.icon}
                    resizeMode="contain"
                    alt="Image"
                    height="100%"
                  />
                </Box>
                {/* <Box flex={0.1}></Box> */}

                <Box flex={5} paddingY={responsiveWidth(2)}>
                  <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                    {typesOfPurvPrathmik.pbsmsp.title}
                  </Text>
                </Box>
              </Box>

              <Box flex={4}>
                <MenuList arrayMenuList={purvPrathmikData} />
              </Box>

              <Box flex={1} flexDirection="row">
                <Box flex={1}>
                  <Image
                    source={typesOfPurvPrathmik.pbsmsp.icon}
                    resizeMode="contain"
                    alt="Image"
                    height="100%"
                  />
                </Box>
                {/* <Box flex={0.2}></Box> */}

                <Box flex={5} paddingY={responsiveWidth(2)}>
                  <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                    {typesOfPurvPrathmik.nipunBharat.title}
                  </Text>
                </Box>
              </Box>
              {/* {typesOfPurvPrathmik.nipunBharat.title} */}
              <Box flex={4}>
                <MenuList arrayMenuList={nipunBharatList} />
              </Box>
              <Box flex={1} flexDirection="row">
                <Box flex={1}>
                  <Image
                    source={typesOfPurvPrathmik.pbsmsp.icon}
                    resizeMode="contain"
                    alt="Image"
                    height="100%"
                  />
                </Box>
                {/* <Box flex={0.2}></Box> */}

                <Box flex={5} paddingY={responsiveWidth(2)}>
                  <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                    {purvPrathmikDataAnother[0].title}
                  </Text>
                </Box>
              </Box>
              {/*  {purvPrathmikDataAnother[0].title} */}
              <Box flex={4} paddingX={responsiveWidth(2)}>
                <MenuItem
                  title={purvPrathmikDataAnother[0].title}
                  icon={purvPrathmikDataAnother[0].icon}
                  bgcolor={purvPrathmikDataAnother[0].bgcolor}
                  bottomBorderColor={purvPrathmikDataAnother[0].bottomBorderColor}
                  textColor={purvPrathmikDataAnother[0].textColor}
                  event={purvPrathmikDataAnother[0].event}
                  itemList={[]}
                />
              </Box>
              <Box flex={1} flexDirection="row">
                <Box flex={1}>
                  <Image
                    source={typesOfPurvPrathmik.pbsmsp.icon}
                    resizeMode="contain"
                    alt="Image"
                    height="100%"
                  />
                </Box>
                {/* <Box flex={0.2}></Box> */}

                <Box flex={5} paddingY={responsiveWidth(2)}>
                  <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                    {purvPrathmikDataAnother[1].title}
                  </Text>
                </Box>
              </Box>

              {/*   {purvPrathmikDataAnother[1].title} */}
              <Box flex={5} paddingX={responsiveWidth(2)}>
                <MenuItem
                  title={purvPrathmikDataAnother[1].title}
                  icon={purvPrathmikDataAnother[1].icon}
                  bgcolor={purvPrathmikDataAnother[1].bgcolor}
                  bottomBorderColor={purvPrathmikDataAnother[1].bottomBorderColor}
                  textColor={purvPrathmikDataAnother[1].textColor}
                  event={purvPrathmikDataAnother[1].event}
                  itemList={[]}
                />
              </Box>
            </Box>
          </SafeAreaView>
        </ScrollView>
      </>
    )
  },
)

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
