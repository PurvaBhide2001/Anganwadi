import { observer } from "mobx-react-lite"
import { Box, Image, Input, Text } from "native-base"
import React, { FC, useState } from "react"
import { TextStyle, ViewStyle, ScrollView, TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useHeader } from "../../utils/useHeader"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import { RefreshControl } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import InputField2 from "../../UI/InputField2"
import { useReportContext } from "../../Context/ReportContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"

interface BirthRateCalculatorProps extends AppStackScreenProps<"BirthRateCalculator"> {}

export const BirthRateCalculatorScreen: FC<BirthRateCalculatorProps> = observer(
  function BirthRateCalculator({ navigation }) {
    useHeader({
      title: "जन्मदर कॅल्क्युलेटर",
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
    const { onRefresh, refereshing } = useMainMenuContext()
    const { BirthRateControl, BirthRateHandleSubmit } = useReportContext()
    const icon = require("../../../assets/surveyimages/MainMenu/birthRate.png")
    const [girls, setGirls] = useState<any>("")
    const [boys, setBoys] = useState<any>("")
    const [birthRateLabel, setBirthRateLabel] = useState<any>("")
    const [showResult, setShowResult] = useState(false)

    const calculateBirthRate = () => {
      var BirthRate = (girls / boys) * 1000
      setBirthRateLabel(Math.round(BirthRate))

      // female count/male count*1000
      setShowResult(true)
      if (birthRateLabel !== 0) {
        showResult
      }
    }
    return (
      <>
        <ScrollView
          style={{ backgroundColor: "white" }}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1} flexDirection="column" height={"100%"} padding={responsiveWidth(2)}>
            <Box flex={1} flexDirection="column" justifyContent={"flex-start"}>
              <Image
                source={icon}
                style={{ height: responsiveHeight(50) }}
                alt="image"
                resizeMode="cover"
              />
            </Box>

            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={3}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                  padding={responsiveWidth(2)}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    मुलींचे जन्म :
                  </Text>
                </Box>
                <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <Input
                    variant="outline"
                    placeholder="मुलींची जन्मदर संख्या"
                    keyboardType="phone-pad"
                    fontSize={responsiveFontSize(2.2)}
                    color="#899da6"
                    fontWeight={500}
                    value={String(girls)}
                    onChangeText={(val) => setGirls(Number(val))}
                  />
                </Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box
                flex={3}
                borderRadius={responsiveWidth(3)}
                alignContent="flex-end"
                justifyContent={"center"}
                padding={responsiveWidth(2)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  मुलांचे जन्म :
                </Text>
              </Box>
              <Box flex={6} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                <Input
                  variant="outline"
                  placeholder="मुलांची जन्मदर संख्या"
                  keyboardType="phone-pad"
                  fontSize={responsiveFontSize(2.2)}
                  color="#899da6"
                  fontWeight={500}
                  value={String(boys)}
                  onChangeText={(val) => setBoys(Number(val))}
                />
              </Box>
            </Box>
            <Box flex={1} justifyContent={"flex-end"} pt={responsiveHeight(2)} alignItems="center">
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderRadius: responsiveWidth(2),
                  backgroundColor: "#4182c3",
                  padding: responsiveWidth(2),
                  width: "80%",
                }}
                onPress={() => {
                  console.log("calculator")
                  calculateBirthRate()
                }}
              >
                <Text color={"white"} textAlign="center" fontSize={responsiveFontSize(2)} bold>
                  जन्मदर गणना करा
                </Text>
              </TouchableOpacity>
            </Box>
            <Box flex={1}></Box>

            {showResult && (
              <Box
                flex={1}
                justifyContent={"flex-end"}
                pt={responsiveHeight(2)}
                alignItems="center"
              >
                <Text
                  color={"#7d8592"}
                  bg={"#e8f6fc"}
                  textAlign="center"
                  p={responsiveHeight(1)}
                  fontSize={responsiveFontSize(2.2)}
                  borderRadius={responsiveWidth(2)}
                  bold
                >
                  जन्मदर : {birthRateLabel}
                </Text>
              </Box>
            )}
          </Box>
        </ScrollView>
      </>
    )
  },
)

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
