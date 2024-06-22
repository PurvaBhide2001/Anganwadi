import { observer } from "mobx-react-lite"
import { Avatar, Box, Text, Icon } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { Button, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"
import { useHeader } from "../../utils/useHeader"
import BasicInfo from "./BasicInfo"
import StudentResultData from "./StudentResultData"
import Octicons from "react-native-vector-icons/Octicons"
import { useStudentContextContext } from "../../Context/StudentContext"

interface StudentResultProps extends AppStackScreenProps<"StudentResult"> {}

export const StudentResultScreen: FC<StudentResultProps> = observer(function StudentResult(_props) {
  useHeader({
    title: "विद्यार्थ्याचे मूल्यमापन",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.5),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      navigate("MainMenu")
    },
    leftIcon: "back",
  })
  const { questionAnswers, studentBasicInfo, titleObject, iconObject, evaluationtitle } =
    useFeedbackContextContext()
  // console.log("Student Result Data", StudentResultData)
  // console.log(onSubmitFeedBack, "onSubmitFeedBack onSubmitFeedBack")
  const { selectedStudent } = useStudentContextContext()

  //some another thing
  return (
    // <LinearGradient
    //   colors={["#FFC7E8", "#98AFFF"]}
    //   style={{
    //     width: "100%",
    //     height: responsiveHeight(30),
    //     padding: responsiveWidth(1),
    //     flex: 1,
    //   }}
    //   start={{ x: 1, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    // >
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{}}>
        <Box flex={0.2}></Box>
        <Box flex={1} flexDirection="column">
          {/* <Box flex={1} padding="3px">
              <Avatar
                alignSelf={"center"}
                height={responsiveHeight(10)}
                width={"20%"}
                source={{ uri: selectedStudent?.join_photo }}
              ></Avatar>
            </Box> */}

          <BasicInfo
            studentBasicInfo={studentBasicInfo}
            titleObject={titleObject}
            iconObject={iconObject}
          />
          <StudentResultData questionAnswers={questionAnswers} evaluationtitle={evaluationtitle} />
          {/* <Box flex={1} flexDirection="row"  justifyItems={"flex-end"} padding={responsiveWidth(2)}>
              <Box flex={1} >
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: "80%",
                    justifyContent: "center",
                    borderRadius: responsiveWidth(2),
                    borderColor: "#f6f8fa",
                    borderWidth: responsiveWidth(0.5),
                  }}
                >
                  <Box flex={1} flexDirection="row">
                    <Box flex={0.2}></Box>
                    <Box flex={0.2}>
                      <Icon
                        as={Octicons}
                        name="download"
                        size={responsiveHeight(3.5)}
                        color="white"
                      />
                    </Box>
                    <Box flex={1}>
                      <Text
                        textAlign="center"
                        color={"white"}
                        justifyContent="center"
                        fontWeight={600}
                        fontSize={responsiveFontSize(2.5)}
                      bold>
                        डाउनलोड
                      </Text>
                    </Box>
                  </Box>
                </TouchableOpacity>
              </Box>
              <Box flex={1}>
              </Box>
            </Box> */}
        </Box>
      </ScrollView>
    </SafeAreaView>
    // </LinearGradient>
  )
})

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
