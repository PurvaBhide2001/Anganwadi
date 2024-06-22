import { Box, Image, Text } from "native-base"
import { AppStackScreenProps } from "../../navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import AntDesign from "react-native-vector-icons/AntDesign"
import { TouchableOpacity } from "react-native"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import Modal from "../../theme/Modal"
import QuestionForAnganwadi from "../AnganwadiSuvidha/QuestionForAnganwadi"
import { useHeader } from "../../utils/useHeader"
const logo = require("../../../assets/surveyimages/anganwadiProfile/smartAnganwadi.png")

interface AnganwadiSmartStatusScreenProps extends AppStackScreenProps<"AnganwadiSmartStatus"> {}
export const AnganwadiSmartStatusScreen: FC<AnganwadiSmartStatusScreenProps> = observer(
  function AnganwadiSmartStatusScreen({ navigation }) {
    const {
      onClickAnganwadiSuvidhaQuestionClose,
      onClickAnganwadiSuvidhaQuestionOpen,
      onSubmitQuestionSmartStatus,
      isOpenQuestionModal,
    } = useAnganwadiSuvidhaContext()
    useHeader({
      title: "अंगणवाडी स्मार्ट स्टेटस",
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
      <Box flex={1} width="100%">
        <Modal
          maxWidth={responsiveWidth(120)}
          isShowModal={isOpenQuestionModal}
          closeModal={onClickAnganwadiSuvidhaQuestionClose}
          cancelButton={onClickAnganwadiSuvidhaQuestionClose}
          submitButton={onSubmitQuestionSmartStatus}
          Component={QuestionForAnganwadi}
        />
        <Box flex={1} padding={responsiveWidth(1)}>
          <TouchableOpacity
            style={{ height: responsiveHeight(10), width: "100%" }}
            onPress={() => onClickAnganwadiSuvidhaQuestionOpen()}
          >
            <Box
              style={{
                height: "100%",
                borderRadius: responsiveWidth(2),
                flex: 1,
                justifyContent: "center",
              }}
              bg="white"
            >
              <Box flex={1} flexDirection={"row"} justifyContent={"center"}>
                <Box flex={2} justifyContent={"center"}>
                  <Image
                    source={logo}
                    padding={responsiveHeight(1)}
                    resizeMode="contain"
                    height={"50%"}
                    alt="icon"
                  />
                </Box>
                <Box flex={10} justifyContent={"center"}>
                  <Text fontSize={responsiveFontSize(2.5)} fontWeight={700} color="gray.500">
                    अंगणवाडी स्मार्ट स्टेटस
                  </Text>
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    )
  },
)
