import { observer } from "mobx-react-lite"
import { Box, Image, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { styleData } from "../../../assets/constant/styleData"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"
import { useHeader } from "../../utils/useHeader"
import AnganvadiSuvidhaModalComponent from "./AnganvadiSuvidhaModalComponent"
import AlertModal from "../../components/AlertModal"
import { useCommanContextContext } from "../../Context/CommanContext"

interface ShowParticularSuvidhaProps extends AppStackScreenProps<"ShowParticularSuvidha"> {}

export const ShowParticularSuvidhaScreen: FC<ShowParticularSuvidhaProps> = observer(
  function ShowParticularSuvidha({ navigation }) {
    const {
      isOpenModal,
      openModal,
      closeModal,
      cancelButton,
      submitData,
      particularSuvidha,
      isAlreadyFill,
    } = useAnganwadiSuvidhaContext()
    const { isAlertModalOpen, alertMessage, color, closeAlertModal } = useCommanContextContext()
    useHeader({
      title: particularSuvidha?.title,
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
    return (
      <LinearGradient
        colors={["#ffffff", "#ffffff"]}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          padding: responsiveWidth(1),
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
        <Box
          flex={1}
          height="100%"
          width={"100%"}
          padding={responsiveWidth(2.2)}
          alignItems="center"
          bg="#F1F1F1"
        >
          <Box flex={1} width={"100%"} flexDirection="column">
            <Box flex={0.5}></Box>
            <Box flex={3} bg="white" shadow={5}>
              <Image
                height="100%"
                source={{
                  uri: `${particularSuvidha?.image}`,
                }}
                alt="Image"
                resizeMode="contain"
                width={"100%"}
              ></Image>
            </Box>
            <Box flex={0.5}></Box>
            <Box flex={0.2}></Box>

            {isAlreadyFill ? (
              <Text fontWeight="700" color="gray.600" fontSize={responsiveFontSize(2.5)}>
                तुम्ही या महिन्याची माहिती भरलेली आहे.
              </Text>
            ) : (
              <Box flex={0.7} bg="white">
                <TouchableOpacity
                  disabled={isAlreadyFill}
                  style={{
                    flex: 1,
                    backgroundColor: "#3e837e",
                    // height: "20%",
                    width: "100%",
                    justifyContent: "center",
                    borderRadius: responsiveWidth(2),
                  }}
                  onPress={() => openModal(particularSuvidha?.id)}
                >
                  <Text
                    textAlign="center"
                    color={"white"}
                    justifyContent="center"
                    fontWeight={600}
                    fontSize={responsiveFontSize(2.5)}
                    padding={responsiveHeight(1)}
                  >
                    {/* {!isAlreadyFill ? "माहिती भरा" : "माहिती बघा"} */}
                    माहिती भरा
                  </Text>
                </TouchableOpacity>
              </Box>
            )}
            <Box flex={3}>
              {/* <Text fontSize={responsiveFontSize(2.5)}>
                या योजनेची सुरुवात माननीय पंतप्रधाणांनी २२ जानेवारी २०१५ रोजी पानिपत,हरियाणा येथे
                सुरुवात केली.
              </Text> */}
            </Box>
          </Box>
        </Box>
      </LinearGradient>
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
