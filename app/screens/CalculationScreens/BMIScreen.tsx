import { observer } from "mobx-react-lite"
import { Box, Input, Text, useToast } from "native-base"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Icon from "react-native-vector-icons/FontAwesome"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  TextStyle,
  ViewStyle,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native"
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
import { useCalculationContext } from "../../Context/CalculationContext"
import { useHeader } from "../../utils/useHeader"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import BMIReportItem from "./BMIReportItem"
import { useLoginContext } from "../../Context/LoginContext"

interface BMIScreenProps extends AppStackScreenProps<"BMI"> {}

export const BMIScreen: FC<BMIScreenProps> = observer(function BMIScreen({ navigation }) {
  const { onChange, show, selectedDate, showDatepicker, mode } = useCommanContextContext()

  useHeader({
    title: "बी एम आय कॅलक्युलेटर",
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

  const { onRefresh, refereshing } = useMainMenuContext()

  const boy = require("../../../assets/surveyimages/BMIScreen/B1.png")
  const girl = require("../../../assets/surveyimages/BMIScreen/G1.png")
  const icon = require("../../../assets/surveyimages/BMIScreen/G1.png")
  const chart = require("../../../assets/surveyimages/BMIScreen/BMI.png")
  const [isBoy, setIsBoy] = useState(false)
  const [dateValue, setDateValue] = useState<any>(new Date())
  const callBackdateSet = useCallback((date: any) => {
    setDateValue(date)
  }, [])
  const images = [
    require("../../../assets/surveyimages/BMIScreen/F.png"),
    require("../../../assets/surveyimages/BMIScreen/T.png"),
    require("../../../assets/surveyimages/BMIScreen/N.png"),
  ]
  const colors = ["#b92a30", "#ec8923", "#2b8028"]
  const bgColor = ["#e62e2d", "#f4ca35", "#4da349"]
  const [bmiConclusionImage, setBmiConclusionImage] = useState<any>("")
  const [color, setColor] = useState<string>("")
  const [bg, setBg] = useState<string>("")
  const ref = useRef(girl)
  const { toastShow } = useLoginContext()
  const toast = useToast()
  const [isShowResult, setIsShowResult] = useState(false)

  const { height, setHeight, setWeight, weight } = useCalculationContext()
  const [bmi, setBmi] = useState<string>("")
  const [bmiLabel, setBmiLabel] = useState<string>("")
  const [imageUrl, setImageUrl] = useState(girl)
  const calculateBMI = () => {
    var bmiValue
    // convert height from centimeters to meters
    if (height == 0 || weight == 0 || bmiValue == 0) {
      toastShow(toast, "कृपया सर्व फील्ड प्रविष्ट करा.", "top", "#fab4b4")
      console.log("====================================")
      console.log(height, weight)
      console.log("====================================")
      return
    } else {
      var heightMeters = height / 100

      // calculate BMI using formula: weight (kg) / height^2 (m^2)
      bmiValue = weight / (heightMeters * heightMeters)

      // define conclusion based on BMI value
      var bmiConclusion

      if (bmiValue < 16) {
        bmiConclusion = "तीव्र कमी वजन"
        setBmiConclusionImage(images[1])
        setColor(colors[1])
        setBg(bgColor[1])
      } else if (bmiValue >= 16 && bmiValue < 17) {
        bmiConclusion = "मध्यम कमी वजन "
        setBmiConclusionImage(images[1])
        setColor(colors[1])
        setBg(bgColor[1])
      } else if (bmiValue >= 17 && bmiValue < 18.5) {
        bmiConclusion = "कमी वजन"
        setBmiConclusionImage(images[1])
        setColor(colors[1])
        setBg(bgColor[1])
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        bmiConclusion = "सामान्य"
        setBmiConclusionImage(images[2])
        setColor(colors[2])
        setBg(bgColor[2])
      } else if (bmiValue >= 25 && bmiValue < 30) {
        bmiConclusion = "जास्त वजन"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      } else if (bmiValue >= 30 && bmiValue < 35) {
        bmiConclusion = "मध्यम जास्त वजन"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      } else if (bmiValue >= 35 && bmiValue < 40) {
        bmiConclusion = "तीव्र जास्त वजन"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      } else {
        bmiConclusion = "लठ्ठ वर्ग"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      }

      // update state with BMI value and label

      setBmi(bmiValue.toFixed(2))
      setBmiLabel(bmiConclusion)
      console.log(bmiConclusion)
      setIsShowResult(true)
    }
  }
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }}
        refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
      >
        {!isShowResult ? (
          <Box flex={1} flexDirection="column" padding={responsiveWidth(2)}>
            <Box flex={6} flexDirection="row">
              <Box
                flex={6}
                padding={responsiveWidth(3)}
                width="50%"
                flexDirection="column"
                justifyContent={"center"}
              >
                <Image
                  source={ref.current}
                  style={{ height: "80%", width: "100%" }}
                  resizeMode="contain"
                />
              </Box>

              <Box
                flex={6}
                // padding={responsiveWidth(3)}
                width="50%"
                flexDirection="column"
              >
                <Box flex={2.5} flexDirection="column" paddingY={responsiveWidth(2.5)}>
                  <Box flex={1} flexDirection="row">
                    <Box flex={3} alignItems="flex-start">
                      <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                        लिंग
                      </Text>
                    </Box>
                  </Box>
                  <Box flex={1} flexDirection="row">
                    <Box flex={3} alignItems="flex-end" justifyContent={"flex-start"}>
                      <TouchableOpacity
                        style={{
                          flex: 3,
                          borderRadius: responsiveWidth(1),
                          backgroundColor: !isBoy ? "#a7dbfc" : "#fff",
                          padding: responsiveWidth(2.7),
                        }}
                        onPress={() => {
                          setIsBoy(false)

                          setImageUrl(girl)
                          ref.current = girl
                          console.log(" girl", ref.current)
                        }}
                      >
                        <Icon
                          as={FontAwesome}
                          name="female"
                          size={responsiveHeight(3.5)}
                          color={!isBoy ? "white" : "#7D8592"}
                        />
                      </TouchableOpacity>
                    </Box>
                    <Box flex={3} alignItems="center" justifyContent={"flex-start"}>
                      <TouchableOpacity
                        style={{
                          flex: 3,
                          borderRadius: responsiveWidth(1),
                          backgroundColor: isBoy ? "#a7dbfc" : "#fff",
                          padding: responsiveWidth(3),
                        }}
                        onPress={() => {
                          setIsBoy(true)

                          setImageUrl(boy)
                          ref.current = boy
                        }}
                      >
                        <Icon
                          as={FontAwesome}
                          name="male"
                          size={responsiveHeight(3.5)}
                          color={isBoy ? "white" : "#7D8592"}
                        />
                      </TouchableOpacity>
                    </Box>
                  </Box>
                </Box>

                <Box flex={3} flexDirection="column" paddingY={responsiveWidth(3)}>
                  <Box flex={6} alignItems="flex-start" justifyContent={"center"}>
                    <Text
                      textAlign={"center"}
                      fontSize={responsiveFontSize(2.1)}
                      color="#7D8592"
                      bold
                    >
                      जन्म दिनांक :
                    </Text>
                  </Box>

                  <Box flex={6} flexDirection="row">
                    <Box flex={10} alignItems="flex-start">
                      <Text fontSize={responsiveFontSize(2.5)} color="grey">
                        {dateFormat(dateValue)}
                      </Text>
                    </Box>
                    <Box flex={2}>
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
                          value={dateValue}
                          mode={mode}
                          // is24Hour={true}
                          display="default"
                          onChange={(datePickerEvent: any, date: any) => {
                            onChange(datePickerEvent, date, callBackdateSet)
                          }}
                          positiveButton={{ label: "OK", textColor: "green" }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box flex={2.5} flexDirection="column" paddingY={responsiveWidth(2)}>
                  <Box flex={4} flexDirection="row">
                    <Box
                      flex={3}
                      alignItems="flex-start"
                      justifyContent={"center"}
                      paddingY={responsiveWidth(2.5)}
                    >
                      <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                        उंची (सेंटीमीटर):
                      </Text>
                    </Box>
                  </Box>
                  <Box flex={4} flexDirection="row">
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <Input
                        variant="outline"
                        placeholder="उंची"
                        keyboardType="number-pad"
                        fontSize={responsiveFontSize(2.2)}
                        color="#899da6"
                        fontWeight={500}
                        value={String(height)}
                        onChangeText={(val) => setHeight(Number(val))}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box flex={2.5} flexDirection="column" paddingY={responsiveWidth(2)}>
                  <Box flex={2} flexDirection="row">
                    <Box
                      flex={3}
                      alignItems="flex-start"
                      justifyContent={"center"}
                      paddingY={responsiveWidth(2.5)}
                    >
                      <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                        वजन (किलोग्रॅम):
                      </Text>
                    </Box>
                  </Box>
                  <Box flex={4} flexDirection="row">
                    <Box flex={1} borderRadius={responsiveWidth(3)}>
                      <Input
                        variant="outline"
                        placeholder="वजन"
                        keyboardType="number-pad"
                        fontSize={responsiveFontSize(2.2)}
                        color="#899da6"
                        fontWeight={500}
                        onChangeText={(val) => setWeight(Number(val))}
                      />
                    </Box>
                  </Box>
                  <Box
                    flex={6}
                    alignItems="center"
                    justifyContent={"center"}
                    borderRadius={responsiveWidth(3)}
                    paddingX={responsiveWidth(2.1)}
                  ></Box>
                </Box>

                {/* <Box flex={3} flexDirection="column" paddingY={responsiveWidth(2)}></Box> */}
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"} pt={responsiveHeight(2)} alignItems="center">
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderRadius: responsiveWidth(2),
                  backgroundColor: "#4182c3",
                  padding: responsiveWidth(2),
                  width: "80%",
                }}
                onPress={() => {
                  calculateBMI()
                }}
              >
                <Text color={"white"} textAlign="center" fontSize={responsiveFontSize(2)} bold>
                  बी एम आय गणना करा
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        ) : (
          <Box flex={1} flexDirection="column">
            <Box flex={4} flexDirection="row">
              <Box flex={1}></Box>
            </Box>
            <Box flex={4} flexDirection="row" padding={responsiveWidth(2)}>
              <BMIReportItem
                title={bmiLabel}
                description={""}
                bgColor={bg}
                borderColor={color}
                name={bmi}
                key={1}
                icon={""}
                bmiConclusionImage={bmiConclusionImage}
              />
            </Box>
            <Box flex={1}>
              <Image
                source={bmiConclusionImage}
                style={{ height: responsiveHeight(30), width: "100%" }}
                resizeMode="contain"
              />
            </Box>
            <Box flex={1} paddingTop={responsiveHeight(3.7)}>
              <Image
                source={chart}
                style={{
                  height: responsiveHeight(27),

                  width: "100%",
                }}
                resizeMode="contain"
              />
            </Box>
          </Box>
        )}
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
