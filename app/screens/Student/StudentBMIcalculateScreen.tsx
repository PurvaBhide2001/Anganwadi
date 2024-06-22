import { observer } from "mobx-react-lite"
import { Avatar, Box, Input, Text } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import React, { FC, useState } from "react"
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
import { useHeader } from "../../utils/useHeader"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import LinearGradient from "react-native-linear-gradient"
import { useBMIContext } from "../../Context/BMIContext"
import { useStudentContextContext } from "../../Context/StudentContext"
import { bmi, calculateAge } from "../../filter/calculateFormule"
import { useLoginContext } from "../../Context/LoginContext"

interface StudentBMIcalculateScreenProps extends AppStackScreenProps<"StudentBMIcalculate"> {}

export const StudentBMIcalculateScreen: FC<StudentBMIcalculateScreenProps> = observer(
  function StudentBMIcalculateScreen({ navigation }) {
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

    const {
      selectedStudent,
      control,
      handleSubmit,
      ageGroup,
      onSubmit,
      ageCategoery,
      setBmiValue,
      ageString,
      callBackDate,
    } = useStudentContextContext()
    const { useData } = useLoginContext()
    console.log("this is student bmi calculate screen", selectedStudent)

    useHeader({
      title: "मूल्यमापन ",
      // title: "बी एम आय कॅलक्युलेटर",
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
    const { calculateBMI } = useBMIContext()
    console.log("{selectedStudent?.join_photo}", selectedStudent)

    const girl = require("../../../assets/meetingIcon/woman.png")
    const boy = require("../../../assets/meetingIcon/man.png")

    return (
      <>
        <ScrollView
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1} flexDirection="column" bg={"white"}>
            <LinearGradient
              colors={["#fdf3f2", "#fdf3f2"]}
              style={{
                width: "100%",

                flex: 1,
              }}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Box flex={1} justifyContent={"center"}>
                <Box
                  flex={1}
                  pt={responsiveHeight(1)}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Avatar
                    height={responsiveHeight(9)}
                    width={responsiveWidth(19)}
                    borderColor="white"
                    justifyContent={"center"}
                    borderWidth={responsiveWidth(0.5)}
                    source={{ uri: selectedStudent?.join_photo }}
                  ></Avatar>
                </Box>
                <Box flex={1} alignItems={"center"}>
                  <Box flex={5}>
                    <Text
                      fontSize={responsiveFontSize(2.8)}
                      padding={responsiveHeight(1)}
                      color="#7D8592"
                      bold
                    >
                      {selectedStudent?.f_name} {selectedStudent?.m_name} {selectedStudent?.l_name}
                    </Text>
                  </Box>
                  <Box flex={4.2}>
                    <Text
                      fontSize={responsiveFontSize(2)}
                      padding={responsiveHeight(0.5)}
                      color="#7D8592"
                      bold
                    >
                      आईचे नाव : {selectedStudent?.mother_name}
                    </Text>
                  </Box>
                  <Box flex={4}>
                    <Text
                      fontSize={responsiveFontSize(2)}
                      padding={responsiveHeight(0.5)}
                      color="#7D8592"
                      bold
                    >
                      वडिलांचे नाव : {selectedStudent?.father_name}
                    </Text>
                  </Box>
                  <Box flex={4}>
                    <Text
                      fontSize={responsiveFontSize(2)}
                      padding={responsiveHeight(0.5)}
                      color="#7D8592"
                      bold
                    >
                      वय : {calculateAge(selectedStudent?.dob, true)}
                    </Text>
                  </Box>

                  <Box flex={4} flexDirection="row" pt={responsiveHeight(1)}>
                    <Box flex={4} alignItems={"center"} bg={"#fceae8"}>
                      <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
                        लिंग :
                      </Text>
                    </Box>
                    <Box flex={4} alignItems={"center"} bg={"#fadfdc"}>
                      <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
                        वजन :
                      </Text>
                    </Box>
                    <Box flex={4} alignItems={"center"} bg={"#fad6d2"}>
                      <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
                        उंची :
                      </Text>
                    </Box>
                  </Box>
                  <Box flex={4} flexDirection="row" bg={"#ece8fc"}>
                    <Box
                      flex={3}
                      paddingX={responsiveWidth(1)}
                      alignItems={"center"}
                      bg={"#fceae8"}
                    >
                      <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
                        {selectedStudent?.gender == "Male" ? "मुलगा" : "मुलगी "}
                      </Text>
                    </Box>
                    <Box
                      flex={3}
                      paddingX={responsiveWidth(1)}
                      alignItems={"center"}
                      bg={"#fadfdc"}
                    >
                      <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
                        {selectedStudent?.weight} किलो
                      </Text>
                    </Box>
                    <Box
                      flex={3}
                      paddingX={responsiveWidth(1)}
                      alignItems={"center"}
                      bg={"#fad6d2"}
                    >
                      <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
                        {selectedStudent?.height} सेमी
                      </Text>
                    </Box>
                  </Box>
                  <Box flex={1}></Box>
                </Box>
              </Box>
            </LinearGradient>
            <Box
              flex={1}
              flexDirection="column"
              bg="white"
              height={responsiveHeight(48)}
              paddingX={responsiveWidth(2)}
            >
              <Box flex={1} flexDirection="row">
                <Box flex={1} padding={responsiveWidth(3)} flexDirection="column">
                  <Box flex={1}>
                    <Text
                      fontSize={responsiveFontSize(2.5)}
                      textAlign={"center"}
                      color="#7D8592"
                      bold
                    >
                      बी एम आय कॅलक्युलेटर
                    </Text>
                  </Box>

                  <Box flex={1.5} flexDirection="row">
                    <Box flex={4} alignItems="flex-start">
                      <Text
                        textAlign={"center"}
                        fontSize={responsiveFontSize(2.1)}
                        color="#7D8592"
                        bold
                      >
                        मूल्यमापन दिनांक :
                      </Text>
                    </Box>

                    <Box flex={5} alignItems="flex-start">
                      <Text fontSize={responsiveFontSize(2.5)} color="grey">
                        {dateFormat(selectedDate)}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      {/* <TouchableOpacity
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
                          // color="gray"
                        />
                      </TouchableOpacity> */}

                      {show && (
                        <RNDateTimePicker
                          testID="dateTimePicker"
                          timeZoneOffsetInMinutes={0}
                          value={selectedDate}
                          mode={mode}
                          // is24Hour={true}
                          display="default"
                          onChange={(event: any, date: any) => onChange(event, date, callBackDate)}
                          positiveButton={{ label: "OK", textColor: "green" }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box flex={1.5} flexDirection="row">
                    <Box flex={3} alignItems="flex-start">
                      <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                        उंची (सेंटीमीटर):
                      </Text>
                    </Box>
                    <Box flex={5}>
                      <Input
                        variant="outline"
                        placeholder="उंची"
                        keyboardType="number-pad"
                        fontSize={responsiveFontSize(2.2)}
                        color="#899da6"
                        fontWeight={500}
                        value={String(height)}
                        onChangeText={(val) => setHeight(Math.floor(Number(val)))}
                      />
                    </Box>
                  </Box>
                  <Box flex={1.5} flexDirection="row">
                    <Box flex={3} alignItems="flex-start">
                      <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                        वजन (किलोग्रॅम):
                      </Text>
                    </Box>
                    <Box flex={5} flexDirection="row">
                      <Box flex={1}>
                        <Input
                          variant="outline"
                          placeholder="वजन"
                          keyboardType="number-pad"
                          fontSize={responsiveFontSize(2.2)}
                          color="#899da6"
                          fontWeight={500}
                          value={String(weight)}
                          onChangeText={(val) => setWeight(Math.floor(Number(val)))}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box flex={0.7} flexDirection="row">
                    <Box flex={1} alignItems="flex-start" justifyContent={"center"}>
                      <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                        बी एम आय :
                      </Text>
                    </Box>
                    <Box flex={2} alignItems="flex-start" justifyContent={"center"}>
                      <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                        {bmi(height, weight) || 0.0}
                      </Text>
                    </Box>
                  </Box>
                  <Box flex={1.5} flexDirection="row" justifyContent="center">
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#98AFFF",
                        height: "60%",
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: responsiveWidth(2),
                      }}
                      onPress={() => {
                        setBmiValue(bmi(height, weight))
                        onSubmit()
                      }}
                    >
                      <Text
                        textAlign="center"
                        color={"white"}
                        justifyContent="center"
                        fontWeight={600}
                        fontSize={responsiveFontSize(2.5)}
                      >
                        पुढे जा
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
        {/* </LinearGradient> */}
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
