import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import InputField2 from "../../UI/InputField2"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useReportContext } from "../../Context/ReportContext"
import { dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import MonthPicker from "react-native-month-year-picker"
import { ActivityIndicator } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface FinalHealthCheckupProps extends AppStackScreenProps<"FinalHealthCheckup"> {}

export const FinalHealthCheckupScreen: FC<FinalHealthCheckupProps> = observer(
  function FinalHealthCheckup({ navigation }) {
    const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
    const { onRefresh, refereshing } = useMainMenuContext()
    const {
      HealthControl,
      HealthHandleSubmit,
      onSubmitHealthCheckup,
      dateHealthCheckupValue,
      callBackHealthCheckupdateSet,
      healthStatus,
      isLoadingHC,
      getCurrentDate,
      isOpenWarninigModal,
      closeToTheWarningModal,
      openWarningModal,
      finalHealthError,
      executeFinalHealthCheckup,
      finalHealthCheckupReset,
    } = useReportContext()
    const [date, setDate] = useState(new Date())

    useHeader({
      title: "आरोग्य तपासणी",
      titleStyle: {
        fontStyle: "normal",
        fontSize: responsiveFontSize(2.3),
        fontWeight: "700",
        color: "#7d8592",
      },

      onLeftPress(event) {
        healthStatus != 200 && finalHealthCheckupReset()
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
            yesFun={executeFinalHealthCheckup}
            // yesFun={HealthHandleSubmit(onSubmitHealthCheckup)}
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
            <Spinner visible={isLoadingHC} textContent={""} textStyle={{ color: "#FFF" }} />
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
                        {dateFormatRequiredType(dateHealthCheckupValue, "YYYY-MM")}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      {healthStatus != 200 && (
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
                            onChangeMonth(event, month, callBackHealthCheckupdateSet)
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

              <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
                <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"}>
                  एकूण लाभार्थी
                </Text>
              </Box>
              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      0 ते 3 वर्ष :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"zero_three_beneficiary"}
                      placeholder={"बालके"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={healthStatus == 200 ? true : false}
                      errors={finalHealthError}
                    />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      3 ते 6 वर्ष :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"three_six_beneficiary"}
                      placeholder={"बालके"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={healthStatus == 200 ? true : false}
                      errors={finalHealthError}
                    />
                  </Box>
                </Box>
              </Box>
              <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
                <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"}>
                  आरोग्य तपासणी झालेले
                </Text>
              </Box>
              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      0 ते 3 वर्ष :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"zero_three_tested"}
                      placeholder={"बालके"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      errors={finalHealthError}
                      isDisabled={healthStatus == 200 ? true : false}
                    />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      3 ते 6 वर्ष :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"three_six_tested"}
                      placeholder={"बालके"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={healthStatus == 200 ? true : false}
                      errors={finalHealthError}
                    />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
                <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"}>
                  गरोदर महिला
                </Text>
              </Box>
              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      एकूण संख्या :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"pregnent_women"}
                      placeholder={"महिला"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={healthStatus == 200 ? true : false}
                      errors={finalHealthError}
                    />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      तपासणी झालेली संख्या :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"tested_pregnent_women"}
                      placeholder={"महिला"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={healthStatus == 200 ? true : false}
                      errors={finalHealthError}
                    />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
                <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"}>
                  स्तनदा माता
                </Text>
              </Box>
              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      एकूण संख्या :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"bresfeeding_women"}
                      placeholder={"माता"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={healthStatus == 200 ? true : false}
                      errors={finalHealthError}
                    />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="row">
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={6}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      तपासणी झालेली संख्या :
                    </Text>
                  </Box>
                  <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={HealthControl}
                      name={"tested_brestfeeding_women"}
                      placeholder={"माता"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={healthStatus == 200 ? true : false}
                      errors={finalHealthError}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
            {healthStatus == 200 ? (
              <Box></Box>
            ) : healthStatus == 203 ? (
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
            ) : healthStatus == 400 ? (
              <Box></Box>
            ) : (
              <React.Fragment>
                {isLoadingHC ? ( // Display the loader if isLoading is true
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
                    onPress={HealthHandleSubmit(onSubmitHealthCheckup)}
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
        {/* )} */}
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
