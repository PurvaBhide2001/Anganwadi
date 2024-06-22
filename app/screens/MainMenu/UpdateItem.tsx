import { Box, Image, Link, Text } from "native-base"
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
      padding={responsiveWidth(1)}
      alignItems={"center"}
      width={responsiveWidth(29)}
      height={responsiveHeight(18)}
    >
      <Image source={item.icon} alt={"Image"} resizeMode="cover" />
      <Box flex={1} alignItems="center" flexDirection="column">
        <TouchableOpacity
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            shadowOpacity: 3,
          }}
          onPress={() => {
            item.url
          }}
        >
          <Box flex={1}>
            <Box flex={1} alignItems={"center"} bg={"red"}>
              <Link color={"blue.600"} href={item.url}>
                <Image
                  height={responsiveHeight(9)}
                  width={responsiveWidth(19)}
                  source={{ uri: item.icon ? item.icon : "" }}
                  resizeMode="cover"
                  alt="something"
                />
              </Link>
            </Box>
          </Box>
        </TouchableOpacity>
        <Box flex={1}> </Box>
        <Box
          flex={1}
          flexWrap="wrap"
          // justifyContent="flex-end"
          alignItems={"center"}

        >
          <Text
            // bg="red.200"
            alignItems={"center"}
            fontSize={responsiveFontSize(1.8)}
            color="#7D8592"
            // fontWeight={600}
            textAlign="center"
            style={{ flexWrap: "wrap" }}
          >
            {item.title}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
