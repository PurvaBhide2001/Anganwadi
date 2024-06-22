import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import InputField2 from "../../UI/InputField2"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ReportShowApi } from "../../api/ReportApi"
import { ActivityIndicator } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface BalAdharNondaniProps extends AppStackScreenProps<"BalAdharNondani"> {}

export const BalAdharNondaniScreen: FC<BalAdharNondaniProps> = observer(function BalAdharNondani({
  navigation,
}) {
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    AdharControl,
    AdharHandleSubmit,
    onSubmitAdharReport,
    dateAdharValue,
    callBackAdhardateSet,
    adharStatus,
    isLoading,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    adharHandleError,
    exectutePSEApi,
    executeAdharApi,
    adharReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  useHeader({
    title: "बाल आधार नोंदणी",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      adharStatus != 200 && adharReset()
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
          yesFun={executeAdharApi}
          // yesFun={AdharHandleSubmit(onSubmitAdharReport)}
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
          <Spinner visible={isLoading} textContent={""} textStyle={{ color: "#FFF" }} />
          <Box flex={1} alignItems="center" justifyContent="center" padding={responsiveWidth(2)}>
            <Box flex={1} flexDirection="row">
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
                      {dateFormatRequiredType(dateAdharValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {adharStatus != 200 && (
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
                          onChangeMonth(event, month, callBackAdhardateSet)
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

            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={9}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    सर्वेक्षित बालके 0 ते 6 वर्ष :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={AdharControl}
                    name={"total_kids"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={adharStatus == 200 ? true : false}
                    errors={adharHandleError}
                    errorMsg="please fill"
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
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    आधार कार्ड नोंदणी झालेले 0 ते 6 वर्ष बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={AdharControl}
                    name={"registered_kids"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={adharStatus == 200 ? true : false}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              alignItems={"flex-start"}
              paddingY={responsiveHeight(2)}
            >
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"}>
                गरोदर महिला
              </Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={9}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    नोंदणी केलेल्या गरोदर महिला :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={AdharControl}
                    name={"pregnent_womens"}
                    placeholder={"महिला"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={adharStatus == 200 ? true : false}
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
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    आधार कार्ड नोंदणी झालेल्या गरोदर महिला :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={AdharControl}
                    name={"registered_pregnent_womens"}
                    placeholder={"महिला"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={adharStatus == 200 ? true : false}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              flex={1}
              flexDirection="row"
              alignItems={"flex-start"}
              paddingY={responsiveHeight(2)}
            >
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"}>
                स्तनदा माता
              </Text>
            </Box>

            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  नोंदणी केलेल्या स्तनदा माता :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={AdharControl}
                  name={"breastfeeding_womens"}
                  placeholder={"माता"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={adharStatus == 200 ? true : false}
                />
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  आधार कार्ड नोंदणी झालेल्या स्तनदा माता :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={AdharControl}
                  name={"registered_breastfeeding_women"}
                  placeholder={"माता"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={adharStatus == 200 ? true : false}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {adharStatus == 200 ? (
            <Box></Box>
          ) : adharStatus == 203 ? (
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
          ) : adharStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoading ? ( // Display the loader if isLoading is true
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
                  onPress={AdharHandleSubmit(onSubmitAdharReport)}
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
