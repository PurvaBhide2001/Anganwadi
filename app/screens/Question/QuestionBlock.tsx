import { Box, Text } from "native-base"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useQuestionContext } from "../../Context/QuestionContext"
import { TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"

export default () => {
  const { selectedQuestion, isRight, isLeft, rightButton, leftButton, questionIndex } =
    useQuestionContext()
  return (
    <>
      <Box
        flex={1}
        borderRadius={responsiveWidth(3)}
        flexDirection="column"
        bgColor="#F5D6E5"
        padding={responsiveWidth(2)}
      >
        <Box flex={3} flexDirection="row" padding={responsiveWidth(1)}>
          {/* <Text fontSize={responsiveFontSize(2.1)}>{selectedQuestion?.questionID}</Text>) */}
          <Text fontSize={responsiveFontSize(2.1)} color="#a1a9b5" fontWeight={600}>
            {selectedQuestion?.category}
          </Text>
        </Box>
        <Box flex={7} flexDirection="row">
          <Text fontSize={responsiveFontSize(2.1)} color="#7d8592" fontWeight={600}>
            {questionIndex.current + 1}) {selectedQuestion?.question}
          </Text>
        </Box>
        <Box flex={4} flexDirection="row">
          <Box flex={6} paddingX={responsiveWidth(2)} borderRadius={responsiveWidth(1)}>
            <TouchableOpacity
              style={{ height: "100%", width: "100%" }}
              onPress={() => leftButton()}
            >
              <LinearGradient
                // colors={isLeft ? ["#7EE8FA", "#7EE8FA"] : ["#F5D6E5", "#F5D6E5"]}
                colors={isLeft ? ["#6bcb77", "#6bcb77"] : ["#ffffff", "#ffffff"]}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: responsiveWidth(1),
                  borderRadius: responsiveWidth(2),
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
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
                    color="warmGray.500"
                  >
                    मदत लागते
                  </Text>
                </Box>
              </LinearGradient>
            </TouchableOpacity>
          </Box>
          <Box flex={6} paddingX={responsiveWidth(2)} borderRadius={responsiveWidth(1)}>
            <TouchableOpacity
              style={{ height: "100%", width: "100%" }}
              onPress={() => rightButton()}
            >
              <LinearGradient
                // colors={isLeft ? ["#ffffff", "#ffffff"] :["#F5D6E5", "#F5D6E5"]}
                colors={isRight ? ["#6bcb77", "#6bcb77"] : ["#ffffff", "#ffffff"]}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: responsiveWidth(1),
                  borderRadius: responsiveWidth(2),
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
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
                    color="warmGray.500"
                    justifyContent="center"
                    alignItems="center"
                  >
                    चांगले जमते
                  </Text>
                </Box>
              </LinearGradient>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </>
  )
}

/**
 * isLeft
 */
