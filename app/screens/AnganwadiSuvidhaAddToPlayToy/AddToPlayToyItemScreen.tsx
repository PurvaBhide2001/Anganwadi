import { observer } from "mobx-react-lite"
import { Box, Text, Icon } from "native-base"

import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { Fab } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import { Button, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useLoginContext } from "../../Context/LoginContext"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"
import { useHeader } from "../../utils/useHeader"
import PlayToyList from "./PlayToyList"
import { usePlayingToysContext } from "../../Context/PlayingToysContext"
import AddPlayToyItemModal from "./AddPlayToyItemModal"
import WarningModal from "../../components/WarningModal"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import AlertModal from "../../components/AlertModal"
import { useCommanContextContext } from "../../Context/CommanContext"
interface AddToPlayToyItemProps extends AppStackScreenProps<"AddToPlayToyItem"> {}

export const AddToPlayToyItemScreen: FC<AddToPlayToyItemProps> = observer(
  function AddToPlayToyItem({ navigation, route }) {
    const {
      closeToPlayModal,
      isOpenPlayModal,
      openToPlayModal,
      onAddToToy,
      isWarningModalOpen,
      closeWarningModal,
      yesToDeleteToyItem,
      deleteBtnName,
      deleteMessage,
      cancelBtnName,
    } = usePlayingToysContext()
    const { closeAlertModal, alertMessage, openAlertModal, isAlertModalOpen } =
      useCommanContextContext()
    const { onRefresh, refereshing } = useMainMenuContext()
    useHeader({
      title: "खेळणी जोडा",
      titleStyle: {
        fontStyle: "normal",
        fontSize: responsiveFontSize(2.5),
        fontWeight: "700",
        color: "#7d8592",
      },

      onLeftPress(event) {
        navigation.goBack()
        console.log("event")
      },
      leftIcon: "back",
    })
    return (
      <>
        <AlertModal alertText={alertMessage} isOpen={isAlertModalOpen} onClose={closeAlertModal} />
        <Modal
          maxWidth={responsiveWidth(100)}
          isShowModal={isOpenPlayModal}
          closeModal={closeToPlayModal}
          cancelButton={closeToPlayModal}
          submitButton={onAddToToy}
          Component={AddPlayToyItemModal}
        />
        <WarningModal
          message={deleteMessage}
          isOpen={isWarningModalOpen}
          closeModal={closeWarningModal}
          maxH={"212"}
          yesToDelete={yesToDeleteToyItem}
          yesToDeleteName={deleteBtnName}
          cancelToDeleteName={cancelBtnName}
          cancelToDelete={closeWarningModal}
          title={"खात्री करा"}
          size={"md"}
        />
        <LinearGradient
          colors={["#D7DAF2", "#F5D6E5"]}
          style={{
            flex: 1,
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
            <Box flex={1} flexDirection="column">
              <Box flex={1}>
                {/* <Fab
                  onPress={() => {
                    openToPlayModal()
                  }}
                  // bottom={responsiveHeight(10)}
                  size="sm"
                  icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
                /> */}
                <Box style={{ flex: 1 }} flexDirection="row" padding={responsiveWidth(0.4)}>
                  <Box flex={8}> </Box>
                  <Box flex={4}>
                    <TouchableOpacity
                      onPress={() => {
                        openToPlayModal()
                      }}
                      style={{
                        height: responsiveHeight(5),
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: responsiveWidth(1),
                        backgroundColor: "#e9696e",
                        borderRadius: responsiveWidth(2),
                      }}
                    >
                      <Text
                        textAlign="center"
                        color={"white"}
                        justifyContent="center"
                        fontSize={responsiveFontSize(2.1)}
                      >
                        खेळणी जोडा
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
              <Box flex={11}>
                <PlayToyList />
              </Box>
            </Box>
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
