import { observer } from "mobx-react-lite"
import {
  ArrowForwardIcon,
  Box,
  Center,
  CheckIcon,
  IconButton,
  Image,
  ScrollView,
  Select,
  Text,
} from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import Feather from "react-native-vector-icons/Feather"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useLoginContext } from "../../Context/LoginContext"
import { useStudentContextContext } from "../../Context/StudentContext"
import SelectDropdown2 from "../../UI/SelectDropdown2"

import { Button, Card, Icon, Screen, TextField, TextFieldAccessoryProps } from "./../../components"
import { useStores } from "./../../models"
import { AppStackScreenProps, goBack, navigate } from "./../../navigators"
import { colors, spacing } from "./../../theme"
import { evaluationData } from "./../../../assets/constant/commanConstant"
import { styleData } from "../../../assets/constant/styleData"
import { useHeader } from "../../utils/useHeader"
import { RefreshControl } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"
interface ChooseStudentScreenProps extends AppStackScreenProps<"ChooseStudent"> {}

export const ChooseStudentScreen: FC<ChooseStudentScreenProps> = observer(
  function ChooseStudentScreen({ navigation }) {
    const {
      setToTheStudent,
      studentID,
      evaluationID,
      setEvaluationID,
      evaluationArray,
      onChangeStudent,
    } = useStudentContextContext()
    const { menuSMList, menuMDList, UpdatesList, onRefresh, refereshing } = useMainMenuContext()
    console.log("this is choose student")

    const { studentList } = useLoginContext()

    useHeader({
      title: "विद्यार्थी निवड करा",
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
        colors={["#D7DAF2", "#F5D6E5"]}
        style={{
          width: "100%",
          height: "100%",
          padding: responsiveWidth(1),
          flex: 1,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1} flexDirection="column">
            <Box flex={1.5} flexDirection="column" padding={responsiveWidth(1)}>
              <Box
                flex={1}
                w={"100%"}
                justifyContent="center"
                justifyItems="center"
                alignItems="flex-start"
                alignContent="center"
              >
                <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                  विद्यार्थ्याचे नाव
                </Text>
              </Box>
              <Box flex={1}>
                <SelectDropdown2
                  list={studentList}
                  bgColor={"white"}
                  selected={studentID}
                  setSelected={onChangeStudent}
                  placeholder={"विद्यार्थ्याचे नाव निवडा"}
                  width={"70%"}
                  minWidth={"100%"}
                  fontSize={2}
                  IconSize={5}
                  optionLabel={"f_name"}
                  secondLable={"m_name"}
                  thirdLable="l_name"
                  optionValue={"Id"}
                  borderRadius={2}
                  style={undefined}
                  isFullName={true}
                />
              </Box>
            </Box>
            <Box flex={1.5} flexDirection="column" padding={responsiveWidth(1)}>
              <Box
                flex={1}
                w={"100%"}
                justifyContent="center"
                justifyItems="center"
                alignItems="flex-start"
                alignContent="center"
              >
                <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                  मूल्यमापन
                </Text>
              </Box>
              <Box flex={1}>
                <SelectDropdown2
                  list={evaluationArray}
                  bgColor={"white"}
                  selected={evaluationID}
                  setSelected={setEvaluationID}
                  placeholder={"मूल्यमापन निवडा"}
                  width={"70%"}
                  minWidth={"100%"}
                  fontSize={2}
                  IconSize={5}
                  optionLabel={"label"}
                  optionValue={"id"}
                  borderRadius={2}
                  style={undefined}
                />
              </Box>
            </Box>

            <Box flex={5} alignItems="center" padding={responsiveWidth(2)}>
              <Image
                source={require("../../../assets/surveyimages/svgtopng/img7.png")}
                alt="Alternate Text"
                resizeMode="cover"
              />
            </Box>

            <Box flex={1} alignItems="center" padding={responsiveWidth(2)}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: "100%",
                  width: "40%",
                  justifyContent: "center",
                  borderRadius: responsiveWidth(2),
                  borderColor: "#f6f8fa",
                  borderWidth: responsiveWidth(0.5),
                }}
                onPress={() => setToTheStudent()}
              >
                <Text
                  textAlign="center"
                  color={"warmGray.500"}
                  justifyContent="center"
                  fontWeight={600}
                  fontSize={responsiveFontSize(2.5)}
                >
                  पुढे जा
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </ScrollView>
      </LinearGradient>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.tiny,
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
