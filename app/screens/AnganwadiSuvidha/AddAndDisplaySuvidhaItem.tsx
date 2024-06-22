import { Box, Image, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"

interface IProps {
  title: string
  bgColor: any
  navigation: Function
  image: any
}

export default ({ title, bgColor, image, navigation }: IProps) => {
  const { suvidhaMain } = useAnganwadiSuvidhaContext()
  // const image = require("../../../../assets/surveyimages/MainMenu/monthly.png")
  return (
    <>
      <Box height={responsiveHeight(18)} width={"50%"} flexDirection="row">
        <Box flex={1} padding={responsiveWidth(1.5)}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation()}>
            <Box
              flex={1}
              alignItems={"center"}
              justifyContent={"center"}
              bgColor={bgColor}
              borderRadius={responsiveWidth(4)}
              shadow={8}
              padding={responsiveWidth(1)}
            >
              <Box flex={1} justifyContent={"center"} paddingTop={responsiveHeight(3)}>
                <Image
                  source={image}
                  alt="image"
                  height={responsiveHeight(7)}
                  resizeMode="contain"
                ></Image>
              </Box>
              <Box flex={1} alignItems={"center"}>
                <Text
                  paddingTop={responsiveHeight(1)}
                  textAlign={"center"}
                  color="white"
                  fontSize={responsiveFontSize(2)}
                  bold
                >
                  {title}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  )
}
