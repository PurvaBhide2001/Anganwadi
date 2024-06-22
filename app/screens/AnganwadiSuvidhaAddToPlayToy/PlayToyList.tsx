import { Box, Flex, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useLoginContext } from "../../Context/LoginContext"
import { usePlayingToysContext } from "../../Context/PlayingToysContext"

import PlayToyItem from "./PlayToyItem"

export default () => {
  const { addedPlayingToysArray } = useLoginContext()

  return (
    <Box flex={1} flexDirection="column" height={"100%"}>
      <Box flex={11}>
        {addedPlayingToysArray.map(({ title, id, icon }: any, i) => (
          <Flex flex={1} key={i}>
            <PlayToyItem title={title} id={id} icon={icon} />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
