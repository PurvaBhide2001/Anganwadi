import { observer } from "mobx-react-lite"
import { Box, Text, View, Radio } from "native-base"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import InputField2 from "../../UI/InputField2"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ActivityIndicator } from "react-native"
import { Controller } from "react-hook-form"
import WarningModal2 from "../../components/WarningModal2"
import Spinner from "react-native-loading-spinner-overlay"

interface WashroomInfoProps extends AppStackScreenProps<"WashroomInfo"> {}

export const WashroomInfoScreen: FC<WashroomInfoProps> = observer(function WashroomInfo({
  navigation,
}) {
  onSubmit: Function
  const { onChangeMonth, showMonthPicker, showMonth } = useCommanContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    ToiletControl,
    ToiletHandleSubmit,
    onSubmitShauchalayBandhkam,
    dateToiletValue,
    callBackToiletdateSet,
    shauchalayStatus,
    isLoadingToilet,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    toiletError,
    executeToiletApi,
    toiletReset,
  } = useReportContext()
  const [date, setDate] = useState(new Date())

  const [selectedOptionAvailable, setSelectedOptionAvailable] = useState("")
  const [selectedOptionUnrepaired, setSelectedOptionUnrepaired] = useState("1")
  const [selectedOptionFifteenAyogNew, setSelectedOptionFifteenAyogNew] = useState("1")
  const [selectedOptionFifteenAyogCompleted, setSelectedOptionFifteenAyogCompleted] = useState("1")

  const handleOptionSelect = (groupName, selectedValue) => {
    if (groupName === "is_anganwadi_with_toilets") {
      setSelectedOptionAvailable(selectedValue)
    } else if (groupName === "is_anganwadi_with_unrepaired_toilets") {
      setSelectedOptionUnrepaired(selectedValue)
    } else if (groupName === "is_fifteen_ayog_new_toilets") {
      setSelectedOptionFifteenAyogNew(selectedValue)
    } else if (groupName === "is_fifteen_ayog_completed_toilets") {
      setSelectedOptionFifteenAyogCompleted(selectedValue)
    }
  }
  useHeader({
    title: "शौचालय बांधकाम व दुरुस्ती",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      shauchalayStatus != 200 && toiletReset()
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
          yesFun={executeToiletApi}
          // yesFun={() => ToiletHandleSubmit(onSubmitShauchalayBandhkam)()}
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
          <Spinner visible={isLoadingToilet} textContent={""} textStyle={{ color: "#FFF" }} />
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
                      {dateFormatRequiredType(dateToiletValue, "YYYY-MM")}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    {shauchalayStatus != 200 && (
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
                          onChangeMonth(event, month, callBackToiletdateSet)
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

          {shauchalayStatus == 200 ? (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  आपल्या अंगणवाडी केंद्रामध्ये शौचालय आहे का ?
                </Text>
                <Box flex={1} flexDirection="row">
                  <Box
                    flex={4}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                    padding={responsiveWidth(2)}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      शौचालय संख्या :
                    </Text>
                  </Box>
                  <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={ToiletControl}
                      name={"anganwadi_with_toilets"}
                      placeholder={"शौचालय"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={shauchalayStatus == 200 ? true : false}
                      defaultValue={shauchalayStatus == 200 ? "" : "0"}
                      errors={toiletError}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  आपल्या अंगणवाडी केंद्रामध्ये शौचालय आहे का ?
                </Text>
                <Controller
                  control={ToiletControl}
                  name="is_anganwadi_with_toilets"
                  // defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <Radio.Group
                      name="options"
                      flex={1}
                      flexDirection="row"
                      // value={selectedOptionAvailable}
                      value={value ? "0" : "1"}
                      onChange={(selectedValue) => {
                        onChange(selectedValue === "0")
                        handleOptionSelect("is_anganwadi_with_toilets", selectedValue)
                      }}
                    >
                      <Box flex={4} paddingLeft={responsiveWidth(8)}>
                        <Radio value="0">
                          <Text color="warmGray.500">होय</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)} paddingLeft={responsiveWidth(8)}>
                        <Radio value="1">
                          <Text color="warmGray.500">नाही</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)}></Box>
                    </Radio.Group>
                  )}
                />
                {toiletError["is_anganwadi_with_toilets"] && (
                  <Text>{toiletError["is_anganwadi_with_toilets"].message}</Text>
                )}
                {selectedOptionAvailable === "0" && (
                  <Box flex={1} flexDirection="row">
                    <Box
                      flex={4}
                      borderRadius={responsiveWidth(3)}
                      alignContent="flex-end"
                      justifyContent={"center"}
                      padding={responsiveWidth(2)}
                    >
                      <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                        शौचालय संख्या :
                      </Text>
                    </Box>
                    <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={ToiletControl}
                        name={"anganwadi_with_toilets"}
                        placeholder={"शौचालय"}
                        keyPadType={"phone-pad"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isDisabled={shauchalayStatus == 200 ? true : false}
                        errors={toiletError}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
          {shauchalayStatus == 200 ? (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  अंगणवाडी केंद्रामधील शौचालय नादुरुस्त आहे का ?
                </Text>

                <Box flex={1} flexDirection="row">
                  <Box
                    flex={4}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                    padding={responsiveWidth(2)}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      शौचालय संख्या :
                    </Text>
                  </Box>
                  <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={ToiletControl}
                      name={"anganwadi_unrepaired_toilets"}
                      placeholder={"शौचालय"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={shauchalayStatus == 200 ? true : false}
                      defaultValue={shauchalayStatus == 200 ? "" : "0"}
                      errors={toiletError}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  अंगणवाडी केंद्रामधील शौचालय नादुरुस्त आहे का ?
                </Text>
                <Controller
                  control={ToiletControl}
                  name="is_anganwadi_with_unrepaired_toilets"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <Radio.Group
                      name="options"
                      flex={1}
                      flexDirection="row"
                      // value={selectedOptionUnrepaired}
                      value={value ? "0" : "1"}
                      onChange={(selectedValue) => {
                        onChange(selectedValue === "0")
                        handleOptionSelect("is_anganwadi_with_unrepaired_toilets", selectedValue)
                      }}
                    >
                      <Box flex={4} paddingLeft={responsiveWidth(8)}>
                        <Radio value="0">
                          <Text color="warmGray.500">होय</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)} paddingLeft={responsiveWidth(8)}>
                        <Radio value="1">
                          <Text color="warmGray.500">नाही</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)}></Box>
                    </Radio.Group>
                  )}
                />
                {toiletError["is_anganwadi_with_unrepaired_toilets"] && (
                  <Text>{toiletError["is_anganwadi_with_unrepaired_toilets"]?.message}</Text>
                )}
                {selectedOptionUnrepaired === "0" && (
                  <Box flex={1} flexDirection="row">
                    <Box
                      flex={4}
                      borderRadius={responsiveWidth(3)}
                      alignContent="flex-end"
                      justifyContent={"center"}
                      padding={responsiveWidth(2)}
                    >
                      <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                        शौचालय संख्या :
                      </Text>
                    </Box>
                    <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={ToiletControl}
                        name={"anganwadi_unrepaired_toilets"}
                        placeholder={"शौचालय"}
                        keyPadType={"phone-pad"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isDisabled={shauchalayStatus == 200 ? true : false}
                        errors={toiletError}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {shauchalayStatus == 200 ? (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  15 वा वित्त आयोगातून नवीन शौचालय प्रस्तावीत आहे का ?
                </Text>

                <Box flex={1} flexDirection="row">
                  <Box
                    flex={4}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                    padding={responsiveWidth(2)}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      शौचालय संख्या :
                    </Text>
                  </Box>
                  <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={ToiletControl}
                      name={"fifteen_ayog_new_toilets"}
                      placeholder={"शौचालय"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={shauchalayStatus == 200 ? true : false}
                      defaultValue={shauchalayStatus == 200 ? "" : "0"}
                      errors={toiletError}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  15 वा वित्त आयोगातून नवीन शौचालय प्रस्तावीत आहे का ?
                </Text>
                <Controller
                  control={ToiletControl}
                  name="is_fifteen_ayog_new_toilets"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <Radio.Group
                      name="options"
                      flex={1}
                      flexDirection="row"
                      // value={selectedOptionFifteenAyogNew}
                      value={value ? "0" : "1"}
                      onChange={(selectedValue) => {
                        onChange(selectedValue === "0")
                        handleOptionSelect("is_fifteen_ayog_new_toilets", selectedValue)
                      }}
                    >
                      <Box flex={4} paddingLeft={responsiveWidth(8)}>
                        <Radio value="0">
                          <Text color="warmGray.500">होय</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)} paddingLeft={responsiveWidth(8)}>
                        <Radio value="1">
                          <Text color="warmGray.500">नाही</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)}></Box>
                    </Radio.Group>
                  )}
                />
                {toiletError["is_fifteen_ayog_new_toilets"] && (
                  <Text>{toiletError["is_fifteen_ayog_new_toilets"]?.message}</Text>
                )}
                {selectedOptionFifteenAyogNew === "0" && (
                  <Box flex={1} flexDirection="row">
                    <Box
                      flex={4}
                      borderRadius={responsiveWidth(3)}
                      alignContent="flex-end"
                      justifyContent={"center"}
                      padding={responsiveWidth(2)}
                    >
                      <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                        शौचालय संख्या :
                      </Text>
                    </Box>
                    <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={ToiletControl}
                        name={"fifteen_ayog_new_toilets"}
                        placeholder={"शौचालय"}
                        keyPadType={"phone-pad"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isDisabled={shauchalayStatus == 200 ? true : false}
                        errors={toiletError}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {shauchalayStatus == 200 ? (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  15 वा वित्त आयोगातून नवीन प्रस्तावीत शौचालय बांधकाम पूर्ण झाले आहे का ?
                </Text>

                <Box flex={1} flexDirection="row">
                  <Box
                    flex={4}
                    borderRadius={responsiveWidth(3)}
                    alignContent="flex-end"
                    justifyContent={"center"}
                    padding={responsiveWidth(2)}
                  >
                    <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                      शौचालय संख्या :
                    </Text>
                  </Box>
                  <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                    <InputField2
                      control={ToiletControl}
                      name={"fifteen_ayog_completed_toilets"}
                      placeholder={"शौचालय"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isDisabled={shauchalayStatus == 200 ? true : false}
                      defaultValue={shauchalayStatus == 200 ? "" : "0"}
                      errors={toiletError}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  15 वा वित्त आयोगातून नवीन प्रस्तावीत शौचालय बांधकाम पूर्ण झाले आहे का ?
                </Text>
                <Controller
                  control={ToiletControl}
                  name="is_fifteen_ayog_completed_toilets"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <Radio.Group
                      name="options"
                      flex={1}
                      flexDirection="row"
                      // value={selectedOptionFifteenAyogCompleted}
                      value={value ? "0" : "1"}
                      onChange={(selectedValue) => {
                        onChange(selectedValue === "0")
                        handleOptionSelect("is_fifteen_ayog_completed_toilets", selectedValue)
                      }}
                    >
                      <Box flex={4} paddingLeft={responsiveWidth(8)}>
                        <Radio value="0">
                          <Text color="warmGray.500">होय</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)} paddingLeft={responsiveWidth(8)}>
                        <Radio value="1">
                          <Text color="warmGray.500">नाही</Text>
                        </Radio>
                      </Box>
                      <Box flex={4} paddingY={responsiveWidth(1)}></Box>
                    </Radio.Group>
                  )}
                />
                {toiletError["is_fifteen_ayog_completed_toilets"] && (
                  <Text>{toiletError["is_fifteen_ayog_completed_toilets"]?.message}</Text>
                )}
                {selectedOptionFifteenAyogCompleted === "0" && (
                  <Box flex={1} flexDirection="row">
                    <Box
                      flex={4}
                      borderRadius={responsiveWidth(3)}
                      alignContent="flex-end"
                      justifyContent={"center"}
                      padding={responsiveWidth(2)}
                    >
                      <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                        शौचालय संख्या :
                      </Text>
                    </Box>
                    <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                      <InputField2
                        control={ToiletControl}
                        name={"fifteen_ayog_completed_toilets"}
                        placeholder={"शौचालय"}
                        keyPadType={"phone-pad"}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isDisabled={shauchalayStatus == 200 ? true : false}
                        errors={toiletError}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>

        <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
          {shauchalayStatus == 200 ? (
            <Box></Box>
          ) : shauchalayStatus == 203 ? (
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
          ) : shauchalayStatus == 400 ? (
            <Box></Box>
          ) : (
            <React.Fragment>
              {isLoadingToilet ? ( // Display the loader if isLoading is true
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
                  onPress={ToiletHandleSubmit(onSubmitShauchalayBandhkam)}
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
