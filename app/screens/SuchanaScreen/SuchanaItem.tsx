import { Box, Text, Image, Avatar } from "native-base"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useSuchanaContext } from "../../Context/SuchanaContext"
import { randIntWithZero } from "../../filter/requireFunction"
import { navigate } from "../../navigators"
interface IProps {
  title: string
  desc: string
  borderColor: string
  bg: string
}

export default ({ item }: any) => {
  const { colorData, showByParticularSuchana } = useSuchanaContext()
  const giveColorData = colorData[randIntWithZero(colorData.length)]
  const icon = require("../../../assets/surveyimages/Suchana/cork-board.png")
  return (
    <Box width="100%" padding={responsiveWidth(2)}>
      <Box flex={1} paddingY={responsiveWidth(4)}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => showByParticularSuchana(item, giveColorData)}
        >
          <Box flex={1} flexDirection="column" paddingX={responsiveWidth(2)}>
            <Box
              flex={1}
              flexDirection="column"
              bg="white"
              borderBottomRadius={responsiveWidth(3)}
              borderColor={giveColorData.borderColor}
              borderWidth={responsiveWidth(0.2)}
              borderBottomWidth={responsiveWidth(1.2)}
              shadow={5}
            >
              <Box flex={1} flexDirection="row">
                <Box
                  position="absolute"
                  top={-27}
                  left={2}
                  alignSelf={"flex-start"}
                  height={responsiveHeight(6)}
                  width={"13%"}
                  borderRadius={responsiveWidth(9)}
                  zIndex={3}
                >
                  <Image
                    source={icon}
                    resizeMode="cover"
                    height={responsiveHeight(6.5)}
                    alt="icon"
                  />
                </Box>
              </Box>
              <Box
                flex={1}
                padding={responsiveWidth(5)}
                paddingTop={responsiveWidth(8)}
                bg={giveColorData.bg}
              >
                <Text
                  fontSize={responsiveFontSize(2.1)}
                  color="#7D8592"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  bold
                >
                  {item?.title}
                </Text>
              </Box>
              <Box flex={1} padding={responsiveWidth(5)}>
                <Text
                  fontSize={responsiveFontSize(2)}
                  color="#7D8592"
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item?.description}
                </Text>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
