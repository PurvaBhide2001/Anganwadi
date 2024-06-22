import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import InputField2 from "../../UI/InputField2"
import Fontisto from "react-native-vector-icons/Fontisto"
import { useAddressContext } from "../../Context/AddressContext"
import { useAnganwadiProfileContext } from "../../Context/AnganwadiProfileContext"
import { useHeader } from "../../utils/useHeader"
import MyRadioButtons from "../../UI/RadioGroup"
import { useRadioButtonRenderContextContext } from "../../Context/RadioButtonRenderContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import RadioGroup3 from "../../UI/RadioGroup3"
import FixedFormFormat from "../../UI/FixedFormFormat"
import AWWAddUpdateEmployees from "./AWWAddUpdateEmployees"
import AlertModal from "../../components/AlertModal"
import { useCommanContextContext } from "../../Context/CommanContext"
import Modal from "../../theme/Modal"
import { useAnganwadiEmployeeContext } from "../../Context/AnganwadiEmployeeContext"
import AwwEmployeeModal from "./AwwEmployeeModal"
import AnganwadiEmployeeList from "./AnganwadiEmployeeList"
import WarningModal from "../../components/WarningModal"
import LinearGradient from "react-native-linear-gradient"

interface AWWWorkingHelpersProps extends AppStackScreenProps<"AWWWorkingHelpers"> {}

export const AWWWorkingHelpersScreen: FC<AWWWorkingHelpersProps> = observer(
  function AWWWorkingHelpers({ navigation }) {
    const [language, setLanguage] = useState("")
    // const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
    const { onRefresh, refereshing } = useLoginContext()
    const { states, districts } = useAddressContext()
    const {
      awcMiniType,
      WorkerhandleSubmit,
      onUpdateAww,
      WorkerControl,
      selectedRadioOption1,
      selectedRadioOption2,
      selectedRadioOption3,
      selectedRadioOption4,
      setSelectedRadioOption1,
      setSelectedRadioOption2,
      setSelectedRadioOption3,
      setSelectedRadioOption4,
      control,
      awwHandleSubmit,
      fields,
      append,
      getValues,
      getFieldState,
    } = useAnganwadiProfileContext()
    // const [value, setValue] = React.useState("two")
    const { renderAdditionalFields } = useRadioButtonRenderContextContext()
    // const { onRefresh, refereshing } = useMainMenuContext()

    const {
      closeToEmployeeModal,
      closeWarningModal,
      isWarningModalOpen,
      yesToDeleteEmployeeItem,
      deleteBtnName,
      deleteMessage,
      cancelBtnName,
      onAddEmployee,
      isOpenEmployeeModal,
      openToEmployeeModal,
    } = useAnganwadiEmployeeContext()
    useHeader({
      title: "अंगणवाडी सेविका आणि मदतनीस",
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
    const { closeAlertModal, alertMessage, isAlertModalOpen } = useCommanContextContext()
    return (
      <>
        <AlertModal alertText={alertMessage} isOpen={isAlertModalOpen} onClose={closeAlertModal} />
        <Modal
          maxWidth={responsiveWidth(100)}
          isShowModal={isOpenEmployeeModal}
          closeModal={closeToEmployeeModal}
          cancelButton={closeToEmployeeModal}
          submitButton={onAddEmployee}
          Component={AwwEmployeeModal}
        />
        <WarningModal
          message={deleteMessage}
          isOpen={isWarningModalOpen}
          closeModal={closeWarningModal}
          maxH={"212"}
          yesToDelete={yesToDeleteEmployeeItem}
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
          <Box flex={1} flexDirection="column">
            <Box flex={1}>
              <Box style={{ flex: 1 }} flexDirection="row" padding={responsiveWidth(0.4)}>
                <Box flex={8}> </Box>
                <Box flex={6}>
                  <TouchableOpacity
                    onPress={() => {
                      openToEmployeeModal()
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
                      कर्मचारी माहिती भरा
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
            <Box flex={11}>
              <ScrollView
                style={{}}
                automaticallyAdjustKeyboardInsets={true}
                refreshControl={
                  <RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />
                }
              >
                <AnganwadiEmployeeList />
              </ScrollView>
            </Box>
          </Box>
        </LinearGradient>
      </>
    )
  },
)
