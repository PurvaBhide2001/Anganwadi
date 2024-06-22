import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import React, { FC, useCallback, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"

import { AppStackScreenProps, navigate } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import RadioButtonController from "../../UI/RadioButtonController"
import { ActivityIndicator } from "react-native"
import { StyleSheet } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"
interface BALAawcProps extends AppStackScreenProps<"BALAawc"> {}

export const BALAawcScreen: FC<BALAawcProps> = observer(function BALAawc({ navigation }) {
  onSubmit: Function
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    BalaControl,
    BalaHandleSubmit,
    onSubmitBalaReport,
    dateBalaValue,
    callBackBaladateSet,
    balaStatus,
    isLoadingBala,
    getCurrentDate,
    isOpenWarninigModal,
    openWarningModal,
    closeToTheWarningModal,
    balaError,
    executeBalaApi,
    balaReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  useHeader({
    title: "BALA रिपोर्ट",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      balaStatus != 200 && balaReset()
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
          <Spinner visible={isLoadingBala} textContent={""} textStyle={{ color: "#FFF" }} />
          <WarningModal2
            message={"तुमची माहिती अचूक असेल तरच सबमिट करा!!"}
            isOpen={isOpenWarninigModal}
            closeModal={closeToTheWarningModal}
            maxH={"212"}
            yesFun={executeBalaApi}
            // yesFun={() => BalaHandleSubmit(onSubmitBalaReport)()}
            yesName={"हो"}
            cancelName={"नाही"}
            cancelFun={closeToTheWarningModal}
            title={"खात्री करा"}
            size={"md"}
          />
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
                      {dateFormatRequiredType(dateBalaValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {balaStatus != 200 && (
                      <TouchableOpacity
                        style={{
                          width: responsiveWidth(8),
                        }}
                        onPress={() => {
                          showMonthPicker(true)
                        }}
                      >
                        <MaterialCommunityIcons
                          name="calendar-month"
                          size={responsiveWidth(8)}
                          color="#669df6"
                        />
                      </TouchableOpacity>
                    )}

                    {showMonth && (
                      <MonthPicker
                        onChange={(event: any, month) => {
                          onChangeMonth(event, month, callBackBaladateSet)
                        }}
                        value={date}
                        minimumDate={new Date(2023, 3)}
                        maximumDate={getCurrentDate()}
                        locale="en"
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box flex={1} flexDirection="row">
            <Box
              flex={1}
              borderRadius={responsiveWidth(3)}
              alignContent="flex-end"
              justifyContent={"center"}
              padding={responsiveWidth(2)}
            >
              <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                तुमची अंगणवाडी बाला आहे का ?
              </Text>
            </Box>
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <RadioButtonController
              control={BalaControl}
              errors={balaError}
              isDisabled={balaStatus == 200 ? true : false}
              name={"is_anganwadi_bala_type"}
              defaultValue={"0"}
            />
          </Box>
          <Box flex={1} flexDirection="row">
            <Box
              flex={1}
              borderRadius={responsiveWidth(3)}
              alignContent="flex-end"
              justifyContent={"center"}
              padding={responsiveWidth(2)}
            >
              <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                बाला उपक्रमाप्रमाणे कामकाज सुरु आहे का ?
              </Text>
            </Box>
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <RadioButtonController
              errors={balaError}
              control={BalaControl}
              isDisabled={balaStatus == 200 ? true : false}
              name={"is_bala_working"}
              defaultValue={"0"}
            />
          </Box>
        </Box>
        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {balaStatus == 200 ? (
            <Box></Box>
          ) : balaStatus == 203 ? (
            <Box>
              <Text
                textAlign="center"
                color={"white"}
                justifyContent="center"
                fontSize={responsiveFontSize(2.5)}
                padding={responsiveWidth(1)}
                bold
              >
                या महिन्याचा डेटा आधीच सबमिट केला आहे
              </Text>
            </Box>
          ) : balaStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingBala ? ( // Display the loader if isLoading is true
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  {/* <ActivityIndicator size={70} color={"#669df6"} /> */}
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#669df6",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onPress={BalaHandleSubmit(onSubmitBalaReport)}
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
              )}
            </React.Fragment>
          )}
        </Box>
      </ScrollView>
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    position: "relative", // Set the position of the container element to relative
  },
  loader: {
    position: "absolute", // Set the position of the ActivityIndicator component to absolute
    zIndex: -1, // Set the z-index of the ActivityIndicator component to -1
  },
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
