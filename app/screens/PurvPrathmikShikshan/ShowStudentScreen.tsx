import { observer } from "mobx-react-lite"
import { Box, Text, View } from "native-base"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
import { useCommanContextContext } from "../../Context/CommanContext"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
import InputField2 from "../../UI/InputField2"
import { useReportContext } from "../../Context/ReportContext"
import MonthPicker from "react-native-month-year-picker"
import { ActivityIndicator } from "react-native"
import ShowStudentList from "./showStudentList"
import Modal from "../../theme/Modal"
import { useStudentContextContext } from "../../Context/StudentContext"
import StudentDetailModal from "./StudentDetailModal"
import WarningModal from "../../components/WarningModal"
import {
  AnganwadiEmployeeContextProvider,
  useAnganwadiEmployeeContext,
} from "../../Context/AnganwadiEmployeeContext"

interface ShowStudentProps extends AppStackScreenProps<"ShowStudent"> {}

export const ShowStudentScreen: FC<ShowStudentProps> = observer(function ShowStudent({
  navigation,
}) {
  onSubmit: Function

  const { onRefresh, refereshing } = useMainMenuContext()
  const {
    isOpenStudentModal,
    closeStudentModal,
    yesToDeleteStudentItem,
    deleteMessage,
    isWarningModalOpen,
    closeWarningModal,
  } = useStudentContextContext()
  const { deleteBtnName, cancelBtnName } = useAnganwadiEmployeeContext()
  useHeader({
    title: "विद्यार्थी बघा",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.3),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
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
        <Modal
          maxWidth={responsiveWidth(100)}
          isShowModal={isOpenStudentModal}
          closeModal={closeStudentModal}
          cancelButton={closeStudentModal}
          Component={StudentDetailModal}
        />
        <WarningModal
          message={deleteMessage}
          isOpen={isWarningModalOpen}
          closeModal={closeWarningModal}
          maxH={"212"}
          yesToDelete={yesToDeleteStudentItem}
          yesToDeleteName={deleteBtnName}
          cancelToDeleteName={cancelBtnName}
          cancelToDelete={closeWarningModal}
          title={"खात्री करा"}
          size={"md"}
        />
        <Box flex={1}>
          <ShowStudentList />
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
