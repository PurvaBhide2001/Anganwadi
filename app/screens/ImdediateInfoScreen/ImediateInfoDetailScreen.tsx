import { observer } from "mobx-react-lite"
import { Box, Pressable, Radio, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useImdediateInfoContext } from "../../Context/ImdediateInfoContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"
import { useHeader } from "../../utils/useHeader"
import ImdediateInfoDetailItem from "./ImdediateInfoDetailItem"

import ImdediateInfoList from "./ImdediateInfoList"
import ImediateInfoModalComponent from "./ImediateInfoModalComponent"
import AlertModal from "../../components/AlertModal"
import { useCommanContextContext } from "../../Context/CommanContext"

interface ImediateInfoDetailScreenProps extends AppStackScreenProps<"ImediateDetail"> {}

export const ImediateInfoDetailScreen: FC<ImediateInfoDetailScreenProps> = observer(
  function ImediateInfoDetailScreen({ navigation }) {
    useHeader({
      title: "अंगणवाडी बांधकाम प्रगती",
      titleStyle: {
        fontStyle: "normal",
        fontSize: responsiveFontSize(2.5),
        fontWeight: "700",
        color: "#7d8592",
      },

      onLeftPress(event) {
        navigation.goBack()
      },
      leftIcon: "back",
    })
    const {
      imediateInfoObj,
      setValueOfSelectedRadioButton,
      valueOfSelectedRadioButton,
      cancelButton,
      closeModal,
      isShowModal,
      onSubmit,
      openModal,
      title,
    } = useImdediateInfoContext()
    const { alertMessage, isAlertModalOpen, closeAlertModal } = useCommanContextContext()
    const { onRefresh, refereshing } = useMainMenuContext()
    console.log("imediateInfoObj ", imediateInfoObj)

    return (
      <>
        <AlertModal alertText={alertMessage} isOpen={isAlertModalOpen} onClose={closeAlertModal} />
        <Modal
          maxWidth={responsiveWidth(400)}
          isShowModal={isShowModal}
          closeModal={closeModal}
          cancelButton={cancelButton}
          submitButton={onSubmit}
          Component={ImediateInfoModalComponent}
          title={title}
        />
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
            refreshControl={
              <RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />
            }
          >
            <Radio.Group
              flex={1}
              name="myRadioGroup"
              value={valueOfSelectedRadioButton}
              onChange={(nextValue) => {
                setValueOfSelectedRadioButton(nextValue)
              }}
            >
              <Box flex={1} flexDirection="column" width={responsiveScreenWidth(96)}>
                {imediateInfoObj?.map((item: any, i: number) => (
                  <ImdediateInfoDetailItem item={item} key={i} />
                ))}
              </Box>
            </Radio.Group>
            {/* </Screen> */}
          </ScrollView>
        </LinearGradient>
      </>
    )
  },
)

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
