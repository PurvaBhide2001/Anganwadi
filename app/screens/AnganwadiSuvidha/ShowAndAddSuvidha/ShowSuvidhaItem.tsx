import { Box, Image, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useAnganwadiSuvidhaContext } from "../../../Context/AnganwadiSuvidhaContext"
import { useSuvidhaDetailShowContext } from "../../../Context/SuvidhaDetailShowContext"
import { monthDateFormat } from "../../../filter/dateAndTimeFormat"
import { randIntWithZero } from "../../../filter/requireFunction"

interface IProps {
  date: string
  bgColor: any
}

export default ({ date, bgColor }: IProps) => {
  const { ShowAllSuvidha } = useAnganwadiSuvidhaContext()
  const { OnPressToShowDoneServiceList } = useSuvidhaDetailShowContext()

  const colorObject = ShowAllSuvidha[randIntWithZero(ShowAllSuvidha.length)]

  const image = require("../../../../assets/surveyimages/MainMenu/monthly.png")
  return (
    <>
      <Box height={responsiveHeight(18)} width={"33.33%"} flexDirection="row">
        <Box flex={1} padding={responsiveWidth(1)}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => OnPressToShowDoneServiceList(date)}>
            <Box
              flex={1}
              alignItems={"center"}
              justifyContent={"center"}
              bgColor={colorObject.bgColor}
              borderRadius={responsiveWidth(4)}
              shadow={8}
              padding={responsiveWidth(1)}
            >
              <Box flex={1} justifyContent={"center"} paddingTop={responsiveHeight(3)}>
                <Image source={image} alt="image" resizeMode="contain" />
              </Box>
              <Box flex={1} alignItems={"center"}>
                <Text
                  paddingTop={responsiveHeight(1)}
                  textAlign={"center"}
                  color="#ffffff"
                  fontSize={responsiveFontSize(1.8)}
                  bold
                >
                  {monthDateFormat("MMMM YYYY", date, "en")}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  )
}
