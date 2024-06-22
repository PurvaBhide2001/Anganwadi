import { Box, Text } from "native-base"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"
interface IProps {
  questionAnswers: any[]
  evaluationtitle: string
}
export default ({ questionAnswers, evaluationtitle }: IProps) => {
  console.log("question array", questionAnswers)

  return (
    <Box flex={8} padding={responsiveWidth(2)} bg={"#fbeeeb"}>
      <Box flex={1}>
        <Box flex={1} borderRadius={responsiveWidth(1.5)} flexDirection="column">
          <Box flex={1} alignItems={"center"}>
            <Text fontSize={responsiveFontSize(2.5)} fontWeight={700} color="gray.600">
              प्रश्न आणि त्याचे उत्तर ({evaluationtitle})
            </Text>
          </Box>
          {/* <Box flex={1} alignItems={"center"}>
            <Text fontSize={responsiveFontSize(2.5)} fontWeight={700} color="gray.600">
              श्रेणी ({evaluationtitle})
            </Text>
          </Box> */}
          {questionAnswers.map((question: any, i: number) => (
            <Box flex={1} padding={responsiveWidth(2)}>
              <Box
                flex={1}
                padding={responsiveWidth(2)}
                borderRadius={responsiveWidth(3)}
                bg={"white"}
              >
                <Box flex={1}>
                  <Text fontSize={responsiveFontSize(2.0)} fontWeight={600} color="gray.500">
                    श्रेणी : {question?.category}
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text fontSize={responsiveFontSize(2.0)} fontWeight={600} color="gray.600">
                    {i + 1}) {question.question}
                  </Text>
                </Box>

                <Box flex={1}>
                  <Text fontSize={responsiveFontSize(2.2)} fontWeight={700} color="gray.600">
                    उत्तर : {question.answer == 1 ? "चांगले जमते" : "मदत लागते"}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

//9991995191->
