import { Box, Image, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

export default ({ item }: any) => {
  return (
    <Box
      flex={1}
      width={"1%"}
      height={responsiveHeight(15)}
      padding={responsiveWidth(2)}
      alignItems={"center"}
    >
      <TouchableOpacity
        style={{ flex: 1, width: "100%", height: "100%" }}
        onPress={() => item.navigation()}
      >
        <Box
          flex={1}
          width={responsiveWidth(32.5)}
          bg={item.bgColor}
          borderColor={item.borderColor}
          borderWidth={responsiveWidth(0.8)}
          borderTopRightRadius={responsiveWidth(8)}
          borderBottomLeftRadius={responsiveWidth(8)}
          shadow={5}
        >
          <Box flex={0.5}></Box>
          <Box flex={1} alignItems={"center"}>
            <Image source={item.icon} alt={"Image"} />
          </Box>
          <Box flex={0.5}></Box>

          <Box flex={1} alignItems={"center"}>
            <Text textAlign={"center"} color="warmGray.400" fontSize={responsiveFontSize(2)}>
              {item.title}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
