import { Box, Text } from "native-base"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"
import SurveyItem from "./SurveyItem"
interface IProps {
  item: any
  requiresurveyProfileDataKey: any
}
export default ({ item, requiresurveyProfileDataKey }: IProps) => {
  const { answers, evaluation_title: evaluationtitle } = item

  return (
    <Box flex={12} borderRadius={responsiveWidth(1)} height="100%" width="100%">
      <Box flex={1} padding={responsiveWidth(2)}>
        <Text fontSize={responsiveFontSize(2.5)} fontWeight={700} color="gray.600">
          {evaluationtitle}
        </Text>
      </Box>
      <Box flex={2}>
        <SurveyItem studentBasicInfo={item} titleObject={requiresurveyProfileDataKey} />
      </Box>
      <Box flex={9} padding={responsiveWidth(0.5)}>
        <Box flex={0.1}> </Box>
        <Box flex={1}>
          <Text fontSize={responsiveFontSize(2.5)} fontWeight={700} color="gray.600">
            प्रश्न आणि त्याचे उत्तर
          </Text>
        </Box>
        {/* <Box flex={0.1}> </Box> */}
        <Box flex={1} flexDirection="column" borderRadius={responsiveWidth(2)} bg="#fbeeeb">
          {answers.map((question: any, i: number) => (
            <Box flex={1} borderRadius={responsiveWidth(1.9)} padding={responsiveWidth(1.5)}>
              <Box
                flex={1}
                padding={responsiveWidth(1.5)}
                bg={"white"}
                borderRadius={responsiveWidth(3)}
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
                  <Text fontSize={responsiveFontSize(2.1)} fontWeight={700} color="warmGray.500">
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
