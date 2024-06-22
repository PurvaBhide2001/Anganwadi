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
} from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
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
interface StudentScreenProps extends AppStackScreenProps<"Student"> {}

export const StudentScreen: FC<StudentScreenProps> = observer(function StudentScreen(_props) {
  const { selectedStudent, control, handleSubmit, ageGroup, onSubmit, ageCategoery } =
    useStudentContextContext()
  console.log("this is student screen")

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
      <Box flex={1} flexDirection="column">
        <Box flex={5} flexDirection="row">
          <Box flex={9}>4-5 vayogat</Box>
        </Box>
        <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
          <Box flex={4} alignItems="center" justifyContent={"center"}>
            <Text fontSize={responsiveFontSize(2.0)} fontWeight={700} color="warmGray.600">
              वयोगट
            </Text>
          </Box>
          <Box
            flex={9}
            alignItems="center"
            justifyContent={"center"}
            bg="white"
            borderRadius={responsiveWidth(3)}
          >
            {ageCategoery}
          </Box>
        </Box>
        <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
          <Box flex={4} alignItems="center" justifyContent={"center"}>
            <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
              मूल्यमापन दिनांक
            </Text>
          </Box>
          <Box
            flex={8}
            flexDirection="row"
            justifyContent={"center"}
            bg="white"
            borderRadius={responsiveWidth(3)}
          >
            <Box flex={8} alignItems="center" justifyContent={"center"}>
              <Text fontSize={responsiveFontSize(2.5)} width={responsiveWidth(40)}>
                {dateFormat(selectedDate)}
              </Text>
            </Box>
            <Box flex={4} justifyContent={"center"}>
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
                  onChange={onChange}
                  positiveButton={{ label: "OK", textColor: "green" }}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
          <Box flex={4}></Box>
          <Box flex={8} alignItems="center" justifyContent={"center"}>
            <Text textAlign="center" fontSize={responsiveFontSize(2)}>
              {height} सेमी
            </Text>
          </Box>
        </Box>
        <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
          <Box flex={4} alignItems="center" justifyContent={"center"}>
            <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
              उंची(सेमी)
            </Text>
          </Box>
          <Box
            flex={8}
            alignItems="center"
            justifyContent={"center"}
            // bg="white"
            padding={responsiveWidth(2.5)}
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
          <Box flex={4}></Box>
          <Box flex={8} alignItems="center" justifyContent={"center"}>
            <Text textAlign="center" fontSize={responsiveFontSize(2)}>
              {weight} किलो
            </Text>
          </Box>
        </Box>
        <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
          <Box flex={4} alignItems="center" justifyContent={"center"}>
            <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
              वजन(किलो)
            </Text>
          </Box>
          <Box
            flex={8}
            alignItems="center"
            justifyContent={"center"}
            // bg="white"
            borderRadius={responsiveWidth(3)}
            padding={responsiveWidth(2.5)}
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
          </Box>
        </Box>
        <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
          <Box flex={4} alignItems="center" justifyContent={"center"}>
            <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
              बी.एम.आय
            </Text>
          </Box>
          <Box
            flex={8}
            alignItems="center"
            justifyContent={"center"}
            // bg="white"
            borderRadius={responsiveWidth(3)}
          >
            {bmi(height, weight) || 0.0}
          </Box>
        </Box>
        <Box flex={2} flexDirection="row" alignItems="center">
          <Box flex={5}></Box>
          <Box flex={2}>
            <TouchableOpacity
              style={{
                height: responsiveHeight(8),
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
                justifyContent: "center",
                width: responsiveWidth(12),
                borderRadius: responsiveWidth(17),
              }}
              onPress={() => navigate("Question")}
            >
              <Feather name="arrow-right" size={responsiveWidth(8)} />
            </TouchableOpacity>
          </Box>
          <Box flex={5}></Box>
        </Box>
      </Box>
    </LinearGradient>
  )
})
