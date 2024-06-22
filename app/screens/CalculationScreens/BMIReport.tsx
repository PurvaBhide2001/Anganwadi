import { Box, Image, Text } from "native-base"
import { Touchable, TouchableOpacity } from "react-native"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { navigate } from "../../navigators"
interface IProps {
  title: string
  description: any
  bgColor: any
  borderColor: any
  name: string
  icon?: any
}
export default ({ title, description="description", bgColor="red.100", borderColor="yellow.300", name="some", icon }: IProps) => {
  return (
    <Box
      flex={1}
      // height={responsiveHeight(18)}
      padding={responsiveWidth(0.5)}
      alignItems={"center"}
      width={responsiveWidth(10)}
    >
      <Box
        flex={1}
        width={"100%"}
        bg={bgColor}
        borderColor={borderColor}
        borderWidth={responsiveWidth(0.5)}
        borderTopRightRadius={responsiveWidth(10)}
        borderRadius={responsiveWidth(2)}
        padding={responsiveWidth(1)}
        alignItems="center"
      >
        <Box flex={1} flexDirection="row">
          <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.700"} bold>
            {title}
          </Text>

          <Box flex={1} position="relative" alignItems={"flex-end"}>
            <Box flex={1} position="absolute" top={-15} right={-10}>
              <Image
                source={icon}
                alt={"Image"}
                height={responsiveHeight(5)}
                width={responsiveWidth(8)}
              />
            </Box>
          </Box>
        </Box>

        <Text fontSize={responsiveFontSize(2)}>{description}</Text>
        <Box flex={1} flexDirection="row" alignItems={"flex-end"}>
          <Box
            style={{
              backgroundColor: "#ffffff",
              height: responsiveHeight(3),
              width: "90%",
              borderRadius: responsiveWidth(2),
            }}
          >
            <Text
              textAlign="center"
              color={"#000000"}
              justifyContent="center"
              fontSize={responsiveFontSize(1.9)}
            >
              {name}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box flex={1} alignItems={"center"}>
        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: responsiveWidth(1),
            backgroundColor: "pink",
            padding: responsiveWidth(2),
          }}
          onPress={() => navigate("BMI")}
        >
          <Text color={"white"} fontSize={responsiveFontSize(2)} bold>
            बी एम आय गणना करा
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
