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
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ActivityIndicator } from "react-native"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface VCDCReportProps extends AppStackScreenProps<"VCDCReport"> {}

export const VCDCReportScreen: FC<VCDCReportProps> = observer(function VCDCReport({ navigation }) {
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()

  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    VCDCControl,
    VCDCHandleSubmit,
    onSubmitVCDCReport,
    dateVcdcValue,
    callBackVcdcdateSet,
    vcdcStatus,
    isLoadingVcdc,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    vcdcError,
    executevcdcApi,
    vcdcReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  useHeader({
    title: "VCDC रिपोर्ट",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      vcdcStatus != 200 && vcdcReset()
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
          yesFun={executevcdcApi}
          // yesFun={() => VCDCHandleSubmit(onSubmitVCDCReport)()}
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
          <Spinner visible={isLoadingVcdc} textContent={""} textStyle={{ color: "#FFF" }} />
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
                      {dateFormatRequiredType(dateVcdcValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {vcdcStatus != 200 && (
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
                          onChangeMonth(event, month, callBackVcdcdateSet)
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
                  मागील महिन्यातील एकूण सॅम बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"total_sam"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  नियोजित ग्राम बाल विकास संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"niyojit_gram_balvikas_no"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  ग्राम बाल विकास केंद्रामध्ये दाखल बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"gram_vikas"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  SAM TO MAM :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"sam_to_mam"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  SAM TO NORMAL :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"sam_to_normal"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  वजनात वाढ झालेली परंतु श्रेणीत बदल न झालेली बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"vajanat_vadh"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  वजनात वाढ न झालेली बालके :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"vajanat_n_vadh"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={vcdcError}
                  isDisabled={vcdcStatus == 200 ? true : false}
                />
              </Box>
            </Box>
          </Box>
          {/* <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={9}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                  padding={responsiveWidth(2)}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    शिल्लक सॅम बालके :
                  </Text>
                </Box>
                <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={VCDCControl}
                    name={"remaining_sam"}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                    isDisabled={vcdcStatus == 200 ? true : false}
                  />
                </Box>
              </Box>
            </Box> */}
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
                  NRC मध्ये ADMIT SAM CHILD :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"nrc_sam"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  दुर्धर आजारी SAM बालक संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"durdhar_aajari_sam"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
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
                  0 ते 6 महिने SAM बालक संख्या :
                </Text>
              </Box>
              <Box flex={3} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={VCDCControl}
                  name={"zero_six_sam"}
                  placeholder={"बालके"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  isDisabled={vcdcStatus == 200 ? true : false}
                  errors={vcdcError}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {vcdcStatus == 200 ? (
            <Box></Box>
          ) : vcdcStatus == 203 ? (
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
          ) : vcdcStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingVcdc ? ( // Display the loader if isLoading is true
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
                  onPress={VCDCHandleSubmit(onSubmitVCDCReport)}
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
