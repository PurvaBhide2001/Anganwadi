import { Box, Flex, Text } from "native-base"

import { useLoginContext } from "../../../Context/LoginContext"
import MahitiBaghaSubItem from "./MahitiBaghaSubItem"

export default () => {
  const { mainAnganvadiSuvidhaTypesArray } = useLoginContext()
  return (
    <Box flex={1} flexDirection="column" height={"100%"}>
      <Box flex={11}>
        {mainAnganvadiSuvidhaTypesArray.map(({ title, id, icon }: any, i) => (
          <Flex flex={1} key={i}>
            <MahitiBaghaSubItem title={title} id={id} icon={icon} />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
