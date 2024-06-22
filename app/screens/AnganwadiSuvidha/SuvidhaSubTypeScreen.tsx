import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"
import { useHeader } from "../../utils/useHeader"
import AnganvadiSuvidhaModalComponent from "./AnganvadiSuvidhaModalComponent"

import SuvidhaSubTypeList from "./SuvidhaSubTypeList"
import { useCommanContextContext } from "../../Context/CommanContext"
import AlertModal from "../../components/AlertModal"

interface SuvidhaSubTypeProps extends AppStackScreenProps<"SuvidhaSubType"> {}

export const SuvidhaSubTypeScreen: FC<SuvidhaSubTypeProps> = observer(function SuvidhaSubType(
  _props,
) {
  const { isOpenModal, openModal, closeModal, cancelButton, submitData, subTypesList } =
    useAnganwadiSuvidhaContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const { isAlertModalOpen, alertMessage, color, closeAlertModal } = useCommanContextContext()
  useHeader({
    title: "अंगणवाडी सुविधा",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.5),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      navigate("AnganwadiSuvidhaTypes")
    },
    leftIcon: "back",
  })
  return (
    <LinearGradient
      colors={["#D7DAF2", "#F5D6E5"]}
      style={{
        width: "100%",
        height: "100%",
        padding: responsiveWidth(1),
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        style={{}}
        refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
      >
        <AlertModal alertText={alertMessage} isOpen={isAlertModalOpen} onClose={closeAlertModal} />

        <Modal
          maxWidth={responsiveWidth(300)}
          isShowModal={isOpenModal}
          closeModal={closeModal}
          cancelButton={cancelButton}
          submitButton={submitData}
          Component={AnganvadiSuvidhaModalComponent}
        />

        <SuvidhaSubTypeList />
      </ScrollView>
    </LinearGradient>
  )
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.micro,
  // paddingHorizontal: spacing.tiny,
  margin: 0,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
  textAlign: "center",
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
