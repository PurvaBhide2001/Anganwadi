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
  itemList: any[]
}
export default ({
  title,
  icon,
  bgcolor,
  bottomBorderColor,
  textColor,
  event,
  itemList,
}: IProps) => {
  return (
    <Box width="50%" height={responsiveHeight(20)} padding={responsiveHeight(0.8)}>
      <TouchableOpacity
        style={{ flex: 1, borderRadius: responsiveWidth(7) }}
        onPress={() => event()}
      >
        <Box
          flex={1}
          borderColor={bottomBorderColor}
          borderWidth={responsiveWidth(0.8)}
          bgColor={bgcolor}
          style={{ backgroundColor: bgcolor }}
          borderRadius={responsiveWidth(1)}
          shadow={4}
        >
          <Box flex={1} style={{ backgroundColor: bgcolor }} flexDirection="column">
            <Box flex={10} flexDirection="row" alignItems={"flex-end"}>
              <Box flex={1} alignItems="center" justifyItems="center" justifyContent="center">
                <Image source={icon} resizeMode="cover" alt="Image" width="50%" height="80%" />
              </Box>
            </Box>
            <Box flex={1}></Box>
            <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" textAlign={"center"} bold>
              {title}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
