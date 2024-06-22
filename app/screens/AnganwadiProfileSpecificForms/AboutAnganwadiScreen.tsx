import { observer } from "mobx-react-lite"
import { Box, Text, Icon } from "native-base"
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
import InputField2 from "../../UI/InputField2"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useHeader } from "../../utils/useHeader"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useAnganwadiProfileContext } from "../../Context/AnganwadiProfileContext"

interface AboutAnganwadiProps extends AppStackScreenProps<"AboutAnganwadi"> {}

export const AboutAnganwadiScreen: FC<AboutAnganwadiProps> = observer(function AboutAnganwadi({
  navigation,
}) {
  const [language, setLanguage] = useState("")
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { anganwadiList } = useLoginContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const { AboutControl, AboutHandleSubmit, onUpdateAboutAnganwadi } = useAnganwadiProfileContext()

  useHeader({
    title: "अंगणवाडी माहिती",
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
        <Box flex={1} padding={responsiveWidth(2)}>
          <Box flex={1} justifyContent={"flex-end"}>
            <Text fontSize={responsiveFontSize(2.3)} paddingLeft={responsiveWidth(10)}>
              अंगणवाडी चे नाव :
            </Text>
          </Box>
          <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
            <Box
              flex={1.5}
              borderRadius={responsiveWidth(3)}
              alignContent="flex-end"
              justifyContent={"center"}
            >
              <Icon as={Feather} name="edit-3" size={responsiveHeight(3.5)} color="warmGray.500" />
            </Box>
            <Box flex={10.5} borderRadius={responsiveWidth(3)} alignItems={"center"}>
              <InputField2
                control={AboutControl}
                name={"anganwadi_name"}
                placeholder={"अंगणवाडी चे नाव"}
                keyPadType={undefined}
                variant="underlined"
                inputRightElementTopRightRadius={0}
                inputRightElementBottomRightRadius={0}
                inputRightElementBorderWidth={0}
                isDisabled={true}
              />
            </Box>
          </Box>
          <Box flex={1} justifyContent={"flex-end"}>
            <Text fontSize={responsiveFontSize(2.3)} paddingLeft={responsiveWidth(10)}>
              अंगणवाडी कोड :
            </Text>
          </Box>
          <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
            <Box
              flex={1.5}
              borderRadius={responsiveWidth(3)}
              alignContent="flex-end"
              justifyContent={"center"}
            >
              <Icon as={Feather} name="edit-3" size={responsiveHeight(3.5)} color="warmGray.500" />
            </Box>
            <Box flex={10.5} borderRadius={responsiveWidth(3)}>
              <InputField2
                control={AboutControl}
                name={"anganwadi_code"}
                placeholder={"अंगणवाडी कोड"}
                keyPadType={"phone-pad"}
                variant="underlined"
                inputRightElementTopRightRadius={0}
                inputRightElementBottomRightRadius={0}
                inputRightElementBorderWidth={0}
                isDisabled={true}
              />
            </Box>
          </Box>

          <Box flex={2}>
            <Box flex={1} flexDirection="row" padding={responsiveWidth(2)}></Box>
          </Box>
        </Box>
      </Box>
      {/* <Box flex={2} flexDirection="row" justifyContent={"flex-end"}>
        <TouchableOpacity
          style={{
            backgroundColor: "#669df6",
            width: "100%",
            justifyContent: "center",
          }}
          onPress={AboutHandleSubmit(onUpdateAboutAnganwadi)}
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
      </Box> */}
    </ScrollView>
  )
})
