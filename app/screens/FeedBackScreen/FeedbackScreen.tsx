import { observer } from "mobx-react-lite"
import {
  ArrowForwardIcon,
  Box,
  Center,
  CheckIcon,
  IconButton,
  Image,
  Select,
  Slider,
  Stack,
  Text,
  Avatar,
} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { Drawer } from "../../components/Drawer"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useStudentContextContext } from "../../Context/StudentContext"
import InputField from "../../UI/InputField"
// import SelectDropdown from "../../UI/SelectDropdown"
import LinearGradient from "react-native-linear-gradient"

import { Button, Card, Screen, TextField, TextFieldAccessoryProps } from "./../../components"
import { useStores } from "./../../models"
import { AppStackScreenProps, navigate } from "./../../navigators"
import { colors, spacing } from "./../../theme"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import RNDateTimePicker from "@react-native-community/datetimepicker"
import { dateFormat } from "../../filter/dateAndTimeFormat"
import { useCommanContextContext } from "../../Context/CommanContext"
import { bmi } from "../../filter/calculateFormule"

import { useLoginContext } from "../../Context/LoginContext"
import InputField2 from "../../UI/InputField2"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"
import { useHeader } from "../../utils/useHeader"

interface FeedbackScreenProps extends AppStackScreenProps<"FeedBack"> {}

export const FeedbackScreen: FC<FeedbackScreenProps> = observer(function FeedbackScreen({
  navigation,
}) {
  const { selectedStudent, ageGroup, onSubmit, ageCategoery } = useStudentContextContext()
  const { control, handleSubmit, onSubmitFeedBack } = useFeedbackContextContext()
  useHeader({
    title: "एकंदर अभिप्राय",
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
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: "#white", width: "100%", height: "100%" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <Box flex={1} flexDirection="column" alignItems={"center"} width="100%">
          <Box flex={1}>
            {/* <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
              <Text
                textAlign="center"
                color={"black"}
                justifyContent="center"
                fontSize={responsiveFontSize(3.3)}
                fontWeight={responsiveWidth(3)}
              >
                एकंदर अभिप्राय
              </Text>
            </Box> */}
          </Box>
          <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
            <Box flex={3}>
              <Text fontSize={responsiveFontSize(2.5)}>पालक अभिप्राय :</Text>
            </Box>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box
              flex={8}
              bgColor={"white"}
              borderRadius={responsiveWidth(3)}
              margin={responsiveWidth(1)}
            >
              <InputField2
                control={control}
                name={"parent_opinion"}
                placeholder={"पालक अभिप्राय"}
                keyPadType={undefined}
                Icon={Feather}
                iconName="edit-3"
                iconSize={responsiveWidth(7)}
                style={{
                  borderWidth: responsiveWidth(0.4),
                  borderRightWidth: 0,
                  // borderRightColor: "white",
                  borderColor: "grey",
                  borderLeftRadius: responsiveWidth(2),
                  fontSize: responsiveFontSize(2.2),
                }}
              />
            </Box>
          </Box>
          <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
            <Box flex={3}>
              <Text fontSize={responsiveFontSize(2.5)}>सेविका अभिप्राय :</Text>
            </Box>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box
              flex={8}
              bgColor={"white"}
              borderRadius={responsiveWidth(3)}
              margin={responsiveWidth(1)}
            >
              <InputField2
                control={control}
                name={"teacher_opinion"}
                placeholder={"सेविका अभिप्राय"}
                keyPadType={undefined}
                Icon={Feather}
                iconName="edit-3"
                iconSize={responsiveWidth(7)}
                style={{
                  borderWidth: responsiveWidth(0.4),
                  borderRightWidth: 0,
                  borderColor: "grey",
                  borderLeftRadius: responsiveWidth(2),
                  fontSize: responsiveFontSize(2.2),
                }}
              />
            </Box>
          </Box>

          <Box flex={6} width="100%" height={responsiveHeight(30)}></Box>
          <Box flex={1} width="100%" alignItems={"center"}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
                justifyContent: "center",
                width: responsiveWidth(18),
                height: responsiveHeight(6),

                borderRadius: responsiveWidth(2),
              }}
              onPress={handleSubmit(onSubmitFeedBack)}
            >
              <Text
                textAlign="center"
                color={"warmGray.500"}
                justifyContent="center"
                fontWeight={600}
                fontSize={responsiveFontSize(2.5)}
                // padding={responsiveHeight(1)}
              >
                पुढे जा
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </LinearGradient>
  )
})
