import { Box, Image, Text } from "native-base"
import { Touchable, TouchableOpacity } from "react-native"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

export default ({ item }: any) => {
  return (
    <Box flex={1} padding={responsiveWidth(2)}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => item.navigation()}>
        <Box flex={1} width={responsiveWidth(19)}>
          <Box
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            borderColor={item.borderColor}
            borderWidth={responsiveWidth(0.6)}
            bgColor={item.bgColor}
            height={responsiveHeight(7.5)}
            borderRadius={responsiveWidth(3)}
            shadow={8}
            padding={responsiveWidth(1)}
          >
            <Image source={item.icon} alt={"Image"} width="100%" height={"100%"} />
          </Box>
        </Box>
        <Box flex={1} alignItems={"center"}>
          <Text
            paddingTop={responsiveHeight(1)}
            textAlign={"center"}
            color="#7D8592"
            fontSize={responsiveFontSize(1.9)}
          >
            {item.title}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
