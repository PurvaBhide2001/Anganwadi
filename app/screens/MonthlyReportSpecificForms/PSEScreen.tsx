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
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ReportApi, ReportShowApi } from "../../api/ReportApi"
import { ActivityIndicator } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface PSEProps extends AppStackScreenProps<"PSE"> {}

export const PSEScreen: FC<PSEProps> = observer(function PSE({ navigation }) {
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const {
    onSubmitPSEData,
    PSEControl,
    PSEHandleSubmit,
    callBackPsedateSet,
    dateValue,
    pseStatus,
    isLoadingPse,
    datePseValue,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    exectutePSEApi,
    PSEErrors,
    pseReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  useHeader({
    title: "अंगणवाडी केंद्रात पुर्व शालेय शि.घेत असलेल्या लाभार्थ्यांची वयोगटनिहाय संख्या",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      pseStatus != 200 && pseReset()
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
          // yesFun={() => PSEHandleSubmit(onSubmitPSEData)()}
          yesFun={exectutePSEApi}
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
          <Spinner visible={isLoadingPse} textContent={""} textStyle={{ color: "#FFF" }} />
          <Box flex={1} alignItems="center" justifyContent="center" padding={responsiveWidth(2)}>
            <Box flex={1} flexDirection="row">
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
                        {dateFormatRequiredType(datePseValue, "YYYY-MM")}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      {pseStatus != 200 && (
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
                            onChangeMonth(event, month, callBackPsedateSet)
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
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    3 वर्ष ते 4 वर्ष वयोगटातील लाभार्थी संख्या :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={PSEControl}
                    name={"three_to_four"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={pseStatus == 200 ? true : false}
                    errors={PSEErrors}
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
                    4 वर्ष ते 5 वर्ष वयोगटातील लाभार्थी संख्या :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={PSEControl}
                    name={"four_to_five"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={pseStatus == 200 ? true : false}
                    errors={PSEErrors}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
                <Box
                  flex={9}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    5 वर्ष ते 6 वर्ष वयोगटातील लाभार्थी संख्या :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={PSEControl}
                    name={"five_to_six"}
                    placeholder={"बालके "}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={pseStatus == 200 ? true : false}
                    errors={PSEErrors}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {pseStatus == 200 ? (
            <Box></Box>
          ) : pseStatus == 203 ? (
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
          ) : pseStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingPse ? ( // Display the loader if isLoading is true
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <ActivityIndicator size={70} color={"#669df6"} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#669df6",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onPress={PSEHandleSubmit(onSubmitPSEData)}
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
