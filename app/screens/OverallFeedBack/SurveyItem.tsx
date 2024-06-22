import { Box, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"
import { useStudentResultContext } from "../../Context/StudentResultContext"
import { dateFormatRequiredType } from "../../filter/dateAndTimeFormat"
interface IProps {
  studentBasicInfo: any
  titleObject: any
  iconObject?: any
}
export default ({ studentBasicInfo, titleObject, iconObject }: IProps) => {
  return (
    <Box flex={4} bg="#fbeeeb" borderRadius={responsiveWidth(1.5)}>
      <Box flexDirection="column" borderRadius={responsiveWidth(1.5)} padding={responsiveWidth(2)}>
        {Object.keys(titleObject).map((key: any, i: number) => {
          return (
            <Box padding={responsiveWidth(1)} flex={1} key={i}>
              <Box flex={1} padding={responsiveWidth(1.5)} flexDirection="row">
                {/* <Box flex={2} alignItems="center" justifyContent="center">
                    {iconObject[key]}
                  </Box> */}
                <Box
                  flex={12}
                  flexDirection="column"
                  bg={"white"}
                  padding={responsiveWidth(1)}
                  borderRadius={responsiveWidth(3)}
                  paddingLeft={responsiveWidth(3)}
                >
                  <Box flex={1}>
                    <Text fontSize={responsiveFontSize(2.0)} fontWeight={600} color="gray.600">
                      {titleObject[key]}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="gray.400">
                      {`${
                        key == "created_at"
                          ? dateFormatRequiredType(studentBasicInfo[key], "YYYY-MM-DD")
                          : studentBasicInfo[key]
                      }${key == "weight" ? " किलो" : key == "height" ? " सेंमी" : ""}`}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
