import { observer } from "mobx-react-lite"
import { Box, Text, Icon } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  RefreshControl,
} from "react-native"
import { Button, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import BasicInformation from "../OverallFeedBack/BasicInformation"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import QuestionsAndSurveyDetailItem from "../OverallFeedBack/QuestionsAndSurveyDetailItem"
import { removeDuplicate } from "../../filter/requireFunction"
import { useHeader } from "../../utils/useHeader"
import Octicons from "react-native-vector-icons/Octicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import TabBarView from "../../UI/TabBarView"
import { useTabBarContextContext } from "../../Context/TabBarContext"
import TabBarView2 from "../../UI/TabBarView2"

import BasicInformationNipunBharatStudent from "./BasicInformationNipunBharatStudent"
import { useNipunBharatStudentContextContext } from "../../Context/NipunBharatStudentContext"
import StudentQuestionResultCard from "./StudentQuestionResultCard"

interface NipunStudentResultScreenProps extends AppStackScreenProps<"NipunStudentResult"> {}

export const NipunStudentResultScreen: FC<NipunStudentResultScreenProps> = observer(
  function NipunStudentResultScreen({ navigation }) {
    const { nipunBharatResultData } = useNipunBharatStudentContextContext()
    const { questions, student } = nipunBharatResultData
    console.log("questionsquestions", questions)

    useHeader({
      title: "चाचणी माहिती",
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
    return (
      // <LinearGradient
      //   colors={["#FFC7E8", "#98AFFF"]}
      //   style={{
      //     width: "100%",
      //     height: responsiveHeight(150),
      //     padding: responsiveWidth(1),
      //     flex: 1,
      //   }}
      //   start={{ x: 1, y: 0 }}
      //   end={{ x: 1, y: 1 }}
      // >
      // <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ height: "100%", width: "100%" }}
        refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
      >
        <Box flex={1} height="100%" width="100%" flexDirection="column">
          <Box flex={4} padding={responsiveWidth(0.1)}>
            <BasicInformationNipunBharatStudent userData={student} />
          </Box>

          <Box flex={8} padding={responsiveWidth(1)} height="100%" width="100%">
            {questions.length !== 0 ? (
              <StudentQuestionResultCard item={nipunBharatResultData} />
            ) : (
              <Box
                flex={1}
                height="100%"
                alignItems={"center"}
                bg="yellow.100"
                alignContent={"center"}
              >
                <Text fontSize={responsiveFontSize(2.5)} fontWeight={600} color="gray.500">
                  "तुमचे मूल्यमापन झालेले नाही !!!!"
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </ScrollView>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
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
