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
import { useHeader } from "../../utils/useHeader"
import NumberInput from "../../UI/MultipleInputField"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"

interface FunctionsAndServicesByAWCProps extends AppStackScreenProps<"FunctionsAndServicesByAWC"> {}

export const FunctionsAndServicesByAWCScreen: FC<FunctionsAndServicesByAWCProps> = observer(
  function FunctionsAndServicesByAWC({ navigation }) {
    const [language, setLanguage] = useState("")
    const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
    const { anganwadiList } = useLoginContext()
    const { onRefresh, refereshing } = useMainMenuContext()

    useHeader({
      title: "  AWC चे कार्य आणि वितरित सेवा",
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
          <Box flex={1} alignItems="center" justifyContent="center" padding={responsiveWidth(2)}>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <Text
                  fontSize={responsiveFontSize(2.2)}
                  color="warmGray.400"
                  paddingBottom={responsiveHeight(1)}
                >
                  1) AWC कार्यरत दिवसांची संख्या प्रति माह
                </Text>

                <NumberInput />
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <Text
                  fontSize={responsiveFontSize(2.2)}
                  color="warmGray.400"
                  paddingBottom={responsiveHeight(1)}
                >
                  2) सकाळचा नाश्ता
                </Text>

                <NumberInput />
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10} borderRadius={responsiveWidth(3)}>
                <Text
                  fontSize={responsiveFontSize(2.2)}
                  color="warmGray.400"
                  paddingBottom={responsiveHeight(1)}
                >
                  3) घरी दिले जाणारे रेशन (कोरडे शिधा)
                </Text>

                <NumberInput />
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <Text
                  fontSize={responsiveFontSize(2.2)}
                  color="warmGray.400"
                  paddingBottom={responsiveHeight(1)}
                >
                  4) AWC ने प्री-स्कूल शिक्षण दिले जाणारे दिवस
                </Text>

                <NumberInput />
              </Box>
            </Box>

            <Box flex={2}>
              <Box flex={1} flexDirection="row" padding={responsiveWidth(2)}></Box>
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
            onPress={handleSubmit((data: any) => {
              onSubmit(data)
            })}
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
  },
)
