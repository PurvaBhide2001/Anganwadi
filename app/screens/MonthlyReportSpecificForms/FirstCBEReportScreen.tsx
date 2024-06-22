import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { dateFormat } from "../../filter/dateAndTimeFormat"
import { useReportContext } from "../../Context/ReportContext"

interface FirstCBEReportProps extends AppStackScreenProps<"FirstCBEReport"> {}

export const FirstCBEReportScreen: FC<FirstCBEReportProps> = observer(function FirstCBEReport({
  navigation,
}) {
  const { onChange, show, selectedDate, showDatepicker, mode } = useCommanContextContext()
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const { callBackdateSet, dateValue } = useReportContext()
  useHeader({
    title: "CBE Report",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
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
        <Box
          flex={1}
          flexDirection="column"
          height={"100%"}
          bg={"white"}
          padding={responsiveWidth(2)}
        >
          <Box flex={1} alignItems="center" justifyContent="center" padding={responsiveWidth(2)}>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={1} flexDirection="column" paddingY={responsiveWidth(3)}>
                <Box flex={1} alignItems="flex-start" justifyContent={"center"}>
                  <Text
                    textAlign={"center"}
                    fontSize={responsiveFontSize(2.1)}
                    color="#7D8592"
                    bold
                  >
                    महिना निवडा :
                  </Text>
                </Box>

                <Box flex={1} flexDirection="row">
                  <Box flex={10} alignItems="flex-start">
                    <Text fontSize={responsiveFontSize(2.5)} color="grey">
                      {dateFormat(dateValue)}
                    </Text>
                  </Box>
                  <Box flex={1}>
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
            </Box>
          </Box>
        </Box>
        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          <TouchableOpacity
            style={{
              backgroundColor: "#669df6",
              width: "100%",
              justifyContent: "center",
            }}
            onPress={handleSubmit((data: any) => {
              onSubmit(data)
            })}
          >
            <Text
              textAlign="center"
              color={"white"}
              justifyContent="center"
              fontSize={responsiveFontSize(2.5)}
              padding={responsiveWidth(1)}
              bold
            >
              माहिती भरा
            </Text>
          </TouchableOpacity>
        </Box>
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
