import { observer } from "mobx-react-lite"
import { Box, Text, Link, Image } from "native-base"
import React, { FC, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMeetingContextContext } from "../../../Context/MeetingContext"
import { AppStackScreenProps, navigate } from "../../../navigators"
import { colors, spacing } from "../../../theme"
import { useHeader } from "../../../utils/useHeader"
const members = require("../../../../assets/surveyimages/meeting/members.png")
import { useMainMenuContext } from "../../../Context/MainMenuContext"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import PastMeetingsList from "./PastMeetingsList"
interface PastMeetingListProps extends AppStackScreenProps<"PastMeetingList"> {}
export const PastMeetingListScreen: FC<PastMeetingListProps> = observer(function PastMeetingList({
  navigation,
}) {
  const [meeting, setMeeting] = useState<any[]>([])
  const { particularMeetingInfo, avatarImages } = useMeetingContextContext()
  const { menuSMList, menuMDList, UpdatesList, onRefresh, refereshing } = useMainMenuContext()
  const date = particularMeetingInfo?.date_time.split(" ")[0]
  const time = particularMeetingInfo?.date_time.split(" ")[1]

  const [iconColor, setIconColor] = useState("#e0e0e0")
  const handleIcon = () => {
    setIconColor(iconColor === "#616161" ? "#e0e0e0" : "#616161")
  }

  useHeader({
    title: "झालेल्या बैठक",
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
        <Box flex={1} alignItems={"center"} flexDirection={"row"}>
          <Box flex={1} flexDirection={"column"}>
            <TouchableOpacity
              style={{
                backgroundColor: "#f07a83",

                justifyContent: "center",
                // borderTopLeftRadius: responsiveWidth(1),
                // borderBottomLeftRadius: responsiveWidth(1),
              }}
              onPress={() => navigate("Meeting")}
            >
              <Text
                textAlign="center"
                color={"white"}
                justifyContent="center"
                fontWeight={600}
                fontSize={responsiveFontSize(2.5)}
                padding={responsiveHeight(1)}
              >
                आगामी बैठक
              </Text>
            </TouchableOpacity>
          </Box>
          <Box flex={1} flexDirection={"column"}>
            <Box
              style={{
                backgroundColor: "#dc3541",

                width: "100%",
                justifyContent: "center",
                // borderTopRightRadius: responsiveWidth(1),
                // borderBottomRightRadius: responsiveWidth(1),
              }}
            >
              <Text
                textAlign="center"
                color={"white"}
                justifyContent="center"
                fontWeight={600}
                fontSize={responsiveFontSize(2.5)}
                padding={responsiveHeight(1)}
              >
                झालेली बैठक
              </Text>
            </Box>
          </Box>
        </Box>
        <Box flex={1}>
          <PastMeetingsList />
        </Box>
      </ScrollView>
    </>
  )
})

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
