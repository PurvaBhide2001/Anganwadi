import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
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
import { ReportShowApi } from "../../api/ReportApi"
import { ActivityIndicator } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import { StyleSheet } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"

interface SuwMuwSudharnaProps extends AppStackScreenProps<"SuwMuwSudharna"> {}

export const SuwMuwSudharnaScreen: FC<SuwMuwSudharnaProps> = observer(function SuwMuwSudharna({
  navigation,
}) {
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    SuwMuwControl,
    SuwMuwHandleSubmit,
    onSubmitSuwMuw,
    dateSuwMuwValue,
    callBackSuwMuwdateSet,
    suwMuwStatus,
    isLoadingSuwNMuW,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    suwMuwError,
    executeSuwMuwApi,
    suwMuwReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  const file = require("../../../assets/govSchemeImages/1.png")
  useHeader({
    title: "SUW MUW सुधारणा",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      suwMuwStatus != 200 && suwMuwReset()
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
          yesFun={executeSuwMuwApi}
          // yesFun={() => SuwMuwHandleSubmit(onSubmitSuwMuw)()}
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
          padding={responsiveWidth(3)}
        >
          <Spinner visible={isLoadingSuwNMuW} textContent={""} textStyle={{ color: "#FFF" }} />
          <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
            <Box flex={1}>
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
                      {dateFormatRequiredType(dateSuwMuwValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {suwMuwStatus != 200 && (
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
                          onChangeMonth(event, month, callBackSuwMuwdateSet)
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
              alignContent="center"
              justifyContent={"center"}
              paddingY={responsiveWidth(3)}
            >
              <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"} bold>
                SUW MUW सुधारणा
              </Text>
            </Box>
          </Box>

          <Box flex={1} flexDirection="row">
            <Box flex={1} flexDirection="row">
              <Box
                flex={9}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                paddingY={responsiveWidth(3)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  MUW सुधारणा झालेली बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={SuwMuwControl}
                  name={"muw"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={suwMuwStatus == 200 ? true : false}
                  errors={suwMuwError}
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
                paddingY={responsiveWidth(3)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  SUW सुधारणा झालेली बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={SuwMuwControl}
                  name={"suw"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={suwMuwStatus == 200 ? true : false}
                  errors={suwMuwError}
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
                paddingY={responsiveWidth(3)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  SAM सुधारणा झालेली बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={SuwMuwControl}
                  name={"sam"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={suwMuwStatus == 200 ? true : false}
                  errors={suwMuwError}
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
                paddingY={responsiveWidth(3)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  MAM सुधारणा झालेली बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={SuwMuwControl}
                  name={"mam"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={suwMuwStatus == 200 ? true : false}
                  errors={suwMuwError}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {suwMuwStatus == 200 ? (
            <Box></Box>
          ) : suwMuwStatus == 203 ? (
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
          ) : suwMuwStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingSuwNMuW ? ( // Display the loader if isLoading is true
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
                    animating={isLoadingSuwNMuW}
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
                  onPress={SuwMuwHandleSubmit(onSubmitSuwMuw)}
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
    height: 80,
  },
})
