import { Box, Image, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
interface IProps {
  title: any
  bgColor: any
  icon: any
  borderColor: any
  navigation: any
}
export default ({ title, bgColor, icon, navigation }: IProps) => {
  return (
    <Box flex={1} height={responsiveHeight(16)} padding={responsiveWidth(2)} alignItems={"center"}>
      <Box flex={1}>
        <TouchableOpacity
          style={{ flex: 1, width: "100%", height: "100%" }}
          onPress={() => navigation()}
        >
          <Box flex={1} width={responsiveWidth(26)} shadow={5}>
            <Box flex={1} alignItems={"center"}>
              <Image
                source={icon}
                alt={"Image"}
                borderRadius={responsiveWidth(10)}
                size={79}
                borderColor={"blue.100"}
                borderWidth={responsiveWidth(0.8)}
              />
            </Box>
          </Box>
          <Box flex={1}></Box>
          <Box flex={1} alignItems={"center"} justifyContent="flex-end">
            <Text textAlign={"center"} color="warmGray.400" fontSize={responsiveFontSize(2)}>
              {title}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
