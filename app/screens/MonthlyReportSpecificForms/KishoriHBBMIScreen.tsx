import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import Spinner from "react-native-loading-spinner-overlay"
import React, { FC, useEffect, useState } from "react"
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
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import InputField2 from "../../UI/InputField2"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ReportShowApi } from "../../api/ReportApi"
import { ActivityIndicator } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import { StyleSheet } from "react-native"

interface KishoriHBBMIProps extends AppStackScreenProps<"KishoriHBBMI"> {}

export const KishoriHBBMIScreen: FC<KishoriHBBMIProps> = observer(function KishoriHBBMI({
  navigation,
}) {
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()

  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    KishoriControl,
    KishoriHandleSubmit,
    onSubmitKishoriReport,
    dateKishoriValue,
    callBackKishoridateSet,
    kishoriStatus,
    isLoadingKishori,
    getCurrentDate,
    isOpenWarninigModal,
    openWarningModal,
    closeToTheWarningModal,
    kishorError,
    executeKishorApi,
    kishorReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())
  const v: boolean = true
  useHeader({
    title: "किशोरी HB /BMI",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      kishoriStatus != 200 && kishorReset()
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
          yesFun={executeKishorApi}
          // yesFun={() => KishoriHandleSubmit(onSubmitKishoriReport)()}
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
          <Spinner visible={isLoadingKishori} textContent={""} textStyle={{ color: "#FFF" }} />
          <Box flex={1} alignItems="center" justifyContent="center" padding={responsiveWidth(1)}>
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
                      {dateFormatRequiredType(dateKishoriValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {kishoriStatus != 200 && (
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
                          onChangeMonth(event, month, callBackKishoridateSet)
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
                  एकुण किशोरी मुलींची संख्या 11 ते 19 वर्ष :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"total_girls"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
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
                  एकुण किशोरी मुलींपैकी HB तपासणी झालेल्या मुलींची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"hb_tested_girls"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={kishorError}
                  isDisabled={kishoriStatus == 200 ? true : false}
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
                  7 पेक्षा कमी HB असलेल्या किशोरी :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"less_than_seven_hb_girls"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
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
                  Iron sucrose injection घेतलेल्या किशोरी मुलींची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"iron_injections_taking"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={kishorError}
                  isDisabled={kishoriStatus == 200 ? true : false}
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
                  11 पेक्षा कमी HB असलेल्या किशोरी :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"hb_less_than_eleven"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
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
                  11 पेक्षा जास्त HB असलेल्या किशोरी संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"hb_greater_than_eleven"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
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
                  IFA tablet सेवन केलेल्या किशोरी मुलींची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"ifa_tablets_taking"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
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
                  आरोग्य तपासणी झालेल्या किशोरींची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"checkup_done"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
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
                  कमी बीएमआय असलेल्या किशोरीची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"low_bmi"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
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
                  दत्तक दिलेल्या किशोरी मुलींची संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={KishoriControl}
                  name={"adopted_total"}
                  placeholder={"मुली"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={kishoriStatus == 200 ? true : false}
                  errors={kishorError}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {kishoriStatus == 200 ? (
            <Box></Box>
          ) : kishoriStatus == 203 ? (
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
          ) : kishoriStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingKishori ? ( // Display the loader if isLoading is true
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <ActivityIndicator
                    size={70}
                    animating={true}
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
                  onPress={KishoriHandleSubmit(onSubmitKishoriReport)}
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
    zIndex: 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
})
