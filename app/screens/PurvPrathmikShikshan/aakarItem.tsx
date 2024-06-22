import { Box, Image, Link, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useSuvidhaDetailShowContext } from "../../Context/SuvidhaDetailShowContext"
import { monthDateFormat } from "../../filter/dateAndTimeFormat"
import { randIntWithZero } from "../../filter/requireFunction"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import { navigate } from "../../navigators"

interface IProps {
  title: string
  bgColor: any
  date: any
  file: any
}

export default ({ date, title, bgColor, file }: IProps) => {
  const { akarMonth } = usePurvPrathmikContextContext()
  const colorObject = akarMonth[randIntWithZero(akarMonth.length)]
  const image = require("../../../assets/surveyimages/MainMenu/monthly.png")
  return (
    <>
      <Link href={file} width={"33%"}>
        <Box height={responsiveHeight(18)} width={"100%"} flexDirection="row">
          <Box flex={1} padding={responsiveWidth(1)}>
            <Box style={{ flex: 1 }}>
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
                    {monthDateFormat("MMMM YYYY", date, "")}
                    {/* {date} */}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  )
}
