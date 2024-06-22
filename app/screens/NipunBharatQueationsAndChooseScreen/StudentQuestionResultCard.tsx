import { Box, Text } from "native-base"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"

interface IProps {
  item: any
}
export default ({ item }: IProps) => {
  const { exam_title, questions } = item

  return (
    <Box flex={12} borderRadius={responsiveWidth(1)} height="100%" width="100%">
      <Box flex={1} padding={responsiveWidth(2)}>
        <Text fontSize={responsiveFontSize(2.5)} fontWeight={700} color="gray.600">
          {exam_title}
        </Text>
      </Box>

      <Box flex={9} padding={responsiveWidth(1)}>
        <Box flex={0.1}> </Box>
        <Box flex={1}>
          <Text fontSize={responsiveFontSize(2.5)} fontWeight={700} color="gray.600">
            प्रश्न आणि त्याचे उत्तर
          </Text>
        </Box>
        <Box flex={0.1}> </Box>
        <Box flex={1} flexDirection="column" borderRadius={responsiveWidth(2)} bg="white">
          {questions.map((question: any, i: number) => (
            <Box flex={1} borderRadius={responsiveWidth(1.9)} padding={responsiveWidth(1)}>
              <Box flex={1} padding={responsiveWidth(2)}>
                {/* <Box flex={1}>
                  <Text fontSize={responsiveFontSize(2.0)} fontWeight={600} color="gray.500">
                    श्रेणी : {question?.category}
                  </Text>
                </Box> */}
                <Box flex={1}>
                  <Text fontSize={responsiveFontSize(2.0)} fontWeight={600} color="gray.600">
                    {i + 1}) {question.question}
                  </Text>
                </Box>
                <Box flex={1} flexDirection={"row"}>
                  <Box flex={10}>
                    <Text fontSize={responsiveFontSize(2.1)} fontWeight={700} color="warmGray.500">
                      उत्तर : {question.options[0]?.option_text}
                    </Text>
                  </Box>
                  <Box flex={2}>
                    <Text fontSize={responsiveFontSize(2.1)} fontWeight={600} color="gray.700">
                      {question.options[0]?.option_marks} गुण
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
