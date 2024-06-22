import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import SelectDropdown3 from "../../UI/SelectDropdown3"
import { useAddressContext } from "../../Context/AddressContext"
import { useAnganwadiProfileContext } from "../../Context/AnganwadiProfileContext"
import { useHeader } from "../../utils/useHeader"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import Spinner from "react-native-loading-spinner-overlay"

interface AWCTypeProps extends AppStackScreenProps<"AWCType"> {}

export const AWCTypeScreen: FC<AWCTypeProps> = observer(function AWCType({ navigation }) {
  const [language, setLanguage] = useState("")
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { anganwadiList } = useLoginContext()
  const { states, districts } = useAddressContext()
  const {
    awcMiniType,
    awcType,
    // structureType,
    buildingType,
    AWCControl,
    AWCHandleSubmit,
    awcErrors,
    onUpdateAnganwadiBuildingType,
    shauchalay,
    electricity,
    isSpinner,
  } = useAnganwadiProfileContext()
  const { onRefresh, refereshing } = useMainMenuContext()

  useHeader({
    title: "अंगणवाडी प्रकार",
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
        <Spinner visible={isSpinner} textContent={""} textStyle={{ color: "#FFF" }} />
        <Box flex={1} justifyContent="center" padding={responsiveWidth(2)}>
          <Box flex={1} justifyContent={"flex-end"} paddingLeft={responsiveWidth(3)}>
            <Text fontSize={responsiveFontSize(2.3)}>अंगणवाडी /मिनी अंगणवाडी :</Text>
          </Box>
          <Box flex={1} flexDirection="row" alignItems="center">
            <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
              <SelectDropdown3
                control={AWCControl}
                name={"awc"}
                placeholder={"अंगणवाडी/मिनी अंगणवाडी "}
                listItem={awcMiniType}
                label={"value"}
                labelValue={"id"}
                bgColor="white"
                borderBottomColor="warmGray.300"
                borderColor="white"
                borderRadius={2}
                borderWidth={0.3}
                fontSize={2.2}
                errors={awcErrors}
              />
            </Box>
          </Box>
          <Box flex={1} padding={responsiveWidth(3)}>
            <Text fontSize={responsiveFontSize(2.3)}>पिण्याच्या पाण्याची सुविधा :</Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <SelectDropdown3
                control={AWCControl}
                name={"drinking_water"}
                placeholder={"पिण्याचे पाणी"}
                listItem={awcType}
                label={"value"}
                labelValue={"id"}
                bgColor="white"
                borderBottomColor="warmGray.300"
                borderColor="white"
                borderRadius={2}
                borderWidth={0.3}
                fontSize={2.2}
                errors={awcErrors}
              />
            </Box>
          </Box>
          <Box flex={1} padding={responsiveWidth(3)}>
            <Text fontSize={responsiveFontSize(2.3)}>शौचालय सुविधा :</Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <SelectDropdown3
                control={AWCControl}
                name={"toilet"}
                placeholder={"शौचालय सुविधा"}
                listItem={shauchalay}
                label={"value"}
                labelValue={"id"}
                bgColor="white"
                borderBottomColor="warmGray.300"
                borderColor="white"
                borderRadius={2}
                borderWidth={0.3}
                fontSize={2.2}
                errors={awcErrors}
              />
            </Box>
          </Box>
          <Box flex={1} padding={responsiveWidth(3)}>
            <Text fontSize={responsiveFontSize(2.3)}>विद्युत सुविधा :</Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <SelectDropdown3
                control={AWCControl}
                name={"electronic"}
                placeholder={"विद्युत सुविधा"}
                listItem={electricity}
                label={"value"}
                labelValue={"id"}
                bgColor="white"
                borderBottomColor="warmGray.300"
                borderColor="white"
                borderRadius={2}
                borderWidth={0.3}
                fontSize={2.2}
                errors={awcErrors}
              />
            </Box>
          </Box>
          {/* <Box flex={1} padding={responsiveWidth(3)}>
            <Text fontSize={responsiveFontSize(2.3)}>इमारतीचे बांधकाम प्रकार :</Text>

          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <SelectDropdown3
                control={AWCControl}
                name={"toilet"}
                placeholder={"शौचालय सुविधा"}
                listItem={shauchalay}
                label={"value"}
                labelValue={"id"}
                bgColor="white"
                borderBottomColor="warmGray.300"
                borderColor="white"
                borderRadius={2}
                borderWidth={0.3}
                fontSize={2.2}
              />
            </Box>
          </Box> */}
          {/* <Box flex={1} padding={responsiveWidth(3)}>
            <Text fontSize={responsiveFontSize(2.3)}>विद्युत सुविधा :</Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <SelectDropdown3
                control={AWCControl}
                name={"electronic"}
                placeholder={"विद्युत सुविधा"}
                listItem={electricity}
                label={"value"}
                labelValue={"id"}
                bgColor="white"
                borderBottomColor="warmGray.300"
                borderColor="white"
                borderRadius={2}
                borderWidth={0.3}
                fontSize={2.2}
                errors={awcErrors}
              />
            </Box>
          </Box> */}

          <Box flex={1} padding={responsiveWidth(3)}>
            <Text fontSize={responsiveFontSize(2.3)}>इमारतीचा प्रकार :</Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <SelectDropdown3
                control={AWCControl}
                name={"building_type"}
                placeholder={"इमारतीचा प्रकार"}
                listItem={buildingType}
                label={"value"}
                labelValue={"id"}
                bgColor="white"
                borderBottomColor="warmGray.300"
                borderColor="white"
                borderRadius={2}
                borderWidth={0.3}
                fontSize={2.2}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
        <TouchableOpacity
          style={{
            backgroundColor: "#669df6",
            width: "100%",
            justifyContent: "center",
          }}
          onPress={AWCHandleSubmit(onUpdateAnganwadiBuildingType)}
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
      </Box>
    </ScrollView>
  )
})
