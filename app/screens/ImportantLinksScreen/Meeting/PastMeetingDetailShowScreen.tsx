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

interface PastMeetingDetailShowProps extends AppStackScreenProps<"PastMeetingDetailShow"> {}

export const PastMeetingDetailShowScreen: FC<PastMeetingDetailShowProps> = observer(
  function PastMeetingDetailShow({ navigation }) {
    const [meeting, setMeeting] = useState<any[]>([])
    const { pastParticularMeetingInfo, avatarImages } = useMeetingContextContext()
    const { onRefresh, refereshing } = useMainMenuContext()
    const date = pastParticularMeetingInfo?.date_time.split(" ")[0]
    const time = pastParticularMeetingInfo?.date_time.split(" ")[1]
    const dateStr = pastParticularMeetingInfo?.date_time
    const dateObj = new Date(dateStr)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const weekdayIndex = dateObj.getDay()
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
    console.log(pastParticularMeetingInfo, "pastParticularMeetingInfo'''''''''''''''")
    const participantsArray = JSON.parse(pastParticularMeetingInfo?.participants)
    const participantLength = participantsArray.length

    useHeader({
      title: "मागील बैठकीचे तपशील",
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
          style={{ backgroundColor: "white" }}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1.2} padding={responsiveWidth(2)}>
            <Box flex={1} bg="#f2f0f0" borderRadius={responsiveWidth(4)}>
              <Box flex={0.1}></Box>
              <Box flex={1} flexDirection={"row"}>
                <Box flex={2} padding={responsiveWidth(2)} paddingLeft={responsiveWidth(2.2)}>
                  <Box
                    flex={1.5}
                    bg="white"
                    alignItems={"center"}
                    paddingY={4}
                    borderTopRadius={responsiveWidth(10)}
                    borderColor="warmGray.400"
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
                    bg="warmGray.400"
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
                <Box flex={9} flexDirection="column" textAlign={"start"}>
                  <Box flex={1} flexDirection="column" justifyContent="center">
                    <Box>
                      <Text
                        fontSize={responsiveFontSize(2.3)}
                        color="warmGray.500"
                        fontWeight={600}
                        bold
                      >
                        {pastParticularMeetingInfo?.title}
                      </Text>
                    </Box>

                    <Box flexDirection="row" alignItems={"center"}>
                      <Text
                        fontSize={responsiveFontSize(2.1)}
                        color="warmGray.500"
                        fontWeight={600}
                      >
                        आयोजक :
                      </Text>
                      <Text
                        fontSize={responsiveFontSize(2.1)}
                        color="warmGray.500"
                        fontWeight={600}
                        bold
                      >
                        {pastParticularMeetingInfo?.creator}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveHeight(2)} alignItems={"center"}>
              <Box flex={3} flexDirection="column">
                <Avatar
                  alignSelf={"center"}
                  height={responsiveHeight(8)}
                  width={responsiveWidth(16)}
                  borderColor="warmGray.300"
                  backgroundColor="#efefff"
                  borderWidth={responsiveWidth(0.5)}
                >
                  <Text color={"warmGray.500"}>{participantLength}</Text>
                  {/* 111111 */}
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

            <Box flex={2.5} flexDirection="column" paddingTop={responsiveHeight(1)}>
              <Box flex={0.6} flexDirection="row" paddingY={responsiveHeight(1)}>
                <Box flex={2} alignItems="center">
                  <Fontisto name="date" size={responsiveWidth(6)} color="gray" />
                </Box>
                <Box flex={10}>
                  <Text fontSize={responsiveFontSize(2.1)} color="warmGray.500" fontWeight={600}>
                    {date}
                  </Text>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column" paddingY={responsiveHeight(1)}>
                <Box flex={1} bg="#f1f1f1" height={responsiveHeight(0.7)}></Box>
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
              <Box flex={1} flexDirection="column" paddingY={responsiveHeight(1)}>
                <Box flex={1} bg="#f1f1f1" height={responsiveHeight(0.7)}></Box>
              </Box>
              <Box flex={3} flexDirection="row" paddingTop={responsiveHeight(1)}>
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
                    {pastParticularMeetingInfo?.description}
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
