import { Box, Text, Image } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useNipunBharatStudentContextContext } from "../../Context/NipunBharatStudentContext"
import { randIntWithZero } from "../../filter/requireFunction"
interface IProps {
  item: any
  bgcolor: string
  bottomBorderColor: string
  textColor: string
  onClickQuestionCategoery: Function
  isExam?: boolean
}
export default ({
  item,
  bgcolor,
  bottomBorderColor,
  textColor,
  onClickQuestionCategoery,
  isExam = false,
}: IProps) => {
  return (
    <Box width="50%" height={responsiveHeight(20)} padding={responsiveHeight(1)}>
      <TouchableOpacity
        // disabled={isExam ? item.is_exam_done : false}
        style={{ flex: 1, borderRadius: responsiveWidth(7) }}
        onPress={() => onClickQuestionCategoery(item)}
      >
        <Box
          flex={1}
          borderColor={bottomBorderColor}
          borderWidth={responsiveWidth(0.8)}
          bgColor={bgcolor}
          style={{ backgroundColor: bgcolor }}
          borderRadius={responsiveWidth(1)}
          shadow={4}
          flexDirection="column"
        >
          <Box flex={7.5} alignItems="center" justifyItems="center" justifyContent="center">
            <Image
              source={require("../../../assets/nipunBharatIcons/exam.png")}
              resizeMode="cover"
              alt="Image"
              width="65%"
              height="65%"
            />
          </Box>
          <Box flex={5}>
            <Text fontSize={responsiveFontSize(1.8)} color="#7D8592" textAlign={"center"} bold>
              {item?.exam_title}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
