import { observer } from "mobx-react-lite"
import { Avatar, Box, Slider, Text } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { useStudentContextContext } from "../../Context/StudentContext"
import LinearGradient from "react-native-linear-gradient"
import { styleData } from "./../../../assets/constant/styleData"
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
import { useHeader } from "../../utils/useHeader"
interface StudentFormScreenProps extends AppStackScreenProps<"StudentForm"> {}

export const StudentFormScreen: FC<StudentFormScreenProps> = observer(function StudentFormScreen({
  navigation,
}) {
  const {
    selectedStudent,
    control,
    handleSubmit,
    ageGroup,
    onSubmit,
    ageCategoery,
    setBmiValue,
    ageString,
  } = useStudentContextContext()

  const {
    onChange,
    show,
    selectedDate,
    showDatepicker,
    mode,
    weight,
    setWeight,
    height,
    setHeight,
  } = useCommanContextContext()

  console.log("this is student form screen")

  useHeader({
    title: "विद्यार्थी प्रोफाइल",
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
      <LinearGradient
        colors={["#FFC7E8", "#98AFFF"]}
        style={{
          width: "100%",
          height: responsiveHeight(30),
          padding: responsiveWidth(1),
          flex: 1,
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <Box flex={1} flexDirection="column" padding={responsiveWidth(2)}>
          <Box flex={3} flexDirection="row">
            <Box flex={4}>
              <Avatar
                alignSelf={"center"}
                height={"90%"}
                width={"80%"}
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              ></Avatar>
            </Box>

            <Box flex={8} justifyContent="center" alignItems={"flex-end"}>
              <Text fontSize={responsiveFontSize(3.3)} color="white" bold>
                {selectedStudent?.f_name} {selectedStudent?.l_name}
              </Text>
              <Text
                fontSize={responsiveFontSize(styleData.fontTitleData.fontSize)}
                fontWeight={styleData.fontTitleData.fontWeight}
                color={styleData.fontTitleData.fontColor}
              >
                {ageString}
              </Text>
            </Box>
          </Box>
          <Box flex={1} flexDirection="column"></Box>
          <Box flex={11} borderRadius={responsiveWidth(3)} bg="white" padding={responsiveWidth(3)}>
            <Box flex={1} flexDirection="column">
              <Box flex={6} alignItems="flex-start" justifyContent={"center"}>
                <Text
                  textAlign={"center"}
                  fontSize={responsiveFontSize(styleData.fontTitleData.fontSize)}
                  fontWeight={styleData.fontTitleData.fontWeight}
                  color={styleData.fontTitleData.fontColor}
                >
                  मूल्यमापन दिनांक :
                </Text>
              </Box>

              <Box
                flex={6}
                flexDirection="row"
                justifyContent={"center"}
                // bg="white"
              >
                <Box flex={11} alignItems="flex-start" justifyContent={"center"}>
                  <Text fontSize={responsiveFontSize(2.5)} color="grey">
                    {dateFormat(selectedDate)}
                  </Text>
                </Box>
                <Box flex={1} alignItems="center" justifyContent={"center"}>
                  <TouchableOpacity
                    style={{
                      width: responsiveWidth(6),
                    }}
                    onPress={() => {
                      showDatepicker()
                    }}
                  >
                    <MaterialCommunityIcons
                      name="calendar-month"
                      size={responsiveWidth(6)}
                      color="gray"
                    />
                  </TouchableOpacity>

                  {show && (
                    <RNDateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      value={selectedDate}
                      mode={mode}
                      // is24Hour={true}
                      display="default"
                      // onChange={onChange}
                      positiveButton={{ label: "OK", textColor: "green" }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
              <Box flex={6} alignItems="flex-start" justifyContent={"center"}>
                <Text
                  fontSize={responsiveFontSize(styleData.fontTitleData.fontSize)}
                  fontWeight={styleData.fontTitleData.fontWeight}
                  color={styleData.fontTitleData.fontColor}
                >
                  उंची (सेमी) :
                </Text>
              </Box>
              <Box flex={6} alignItems="flex-end" justifyContent={"center"}>
                <Text fontSize={responsiveFontSize(2.5)} color="grey">
                  {height} सेमी
                </Text>
              </Box>
            </Box>
            <Box flex={1}>
              <Box
                flex={6}
                alignItems="center"
                justifyContent={"center"}
                padding={responsiveWidth(2.1)}
                borderRadius={responsiveWidth(3)}
              >
                <Slider
                  defaultValue={height}
                  minValue={0}
                  maxValue={190}
                  step={0.1}
                  colorScheme="indigo"
                  onChange={(v) => {
                    v && setHeight(Math.floor(v))
                  }}
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
              <Box flex={3} alignItems="flex-start" justifyContent={"center"}>
                <Text
                  fontSize={responsiveFontSize(styleData.fontTitleData.fontSize)}
                  fontWeight={styleData.fontTitleData.fontWeight}
                  color={styleData.fontTitleData.fontColor}
                >
                  वजन (किलो) :
                </Text>
              </Box>
              <Box flex={3} alignItems="flex-end" justifyContent={"center"}>
                <Text textAlign="center" fontSize={responsiveFontSize(2.4)} color="grey">
                  {weight} किलो
                </Text>
              </Box>
            </Box>
            <Box flex={1}>
              <Box
                flex={6}
                alignItems="center"
                justifyContent={"center"}
                borderRadius={responsiveWidth(3)}
                padding={responsiveWidth(2.1)}
              >
                <Slider
                  defaultValue={weight}
                  minValue={0}
                  maxValue={150}
                  step={0.1}
                  colorScheme="indigo"
                  onChange={(v) => {
                    setWeight(Math.floor(v))
                  }}
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
                <Box flex={6} alignItems="center" justifyContent={"center"}></Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="column" padding={responsiveWidth(1)}>
              <Box flex={6} alignItems="flex-start" justifyContent={"center"}>
                <Text
                  fontSize={responsiveFontSize(styleData.fontTitleData.fontSize)}
                  fontWeight={styleData.fontTitleData.fontWeight}
                  color={styleData.fontTitleData.fontColor}
                >
                  बी.एम.आय :
                </Text>
              </Box>

              <Box flex={6} alignItems="flex-start">
                <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                  {bmi(height, weight) || 0.0}
                </Text>
              </Box>
            </Box>
            <Box flex={2} flexDirection="column" alignItems="center">
              <Box flex={2}></Box>
              <TouchableOpacity
                style={{
                  backgroundColor: "#efe3fa",
                  height: "45%",
                  width: "40%",
                  justifyContent: "center",
                  borderRadius: responsiveWidth(2),
                  borderColor: "#f6f8fa",
                  borderWidth: responsiveWidth(0.5),
                }}
                onPress={() => {
                  setBmiValue(bmi(height, weight))
                  onSubmit()
                }}
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
              {/* </Box> */}
              <Box flex={3}></Box>
            </Box>
          </Box>
        </Box>
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
