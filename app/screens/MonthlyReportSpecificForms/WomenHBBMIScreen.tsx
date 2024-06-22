import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import React, { FC, useEffect, useState } from "react"
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import InputField2 from "../../UI/InputField2"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import SelectDropdown3 from "../../UI/SelectDropdown3"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ReportShowApi } from "../../api/ReportApi"
import { ActivityIndicator } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface WomenHBBMIProps extends AppStackScreenProps<"WomenHBBMI"> {}

export const WomenHBBMIScreen: FC<WomenHBBMIProps> = observer(function WomenHBBMI({ navigation }) {
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const {
    HBControl,
    HBHandleSubmit,
    onSubmitHBData,
    dateWomenHbBmiValue,
    callBackWomenHbBmidateSet,
    hbStatus,
    isLoadingHb,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    hbStateError,
    executeHBApi,
    hbReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  useHeader({
    title: "गरोदर व बालके HB / BMI",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      hbStatus != 200 && hbReset()
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
        <WarningModal2
          message={"तुमची माहिती अचूक असेल तरच सबमिट करा!!"}
          isOpen={isOpenWarninigModal}
          closeModal={closeToTheWarningModal}
          maxH={"212"}
          yesFun={executeHBApi}
          // yesFun={() => HBHandleSubmit(onSubmitHBData)()}
          yesName={"हो"}
          cancelName={"नाही"}
          cancelFun={closeToTheWarningModal}
          title={"खात्री करा"}
          size={"md"}
        />
        <Box
          flex={1}
          flexDirection="column"
          height={"100%"}
          bg={"white"}
          padding={responsiveWidth(2)}
        >
          <Spinner visible={isLoadingHb} textContent={""} textStyle={{ color: "#FFF" }} />
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
                      {dateFormatRequiredType(dateWomenHbBmiValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {hbStatus != 200 && (
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
                          onChangeMonth(event, month, callBackWomenHbBmidateSet)
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
            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  एकुण गरोदर मातांची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={HBControl}
                  name={"pregnent_women_count"}
                  placeholder={"माता"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={hbStatus == 200 ? true : false}
                  errors={hbStateError}
                />
              </Box>
            </Box>
          </Box>

          <Box flex={1} flexDirection="row">
            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  HB तपासणी झालेल्या गरोदर मातांची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={HBControl}
                  name={"hb_checked_count"}
                  placeholder={"माता"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={hbStatus == 200 ? true : false}
                  errors={hbStateError}
                />
              </Box>
            </Box>
          </Box>

          <Box flex={1} flexDirection="row">
            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  HB कमी असलेल्या गरोदर मातांची टक्केवारी :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={HBControl}
                  name={"less_hb_count"}
                  placeholder={"माता"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={hbStatus == 200 ? true : false}
                  errors={hbStateError}
                />
              </Box>
            </Box>
          </Box>

          <Box flex={1} flexDirection="row">
            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  HB तपासणी झालेल्या बालकांची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={HBControl}
                  name={"hb_checked_kids"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={hbStatus == 200 ? true : false}
                  errors={hbStateError}
                />
              </Box>
            </Box>
          </Box>

          <Box flex={1} flexDirection="row">
            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  HB कमी असलेल्या बालकांची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={HBControl}
                  name={"less_hb_kids"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={hbStatus == 200 ? true : false}
                  errors={hbStateError}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {hbStatus == 200 ? (
            <Box></Box>
          ) : hbStatus == 203 ? (
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
          ) : hbStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingHb ? ( // Display the loader if isLoading is true
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  {/* <ActivityIndicator
                    size={70}
                    animating={isLoadingHb}
                    style={styles.activityIndicator}
                    color={"#669df6"}
                  /> */}
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#669df6",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onPress={HBHandleSubmit(onSubmitHBData)}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: responsiveHeight(80),
  },
})
