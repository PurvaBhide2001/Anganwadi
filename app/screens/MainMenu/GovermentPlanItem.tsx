import { Box, Text, Image } from "native-base"
import { ImageBackground, TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useSchemeContext } from "../../Context/SchemeContext"
import { randIntWithZero } from "../../filter/requireFunction"
interface IProps {
  title: string
  icon: any
  // textColor: string
  id: number
}
export default ({ title, icon, id }: IProps) => {
  const { onPressToView } = useSchemeContext()
  const { govermentPlanList } = useMainMenuContext()
  return (
    <Box width="33%" height={responsiveHeight(30)} padding={responsiveWidth(0.8)}>
      <ImageBackground
        source={govermentPlanList[randIntWithZero(govermentPlanList.length)].backGroundImage}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={() => onPressToView(id)}>
          <Box flex={1} alignItems={"center"}>
            <Box flex={1} flexDirection="column">
              <Box flex={0.1}></Box>
              <Box flex={1}>
                <Text
                  fontSize={responsiveFontSize(2)}
                  padding={responsiveWidth(3)}
                  color={"#7d8592"}
                  textAlign={"left"}
                  bold
                  fontWeight={responsiveWidth(1.5)}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
              </Box>
              <Box flex={1} alignItems="center" justifyItems="center" justifyContent="center">
                {icon && (
                  <Image
                    height={responsiveHeight(9)}
                    width={responsiveWidth(19)}
                    source={{ uri: icon ? icon : "" }}
                    resizeMode="cover"
                    alt="something"
                  />
                )}
                <Box flex={0.5} padding={responsiveWidth(4)}></Box>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </ImageBackground>
    </Box>
  )
}
