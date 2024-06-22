import { observer } from "mobx-react-lite"
import { Box, Text, Link, Image, Avatar } from "native-base"
import React, { FC, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from "react-native-vector-icons/Fontisto"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useMeetingContextContext } from "../../../Context/MeetingContext"
import { AppStackScreenProps } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { useHeader } from "../../../utils/useHeader"
const members = require("../../../../assets/surveyimages/meeting/members.png")

import { useMainMenuContext } from "../../../Context/MainMenuContext"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"

interface MeetingDetailShowProps extends AppStackScreenProps<"MeetingDetailShow"> {}

export const MeetingDetailShowScreen: FC<MeetingDetailShowProps> = observer(
  function MeetingDetailShow({ navigation }) {
    const [meeting, setMeeting] = useState<any[]>([])
    //   const { navigation } = _props

    const { particularMeetingInfo, avatarImages } = useMeetingContextContext()
    const { menuSMList, menuMDList, UpdatesList, onRefresh, refereshing } = useMainMenuContext()

    const date = particularMeetingInfo?.date_time.split(" ")[0]
    const time = particularMeetingInfo?.date_time.split(" ")[1]
    const dateStr = particularMeetingInfo?.date_time
    const dateObj = new Date(dateStr)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const weekdayIndex = dateObj.getDay()

    // Convert the weekday index to the corresponding weekday name
    const weekdays = [
      "रविवार ",
      "सोमवार",
      " मंगळवार",
      " बुधवार ",
      "गुरुवार",
      " शुक्रवार",
      " शनिवार",
    ]
    const weekday = weekdays[weekdayIndex]

    // Array length of participants
    const participantsArray = JSON.parse(particularMeetingInfo?.participants)
    const participantLength = participantsArray.length
    console.log(particularMeetingInfo)

    useHeader({
      title: "बैठकीचे तपशील",
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
          <Box flex={1.2} padding={responsiveWidth(2)}>
            <Box flex={1} bg="#e7f0f3" borderRadius={responsiveWidth(4)}>
              <Box flex={0.1}></Box>
              <Box flex={1} flexDirection={"row"}>
                <Box flex={2} padding={responsiveWidth(2)} paddingLeft={responsiveWidth(2.2)}>
                  <Box
                    flex={1.5}
                    bg="white"
                    alignItems={"center"}
                    paddingY={2}
                    borderTopRadius={responsiveWidth(10)}
                    borderColor="#3d7e9a"
                    borderWidth={responsiveWidth(0.3)}
                  >
                    <Text
                      width={"100%"}
                      fontSize={responsiveFontSize(1.8)}
                      textAlign="center"
                      flex={1}
                    >
                      {weekday}
                    </Text>
                    <Text
                      width={"100%"}
                      fontSize={responsiveFontSize(2.1)}
                      textAlign="center"
                      flex={1}
                    >
                      {day}
                    </Text>
                  </Box>

                  <Box
                    flex={0.7}
                    padding={1}
                    style={{ height: responsiveHeight(4) }}
                    bg="#3d7e9a"
                    borderBottomRadius={responsiveWidth(12)}
                  >
                    <Text
                      width={"100%"}
                      textAlign="center"
                      fontWeight={600}
                      color="#efefff"
                      flex={1}
                      fontSize={responsiveFontSize(2)}
                      bold
                    >
                      {year}
                    </Text>
                  </Box>
                </Box>
                <Box flex={0.5}></Box>
                <Box flex={9} flexDirection="column" textAlign={"center"}>
                  <Box flex={1} flexDirection="column" justifyContent="center">
                    <Box>
                      <Text
                        fontSize={responsiveFontSize(2.3)}
                        color="#3d7e9a"
                        fontWeight={600}
                        bold
                      >
                        {particularMeetingInfo?.title}
                      </Text>
                    </Box>

                    <Box flexDirection="row" alignItems={"center"}>
                      <Text fontSize={responsiveFontSize(2.1)} color="#3d7e9a" fontWeight={600}>
                        आयोजक :
                      </Text>
                      <Text
                        fontSize={responsiveFontSize(2.1)}
                        color="#3d7e9a"
                        fontWeight={600}
                        bold
                      >
                        {particularMeetingInfo?.creator}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box flex={0.5} paddingY={responsiveWidth(3)}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3d7e9a",
                  alignItems: "center",
                  justifyContent: "center",
                  height: responsiveHeight(5.5),
                  borderRadius: responsiveWidth(2),
                }}
              >
                <Link
                  _text={{
                    fontSize: responsiveFontSize(2.3),
                    fontWeight: "500",
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                  href={particularMeetingInfo?.url}
                  // href="https://meet.jit.si/static/dialInInfo.html?room=AnganwadiMeeting"
                  alignSelf="center"
                >
                  बैठकीत सामील व्हा
                </Link>
              </TouchableOpacity>
            </Box>
            <Box flex={1} flexDirection="row" paddingX={responsiveWidth(2)} alignItems={"center"}>
              <Box flex={3} flexDirection="column">
                <Avatar
                  // alignSelf={"center"}
                  height={responsiveHeight(8)}
                  width={responsiveWidth(16)}
                  borderColor="#3d7e9a"
                  backgroundColor="#e7f0f3"
                  borderWidth={responsiveWidth(0.5)}
                >
                  <Text color={"#3d7e9a"}>{participantLength}</Text>
                </Avatar>
              </Box>
              <Box flex={9} flexDirection="column">
                <Text
                  fontSize={responsiveFontSize(2.2)}
                  color="warmGray.500"
                  paddingBottom={responsiveHeight(1)}
                  fontWeight={600}
                >
                  सदस्य संख्या
                </Text>
              </Box>
            </Box>
            <Box flex={2.5} flexDirection="column">
              <Box flex={1} flexDirection="column">
                <Box flex={1} bg="#f1f1f1" height={responsiveHeight(1)}></Box>
              </Box>
              <Box flex={0.6} flexDirection="row">
                <Box flex={2} alignItems="center">
                  <Fontisto name="date" size={responsiveWidth(6)} color="gray" />
                </Box>
                <Box flex={10}>
                  <Text fontSize={responsiveFontSize(2.1)} color="warmGray.500" fontWeight={600}>
                    {date}
                  </Text>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column" paddingY={responsiveHeight(0.5)}>
                <Box flex={1} bg="#f1f1f1" height={responsiveHeight(1)}></Box>
              </Box>
              <Box flex={0.6} flexDirection="row">
                <Box flex={2} alignItems="center">
                  <MaterialCommunityIcons
                    name="clock-time-four-outline"
                    size={responsiveWidth(6)}
                    color="gray"
                  />
                </Box>
                <Box flex={10}>
                  <Text fontSize={responsiveFontSize(2.1)} color="warmGray.500" fontWeight={600}>
                    {time}
                  </Text>
                </Box>
              </Box>

              <Box flex={3} flexDirection="row" paddingTop={responsiveHeight(2)}>
                <Box flex={2} alignItems="center">
                  <MaterialIcons name="notes" size={responsiveWidth(7)} color="gray" />
                </Box>
                <Box flex={10} paddingRight={responsiveWidth(4)}>
                  <Text
                    fontSize={responsiveFontSize(2.1)}
                    color="warmGray.500"
                    textAlign={"justify"}
                    fontWeight={600}
                  >
                    {particularMeetingInfo?.description}
                  </Text>
                </Box>
              </Box>

              <Box flex={0.1} flexDirection="row"></Box>
            </Box>
          </Box>
        </ScrollView>
      </>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.tiny,
  paddingHorizontal: spacing.tiny,
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
