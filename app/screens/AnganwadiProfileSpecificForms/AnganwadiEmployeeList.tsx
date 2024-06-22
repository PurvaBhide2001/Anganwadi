import { Box, Flex, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useLoginContext } from "../../Context/LoginContext"
import { usePlayingToysContext } from "../../Context/PlayingToysContext"
import AnganwadiEmployeeItem from "./AnganwadiEmployeeItem"
import { useAnganwadiEmployeeContext } from "../../Context/AnganwadiEmployeeContext"

export default () => {
  const { addedPlayingToysArray } = useLoginContext()
  const { staffList } = useAnganwadiEmployeeContext()

  return (
    <Box flex={1} flexDirection="column" height={"100%"}>
      <Box flex={11}>
        {staffList.map(({ f_name, m_name, l_name, id, role }: any, i) => (
          <Flex flex={1} key={i}>
            <AnganwadiEmployeeItem
              firstName={f_name}
              middleName={m_name}
              lastName={l_name}
              id={id}
              role={role}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
