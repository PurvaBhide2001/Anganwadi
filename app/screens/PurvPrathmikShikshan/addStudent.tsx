import { observer } from "mobx-react-lite"
import { Box, Text, Spinner as SpinnerNative } from "native-base"
import React, { FC, useCallback, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { useBackHandler } from "@react-native-community/hooks"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { AppStackScreenProps, navigate, useBackButtonHandler } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import InputField2 from "../../UI/InputField2"
import { useLoginContext } from "../../Context/LoginContext"
import SelectDropdown3 from "../../UI/SelectDropdown3"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import AddressComponent from "../../components/AddressComponent"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { dateFormat, dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import { useStudentContextContext } from "../../Context/StudentContext"
import { useStudentAddContext } from "../../Context/StudentAddContext"
import { Image } from "react-native"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import Spinner from "react-native-loading-spinner-overlay"

interface AddStudentProps extends AppStackScreenProps<"AddStudent"> {}

export const AddStudentScreen: FC<AddStudentProps> = observer(function AddStudent({ navigation }) {
  onSubmit: Function
  const { gender } = usePurvPrathmikContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const { goBack } = navigation
  const { isExist } = useAnganwadiSuvidhaContext()
  const {
    studentControl,
    studentHandleSubmit,
    onSubmitStudentData,
    callBackShow1,
    callBackShow2,
    callBackShow3,
    show1,
    show2,
    show3,
    birthDateValue,
    admissionDateValue,
    passDateValue,
    callBackdateSet,
    callBackdateSet1,
    callBackdateSet2,
    studentWatch,
    isLoadingImage1,
    isLoadingImage2,
    imageName1,
    imageName2,
    exectuteLoaderImage1,
    exectuteLoaderImage2,
    setIsLoadingImage1,
    setIsLoadingImage2,
    setImageCallBack1,
    setImageCallBack2,
    studentError,
    isLoadingPage,
    resetDataForm,
    isUpdate,
    onUpdatedStudent,
  } = useStudentContextContext()

  const {
    onChange,
    mode,
    showDatePicker1,
    onChangeImage,
    onChangeImageFile,
    getResponseToTheUploadedFile,
  } = useCommanContextContext()

  useHeader({
    title: "लाभार्थी समाविष्ट करा",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      resetDataForm()
      navigation.goBack()
    },
    leftIcon: "back",
  })

  /**
   * hardware back handler btn
   */
  useBackHandler(
    useCallback(() => {
      goBack()
      resetDataForm()
      return true
    }, [goBack]),
  )
  return (
    <>
      <ScrollView
        style={{}}
        refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
      >
        <Box
          flex={1}
          flexDirection="column"
          height={"100%"}
          bg={"white"}
          padding={responsiveWidth(2)}
        >
          <Spinner visible={isLoadingPage} textContent={""} textStyle={{ color: "#FFF" }} />
          <Box flex={1} padding={responsiveWidth(2)}>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>लाभार्थ्यांचे नाव :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={studentControl}
                  name={"f_name"}
                  placeholder={"लाभार्थ्यांचे नाव प्रविष्ट करा"}
                  keyPadType={undefined}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={studentError}
                />
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>वडिलांचे नाव :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={studentControl}
                  name={"m_name"}
                  placeholder={"वडिलांचे नाव प्रविष्ट करा"}
                  keyPadType={undefined}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={studentError}
                />
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>आडनाव :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={studentControl}
                  name={"l_name"}
                  placeholder={"आडनाव प्रविष्ट करा"}
                  keyPadType={undefined}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={studentError}
                />
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>आईचे नाव :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={studentControl}
                  name={"mother_name"}
                  placeholder={"आईचे नाव प्रविष्ट करा"}
                  keyPadType={undefined}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={studentError}
                />
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>जन्मतारीख :</Text>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveHeight(1.5)}>
              <Box flex={11} alignItems="flex-start">
                <Text fontSize={responsiveFontSize(2.5)} color="grey">
                  {!birthDateValue
                    ? "0-00-0000"
                    : dateFormatRequiredType(birthDateValue, "YYYY-MM-DD")}
                </Text>
              </Box>
              <Box flex={1}>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(6),
                  }}
                  onPress={() => {
                    showDatePicker1(callBackShow1)
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={responsiveWidth(6)}
                    color="gray"
                  />
                </TouchableOpacity>

                {show1 && (
                  <RNDateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={birthDateValue || new Date()}
                    mode={mode}
                    display="default"
                    onChange={(datePickerEvent: any, date: any) => {
                      onChange(datePickerEvent, date, callBackdateSet, callBackShow1)
                    }}
                    positiveButton={{ label: "OK", textColor: "green" }}
                  />
                )}
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>लिंग :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row" alignItems="center">
                <Box
                  flex={1}
                  borderRadius={responsiveWidth(3)}
                  paddingBottom={responsiveHeight(1.5)}
                >
                  <SelectDropdown3
                    control={studentControl}
                    name={"gender"}
                    placeholder={"लिंग"}
                    listItem={gender}
                    label={"value"}
                    labelValue={"value"}
                    bgColor="white"
                    borderBottomColor="warmGray.300"
                    borderColor="white"
                    borderRadius={2}
                    borderWidth={0.3}
                    fontSize={2.2}
                    errors={studentError}
                  />
                </Box>
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>अंगणवाडीत प्रवेश करण्याची तारीख :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row" paddingY={responsiveHeight(1.5)}>
                <Box flex={11} alignItems="flex-start">
                  <Text fontSize={responsiveFontSize(2.5)} color="grey">
                    {!admissionDateValue
                      ? "0-00-0000"
                      : dateFormatRequiredType(admissionDateValue, "YYYY-MM-DD")}
                  </Text>
                </Box>
                <Box flex={1}>
                  <TouchableOpacity
                    style={{
                      width: responsiveWidth(6),
                    }}
                    onPress={() => {
                      showDatePicker1(callBackShow2)
                    }}
                  >
                    <MaterialCommunityIcons
                      name="calendar-month"
                      size={responsiveWidth(6)}
                      color="gray"
                    />
                  </TouchableOpacity>

                  {show2 && (
                    <RNDateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      value={admissionDateValue || new Date()}
                      mode={mode}
                      display="default"
                      onChange={(datePickerEvent: any, date: any) => {
                        onChange(datePickerEvent, date, callBackdateSet1, callBackShow2)
                      }}
                      positiveButton={{ label: "OK", textColor: "green" }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>वजन (किलो) :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={studentControl}
                  name={"weight"}
                  placeholder={"वजन प्रविष्ट करा"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={studentError}
                />
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>उंची (सेमी) :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={studentControl}
                  name={"height"}
                  placeholder={"उंची प्रविष्ट करा"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                  errors={studentError}
                />
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>अंगणवाडीतुन पास झाल्याची तारीख :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row" paddingY={responsiveHeight(1.5)}>
                <Box flex={11} alignItems="flex-start">
                  <Text fontSize={responsiveFontSize(2.5)} color="grey">
                    {/* {dateFormat(passDateValue)} */}
                    {!passDateValue
                      ? "0-00-0000"
                      : dateFormatRequiredType(passDateValue, "YYYY-MM-DD")}
                  </Text>
                </Box>
                <Box flex={1}>
                  <TouchableOpacity
                    style={{
                      width: responsiveWidth(6),
                    }}
                    onPress={() => {
                      showDatePicker1(callBackShow3)
                    }}
                  >
                    <MaterialCommunityIcons
                      name="calendar-month"
                      size={responsiveWidth(6)}
                      color="gray"
                    />
                  </TouchableOpacity>

                  {show3 && (
                    <RNDateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      value={passDateValue || new Date()}
                      mode={mode}
                      // is24Hour={true}
                      display="default"
                      onChange={(datePickerEvent: any, date: any) => {
                        onChange(datePickerEvent, date, callBackdateSet2, callBackShow3)
                      }}
                      positiveButton={{ label: "OK", textColor: "green" }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>सामील होण्याचा फोटो :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1}>
                <Box
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  padding={responsiveWidth(1)}
                >
                  <Box
                    flex={1}
                    height={responsiveHeight(15)}
                    width={responsiveWidth(28)}
                    borderRadius={responsiveWidth(2)}
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center"
                    bgColor="gray.200"
                  >
                    {isLoadingImage1 == false ? (
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyItems="center"
                        justifyContent="center"
                      >
                        {imageName1 && (
                          <Image
                            style={{ height: "100%", width: responsiveWidth(26) }}
                            source={{
                              uri: imageName1,
                            }}
                            resizeMode="cover"
                          />
                        )}
                      </Box>
                    ) : (
                      <SpinnerNative size="lg" />
                    )}
                  </Box>
                  <Text fontWeight="600" color="gray.500">
                    सामील होतानाचे छायाचित्र
                  </Text>
                </Box>
                <Box
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  padding={responsiveWidth(1)}
                  flexDirection="row"
                >
                  <Box flex={1} flexDirection="row">
                    <Box flex={2}> </Box>
                    <Box
                      flex={3}
                      height={responsiveHeight(10)}
                      width={responsiveWidth(17)}
                      borderRadius={responsiveWidth(2)}
                      padding={responsiveWidth(2)}
                    >
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <TouchableOpacity
                            disabled={isExist}
                            onPress={() => {
                              setIsLoadingImage1(true)
                              onChangeImageFile(
                                getResponseToTheUploadedFile,
                                setImageCallBack1,
                                exectuteLoaderImage1,
                              )
                            }}
                          >
                            <Image
                              style={{ height: responsiveHeight(8), width: responsiveWidth(6) }}
                              source={require("../../../assets/surveyimages/icon/camera.png")}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </Box>
                      </Box>
                    </Box>
                    <Box flex={3} borderRadius={responsiveWidth(2)}>
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <TouchableOpacity
                            disabled={isExist}
                            onPress={() => {
                              setIsLoadingImage1(true)
                              onChangeImage(
                                getResponseToTheUploadedFile,
                                setImageCallBack1,
                                exectuteLoaderImage1,
                              )
                            }}
                          >
                            <Image
                              style={{ height: responsiveHeight(8), width: responsiveWidth(6) }}
                              source={require("../../../assets/surveyimages/icon/gallery.png")}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </Box>
                      </Box>
                    </Box>
                    <Box flex={2}> </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"}>
              <Text fontSize={responsiveFontSize(2.3)}>पास आउट फोटो :</Text>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1}>
                <Box
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  padding={responsiveWidth(1)}
                >
                  <Box
                    flex={1}
                    height={responsiveHeight(15)}
                    width={responsiveWidth(28)}
                    borderRadius={responsiveWidth(2)}
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center"
                    bgColor="gray.200"
                  >
                    {isLoadingImage2 == false ? (
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyItems="center"
                        justifyContent="center"
                      >
                        {imageName2 && (
                          <Image
                            style={{ height: "100%", width: responsiveWidth(26) }}
                            source={{
                              uri: imageName2,
                            }}
                            resizeMode="cover"
                          />
                        )}
                      </Box>
                    ) : (
                      <SpinnerNative size="lg" />
                    )}
                  </Box>
                  <Text fontWeight="500" color="gray.500">
                    पास आउट छायाचित्र
                  </Text>
                </Box>
                <Box
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  padding={responsiveWidth(1)}
                  flexDirection="row"
                >
                  <Box flex={1} flexDirection="row">
                    <Box flex={2}> </Box>
                    <Box
                      flex={3}
                      height={responsiveHeight(10)}
                      width={responsiveWidth(17)}
                      borderRadius={responsiveWidth(2)}
                      padding={responsiveWidth(2)}
                    >
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <TouchableOpacity
                            disabled={isExist}
                            onPress={() => {
                              setIsLoadingImage2(true)
                              onChangeImageFile(
                                getResponseToTheUploadedFile,
                                setImageCallBack2,
                                exectuteLoaderImage2,
                              )
                            }}
                          >
                            <Image
                              style={{ height: responsiveHeight(8), width: responsiveWidth(6) }}
                              source={require("../../../assets/surveyimages/icon/camera.png")}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </Box>
                      </Box>
                    </Box>
                    <Box flex={3} borderRadius={responsiveWidth(2)}>
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <TouchableOpacity
                            disabled={isExist}
                            onPress={() => {
                              setIsLoadingImage2(true)
                              onChangeImage(
                                getResponseToTheUploadedFile,
                                setImageCallBack2,
                                exectuteLoaderImage2,
                              )
                            }}
                          >
                            <Image
                              style={{ height: responsiveHeight(8), width: responsiveWidth(6) }}
                              source={require("../../../assets/surveyimages/icon/gallery.png")}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </Box>
                      </Box>
                    </Box>
                    <Box flex={2}> </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <AddressComponent watch={studentWatch} control={studentControl} errors={studentError} />
          </Box>
        </Box>
        <Box flex={2} flexDirection="row" justifyContent={"flex-end"}>
          {!isUpdate ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#669df6",
                width: "100%",
                justifyContent: "center",
              }}
              onPress={studentHandleSubmit(onSubmitStudentData)}
            >
              <Text
                textAlign="center"
                color={"white"}
                justifyContent="center"
                fontSize={responsiveFontSize(2.5)}
                padding={responsiveWidth(1)}
                bold
              >
                सबमिट करा
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#669df6",
                width: "100%",
                justifyContent: "center",
              }}
              onPress={studentHandleSubmit(onUpdatedStudent)}
            >
              <Text
                textAlign="center"
                color={"white"}
                justifyContent="center"
                fontSize={responsiveFontSize(2.5)}
                padding={responsiveWidth(1)}
                bold
              >
                अपडेट करा
              </Text>
            </TouchableOpacity>
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
