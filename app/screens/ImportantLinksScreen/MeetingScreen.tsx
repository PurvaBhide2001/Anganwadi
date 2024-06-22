import { observer } from "mobx-react-lite"
import { Box, Image, Text } from "native-base"
import React, { FC, useState } from "react"
import { TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import { useHeader } from "../../utils/useHeader"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import MeetingList from "./Meeting/MeetingList"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useMeetingContextContext } from "../../Context/MeetingContext"
interface MeetingProps extends AppStackScreenProps<"Meeting"> {}

export const MeetingScreen: FC<MeetingProps> = observer(function Meeting({ navigation }) {
  //   const { navigation } = _props
  const [iconColor, setIconColor] = useState("#e0e0e0")
  const handleIcon = () => {
    setIconColor(iconColor === "#616161" ? "#e0e0e0" : "#616161")
  }
  useHeader({
    title: "आगामी बैठक",
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

  const { onRefreshMeeting, refreshMeeting } = useMeetingContextContext()
  return (
    <>
      <ScrollView
        style={{}}
        refreshControl={
          <RefreshControl refreshing={refreshMeeting} onRefresh={() => onRefreshMeeting()} />
        }
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <Box flex={1} flexDirection={"row"}>
            <Box flex={1} flexDirection={"column"}>
              <Box
                style={{
                  backgroundColor: "#dc3541",
                  justifyContent: "center",
                  // borderTopLeftRadius: responsiveWidth(1),
                  // borderBottomLeftRadius: responsiveWidth(1),
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
                  आगामी बैठक
                </Text>
              </Box>
            </Box>
            <Box flex={1} flexDirection={"column"}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#f07a83",
                  width: "100%",
                  justifyContent: "center",
                  // borderTopRightRadius: responsiveWidth(1),
                  // borderBottomRightRadius: responsiveWidth(1),
                }}
                onPress={() => navigate("PastMeetingList")}
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
              </TouchableOpacity>
            </Box>
          </Box>
          <Box flex={1}>
            <MeetingList />
          </Box>
        </SafeAreaView>
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
