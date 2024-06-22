import { Box, Flex, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useImdediateInfoContext } from "../../Context/ImdediateInfoContext"

import ImediateInfoItem from "./ImediateInfoItem"

export default () => {
  const { suvidha } = useImdediateInfoContext()
  return (
    <Box flex={1} flexDirection="column" height={"100%"}>
      <Box flex={11}>
        {suvidha.map(({ title, id, icon, nav }: any, i) => (
          <Flex flex={1} key={i}>
            <ImediateInfoItem title={title} id={id} icon={icon} nav={nav} />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
