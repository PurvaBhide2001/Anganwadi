import { Box, Text, Image } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
interface IProps {
  title: string
  icon: any
  bgcolor: string
  bottomBorderColor: string
  textColor: string
  event: Function
}
export default ({ title, icon, bgcolor, bottomBorderColor, textColor, event }: IProps) => {
  return (
    <Box width="50%" height={responsiveHeight(20)} padding={responsiveWidth(1)}>
      <TouchableOpacity
        style={{ flex: 1, borderRadius: responsiveWidth(7) }}
        onPress={() => event()}
      >
        <Box
          flex={1}
          bgColor={bgcolor}
          style={{ backgroundColor: bgcolor }}
          borderRadius={responsiveWidth(7)}
        >
          <Box
            flex={1}
            style={{ backgroundColor: bgcolor }}
            borderBottomWidth={responsiveWidth(3)}
            borderBottomColor={bottomBorderColor}
            borderRadius={responsiveWidth(6.9)}
            flexDirection="column"
          >
            <Box flex={1} alignItems="center" justifyItems="center" justifyContent="center">
              <Image source={icon} resizeMode="cover" alt="something" />
            </Box>
            <Box flex={1}>
              <Text fontSize={responsiveFontSize(2.4)} color={textColor} textAlign={"center"} bold>
                {title}
              </Text>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
