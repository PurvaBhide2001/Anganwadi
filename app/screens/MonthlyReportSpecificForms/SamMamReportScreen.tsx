import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import InputField2 from "../../UI/InputField2"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import RadioButtonController from "../../UI/RadioButtonController"
import { ReportShowApi } from "../../api/ReportApi"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface SamMamReportProps extends AppStackScreenProps<"SamMamReport"> {}

export const SamMamReportScreen: FC<SamMamReportProps> = observer(function SamMamReport({
  navigation,
}) {
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    SamMamControl,
    SamMamHandleSubmit,
    onSubmitSamMam,
    getCurrentDate,
    samMamStatus,
    isLoadingSamMam,
    callBackSamMamdateSet,
    dateSamMamValue,
    isOpenWarninigModal,
    closeToTheWarningModal,
    samMamError,
    executeSamMamApi,
    samMamReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  useHeader({
    title: "सॅम मॅम रिपोर्ट",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      samMamStatus != 200 && samMamReset()
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
          yesFun={executeSamMamApi}
          // yesFun={() => SamMamHandleSubmit(onSubmitSamMam)()}
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
          <Spinner visible={isLoadingSamMam} textContent={""} textStyle={{ color: "#FFF" }} />
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
                      {dateFormatRequiredType(dateSamMamValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {samMamStatus != 200 && (
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
                          onChangeMonth(event, month, callBackSamMamdateSet)
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
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                सर्व्हेक्षित बालके
              </Text>
            </Box>

            <Box flex={1} flexDirection={"row"}>
              <Box flex={7}>
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  अंगणवाडीत सॅम बालके आहेत का ?
                </Text>
              </Box>
              <Box flex={5} borderRadius={responsiveWidth(3)}>
                <RadioButtonController
                  control={SamMamControl}
                  name={"is_sam"}
                  isDisabled={samMamStatus == 200 ? true : false}
                  defaultValue={"0"}
                />
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
                    मागील महिना शिल्लक सॅम बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"sam_last_month"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
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
                    सॅम मधुन मॅम मध्ये गेलेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"sam_to_mam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
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
                    सॅम मधुन नॉर्मल मध्ये गेलेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"sam_to_normal"}
                    placeholder={"बालके "}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                सॅम बालकांची सुधारणा
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
                    वजनात वाढ झालेली परंतू श्रेणीत बदल न झालेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"weight_gained"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
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
                    वजनात वाढ न झालेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"weight_not_gained"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                एकुण सॅम बालके
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
                    नवीन सॅम बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"new_sam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                मॅम
              </Text>
            </Box>

            <Box flex={1} flexDirection={"row"}>
              <Box flex={7}>
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  अंगणवाडीत मॅम बालके आहेत का ?
                </Text>
              </Box>
              <Box flex={5} borderRadius={responsiveWidth(3)}>
                <RadioButtonController
                  control={SamMamControl}
                  name={"is_mam"}
                  isDisabled={samMamStatus == 200 ? true : false}
                  defaultValue={"0"}
                  errors={samMamError}
                />
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
                    मागील महिना शिल्लक मॅम बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"last_month_mam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
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
                    मॅम मधुन नॉर्मल मध्ये गेलेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"mam_to_normal"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                मॅम बालकांची सुधारणा
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
                    वजनात वाढ झालेली परंतू श्रेणीत बदल न झालेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"weight_gained_mam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
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
                    वजनात वाढ न झालेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"weight_not_gained_mam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
                  />
                </Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" alignItems={"flex-start"}>
              <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                एकूण मॅम बालके
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
                    सॅम मधुन मॅम मध्ये गेलेली बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"total_sam_to_mam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
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
                    नवीन मॅम बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={SamMamControl}
                    name={"total_new_mam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={samMamStatus == 200 ? true : false}
                    errors={samMamError}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {samMamStatus == 200 ? (
            <Box></Box>
          ) : samMamStatus == 203 ? (
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
          ) : samMamStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingSamMam ? ( // Display the loader if isLoading is true
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
                  onPress={SamMamHandleSubmit(onSubmitSamMam)}
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
