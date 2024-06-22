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
  icon: any
  bmiConclusionImage: any
}
export default ({
  title,
  description,
  bgColor,
  borderColor,
  name,
  icon,
  bmiConclusionImage,
}: IProps) => {
  console.log("bmi report", title, description, bgColor)

  return (
    <Box flex={1} padding={responsiveWidth(0.5)} alignItems={"center"} width={responsiveWidth(10)}>
      <Box
        flex={1}
        width={"100%"}
        bg={bgColor}
        borderColor={borderColor}
        borderWidth={responsiveWidth(1)}
        borderTopRightRadius={responsiveWidth(10)}
        borderRadius={responsiveWidth(2)}
        padding={responsiveWidth(1)}
        alignItems="center"
      >
        <Box flex={1} flexDirection="row" alignItems="center">
          <Text
            width={"100%"}
            fontSize={responsiveFontSize(3)}
            textAlign="center"
            color={"#ffffff"}
            bold
          >
            {title}
          </Text>

          <Box flex={1} position="relative" alignItems={"flex-end"}>
            <Box flex={1} position="absolute" top={-15} right={-10}>
              <Image
                source={icon}
                alt={"Image"}
                height={responsiveHeight(7)}
                width={responsiveWidth(9)}
              />
            </Box>
          </Box>
        </Box>

        <Text fontSize={responsiveFontSize(2)}>{description}</Text>
        <Box flex={1} flexDirection="row" alignItems={"center"} padding={responsiveWidth(2)}>
          <Box
            style={{
              backgroundColor: "#ffffff",
              height: responsiveHeight(5),
              width: "90%",
              borderRadius: responsiveWidth(2),
              justifyContent: "center",
              // padding: responsiveWidth(2),
            }}
          >
            <Text
              textAlign="center"
              color={"#000000"}
              justifyContent="center"
              fontSize={responsiveFontSize(2.2)}
            >
              बी एम आय : {name} kg/m2
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
