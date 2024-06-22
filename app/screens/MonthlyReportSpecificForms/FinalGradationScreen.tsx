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
import { dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ReportShowApi } from "../../api/ReportApi"
import { ActivityIndicator } from "react-native"
import WarningModal from "../../components/WarningModal"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface FinalGradationProps extends AppStackScreenProps<"FinalGradation"> {}

export const FinalGradationScreen: FC<FinalGradationProps> = observer(function FinalGradation({
  navigation,
}) {
  const [language, setLanguage] = useState("")
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    NutritionControl,
    NutritionHandleSubmit,
    onSubmitNutritionReport,
    nutritionStatus,
    isLoadingNutrition,
    dateFGValue,
    callBackFGdateSet,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    nutritionsError,
    executeNutritionApi,
    nutritionReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  useHeader({
    title: "पोषणस्थिती 0 ते ६ वर्ष श्रेणी अहवाल",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      nutritionStatus != 200 && nutritionReset()
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
          yesFun={executeNutritionApi}
          // yesFun={() => NutritionHandleSubmit(onSubmitNutritionReport)()}
          yesName={"हो"}
          cancelName={"नाही"}
          cancelFun={closeToTheWarningModal}
          title={"खात्री करा"}
          // title={""} // yesToDelete={yesToDeleteEmployeeItem}
          // yesToDeleteName={deleteBtnName}
          // cancelToDeleteName={cancelBtnName}
          // cancelToDelete={closeWarningModal}
          size={"md"}
        />
        <Box
          flex={1}
          flexDirection="column"
          height={"100%"}
          bg={"white"}
          padding={responsiveWidth(2)}
        >
          <Spinner visible={isLoadingNutrition} textContent={""} textStyle={{ color: "#FFF" }} />
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
                      {dateFormatRequiredType(dateFGValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {nutritionStatus != 200 ? (
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
                    ) : (
                      ""
                    )}
                    {showMonth && (
                      <MonthPicker
                        onChange={(event: any, month) => {
                          onChangeMonth(event, month, callBackFGdateSet)
                        }}
                        value={date}
                        // minimumDate={new Date(2023, 3)}
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
                    0 ते 6 वर्ष वयोगटातील सर्व बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={NutritionControl}
                    name={"zero_to_six_agegroup"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={nutritionStatus == 200 ? true : false}
                    errors={nutritionsError}
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
                    अहवाल महिन्यात वजन घेतलेली 0 ते 6 वर्ष बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={NutritionControl}
                    name={"total_weighted"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={nutritionStatus == 200 ? true : false}
                    errors={nutritionsError}
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
                    पैकी सर्व साधारण :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={NutritionControl}
                    name={"normal_weighted"}
                    placeholder={"बालके "}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={nutritionStatus == 200 ? true : false}
                    errors={nutritionsError}
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
                    कमी वजनाचे (- 2SD ) :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={NutritionControl}
                    name={"less_weighted"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={nutritionStatus == 200 ? true : false}
                    errors={nutritionsError}
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
                    तीव्र कमी वजनाचे (-3SD) :
                  </Text>
                </Box>

                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={NutritionControl}
                    name={"over_weighted"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={nutritionStatus == 200 ? true : false}
                    errors={nutritionsError}
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
                    सॅम :
                  </Text>
                </Box>

                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={NutritionControl}
                    name={"SAM"}
                    placeholder={"बालके "}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={nutritionStatus == 200 ? true : false}
                    errors={nutritionsError}
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
                    मॅम :
                  </Text>
                </Box>
                <Box
                  flex={3}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={NutritionControl}
                    name={"MAM"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={nutritionStatus == 200 ? true : false}
                    errors={nutritionsError}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {nutritionStatus == 200 ? (
            <Box></Box>
          ) : nutritionStatus == 203 ? (
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
          ) : nutritionStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingNutrition ? ( // Display the loader if isLoading is true
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
                  onPress={NutritionHandleSubmit(onSubmitNutritionReport)}
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
