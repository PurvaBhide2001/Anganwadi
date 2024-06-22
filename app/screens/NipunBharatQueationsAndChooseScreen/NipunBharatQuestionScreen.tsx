import { observer } from "mobx-react-lite"
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Box,
  Center,
  Divider,
  Image,
  VStack,
  Text,
} from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { Button, Card, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import { Drawer } from "../../components/Drawer"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import QuestionBlock from "./QuestionBlock"
import { useQuestionContext } from "../../Context/QuestionContext"
import LinearGradient from "react-native-linear-gradient"
import { useStudentContextContext } from "../../Context/StudentContext"
import { useHeader } from "../../utils/useHeader"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"
import { useNipunBharatQuestionContext } from "../../Context/NipunBharatQuestionContext"
import { useNipunBharatStudentContextContext } from "../../Context/NipunBharatStudentContext"

// const image1 = require("../../../assets/images/app-icon-android-legacy.png")
const image1 = require("../../../assets/surveyimages/svgtopng/img3.png")
const image2 = require("../../../assets/surveyimages/svgtopng/img1.png")
const image3 = require("../../../assets/surveyimages/svgtopng/ropingGirl.png")

interface NipunBharatQuestionScreenProps extends AppStackScreenProps<"NipunBharatQuestion"> {}

export const NipunBharatQuestionScreen: FC<NipunBharatQuestionScreenProps> = observer(
  function NipunBharatQuestionScreen({ navigation }) {
    const {
      nextQuestion,
      previousQuestion,
      changesButton,
      setsubmitedAnswersArray,
      questionIndex,
      setChangeButton,
      setToTheSelectedAnswer,
    } = useNipunBharatQuestionContext()
    const { onSubmitQuestionAnswer, onSubmitQuestionData } = useNipunBharatStudentContextContext()
    const { onSubmitFeedBack } = useFeedbackContextContext()
    useHeader({
      title: " प्रश्न संच",
      titleStyle: {
        fontStyle: "normal",
        fontSize: responsiveFontSize(2.5),
        fontWeight: "700",
        color: "#7d8592",
      },

      onLeftPress(event) {
        questionIndex.current = 0
        setChangeButton(false)
        setsubmitedAnswersArray([])
        setToTheSelectedAnswer("")
        navigation.goBack()
      },
      leftIcon: "back",
    })
    return (
      <>
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
          <Box flex={1} height="100%" width="100%">
            <Box flex={1} flexDirection="column">
              <Box
                flex={1}
                width="100%"
                height={responsiveHeight(155)}
                padding={responsiveWidth(1.0)}
              >
                <QuestionBlock />
              </Box>

              <Box flex={1} width="100%" height={responsiveHeight(5)}>
                <Box flex={1} flexDirection="row">
                  <Box flex={6} alignItems="center" padding={responsiveWidth(5)}>
                    <Box
                      flex={1}
                      alignItems="center"
                      justifyContent="center"
                      width={responsiveWidth(13.5)}
                      borderRadius={responsiveWidth(13.5)}
                    >
                      {questionIndex.current !== 0 && (
                        <TouchableOpacity
                          style={{
                            width: responsiveWidth(20),
                            padding: responsiveWidth(2),
                            alignItems: "center",
                            borderRadius: responsiveWidth(2),
                            backgroundColor: "white",
                          }}
                          onPress={() => previousQuestion()}
                        >
                          <Text
                            textAlign="center"
                            color={"warmGray.500"}
                            justifyContent="center"
                            fontWeight={600}
                            fontSize={responsiveFontSize(2.5)}
                            // padding={responsiveHeight(1)}
                          >
                            मागे या
                          </Text>
                        </TouchableOpacity>
                      )}
                    </Box>
                  </Box>
                  <Box flex={6} alignItems="center" padding={responsiveWidth(5)}>
                    {!changesButton ? (
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        width={responsiveWidth(13.5)}
                        borderRadius={responsiveWidth(13.5)}
                      >
                        <TouchableOpacity
                          style={{
                            width: responsiveWidth(20),
                            padding: responsiveWidth(2),
                            alignItems: "center",
                            borderRadius: responsiveWidth(2),
                            backgroundColor: "white",
                          }}
                          onPress={() => nextQuestion()}
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
                    ) : (
                      <Box
                        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                        borderRadius={responsiveWidth(13.5)}
                      >
                        <TouchableOpacity
                          style={{
                            width: responsiveWidth(30),
                            padding: responsiveWidth(2),
                            borderRadius: responsiveWidth(2),
                            backgroundColor: "#FFABAB",
                          }}
                          onPress={() => onSubmitQuestionData()}
                        >
                          <Text
                            textAlign="center"
                            color={"white"}
                            justifyContent="center"
                            fontWeight={600}
                            fontSize={responsiveFontSize(2.5)}
                          >
                            सबमिट करा
                          </Text>
                        </TouchableOpacity>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </LinearGradient>
        {/* </Drawer> */}
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
/**
 * 
 *  <Box flex={6} alignItems="center" padding={responsiveWidth(5)}>
                      <TouchableOpacity
                        style={{
                          width: "100%",
                          // padding: responsiveWidth(6),
                          alignItems: "center",
                          borderRadius: responsiveWidth(1),
                          height: "40%",
                        }}
                        onPress={() => nextQuestion()}
                      >
                        <LinearGradient
                          colors={["#ddb1c2", "#7EE8FA"]}
                          style={{
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: responsiveWidth(1),
                          }}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        >
                          <Text fontSize={responsiveFontSize(3)}>सबमिट करा</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </Box>
 */
