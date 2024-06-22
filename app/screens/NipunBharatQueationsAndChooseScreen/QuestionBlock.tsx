import { Box, Text } from "native-base"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useQuestionContext } from "../../Context/QuestionContext"
import { TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useNipunBharatQuestionContext } from "../../Context/NipunBharatQuestionContext"

export default () => {
  const {
    selectedQuestion,
    isRight,
    isLeft,
    rightButton,
    leftButton,
    questionIndex,
    isCenter,
    centerButton,
    selectedAnswerID,
    setToTheSelectedAnswer,
  } = useNipunBharatQuestionContext()

  const {
    question = "",
    options: [
      { option_text: o_1, id: optionId_1 = "" },
      { option_text: o_2, id: optionId_2 = "" },
      { option_text: o_3, id: optionId_3 = "" },
    ] = [],
  } = selectedQuestion

  return (
    <>
      {selectedQuestion ? (
        <Box
          flex={1}
          borderRadius={responsiveWidth(3)}
          flexDirection="column"
          bgColor="#fbecff"
          padding={responsiveWidth(2)}
        >
          {/* <Box flex={1} flexDirection="row" padding={responsiveWidth(1)}>
          <Text fontSize={responsiveFontSize(2.1)} color="#a1a9b5" fontWeight={600}>
            {selectedQuestion?.category}
          </Text>
        </Box> */}
          <Box flex={2} flexDirection="row" alignItems={"center"}>
            <Text fontSize={responsiveFontSize(2.1)} color="#7d8592" fontWeight={600}>
              {questionIndex.current + 1}) {question}
            </Text>
          </Box>
          <Box flex={8} flexDirection="column">
            <Box flex={12} paddingX={responsiveWidth(2)} borderRadius={responsiveWidth(1)}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  height: "100%",
                  width: "100%",
                  borderWidth: responsiveWidth(0.4),
                  shadowOpacity: 2,
                  borderRadius: responsiveWidth(2),
                  borderColor: selectedAnswerID == optionId_1 ? "#34AC78" : "#7795D1",
                  padding: responsiveWidth(0.9),
                  backgroundColor: selectedAnswerID == optionId_1 ? "#CAF3E1" : "#D3E1FE",
                }}
                onPress={() => setToTheSelectedAnswer(optionId_1)}
              >
                <Box
                  flex={1}
                  borderRadius={responsiveWidth(2)}
                  justifyContent={"center"}
                  // bgColor={isLeft ? "green.500" : "blue.400"}
                >
                  <Text
                    textAlign="center"
                    fontSize={responsiveFontSize(2)}
                    fontWeight={700}
                    color={selectedAnswerID == optionId_1 ? "#34AC78" : "#7d8592"}
                  >
                    {o_1}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box flex={1}> </Box>
            <Box flex={12} paddingX={responsiveWidth(2)} borderRadius={responsiveWidth(1)}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  height: "100%",
                  width: "100%",
                  borderWidth: responsiveWidth(0.5),
                  shadowOpacity: 2,
                  borderColor: selectedAnswerID == optionId_2 ? "#34AC78" : "#7795D1",
                  padding: responsiveWidth(0.9),
                  borderRadius: responsiveWidth(2),

                  backgroundColor: selectedAnswerID == optionId_2 ? "#CAF3E1" : "#D3E1FE",
                }}
                onPress={() => setToTheSelectedAnswer(optionId_2)}
              >
                <Box
                  flex={1}
                  borderRadius={responsiveWidth(2)}
                  justifyContent={"center"}
                  // bgColor={isRight ? "green.500" : "blue.400"}
                >
                  <Text
                    textAlign="center"
                    fontSize={responsiveFontSize(2)}
                    fontWeight={700}
                    color={selectedAnswerID == optionId_2 ? "#34AC78" : "#7d8592"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {o_2}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box flex={1}> </Box>
            <Box flex={12} paddingX={responsiveWidth(2)} borderRadius={responsiveWidth(1)}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  height: "100%",
                  width: "100%",
                  borderWidth: responsiveWidth(0.5),
                  shadowOpacity: 2,
                  borderColor: selectedAnswerID == optionId_3 ? "#34AC78" : "#7795D1",
                  padding: responsiveWidth(0.9),
                  borderRadius: responsiveWidth(2),
                  backgroundColor: selectedAnswerID == optionId_3 ? "#CAF3E1" : "#D3E1FE",
                }}
                onPress={() => setToTheSelectedAnswer(optionId_3)}
              >
                <Box
                  flex={1}
                  borderRadius={responsiveWidth(2)}
                  justifyContent={"center"}
                  // bgColor={isRight ? "green.500" : "blue.400"}
                >
                  <Text
                    textAlign="center"
                    fontSize={responsiveFontSize(2)}
                    fontWeight={700}
                    color={selectedAnswerID == optionId_3 ? "#34AC78" : "#7d8592"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {o_3}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>""</Box>
      )}
    </>
  )
}

/**
 * isLeft
 */
