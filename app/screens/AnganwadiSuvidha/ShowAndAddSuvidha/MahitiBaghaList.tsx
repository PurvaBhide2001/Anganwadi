import { Box, Flex, Text } from "native-base"

import { useLoginContext } from "../../../Context/LoginContext"
import { useSuvidhaDetailShowContext } from "../../../Context/SuvidhaDetailShowContext"
import MahitiBaghaItem from "./MahitiBaghaItem"

export default () => {
  const { mainAnganvadiSuvidhaTypesArray } = useLoginContext()
  const { selectedServicesArray } = useSuvidhaDetailShowContext()
  return (
    <Box flex={1} flexDirection="column" height={"100%"}>
      <Box flex={11}>
        {selectedServicesArray.map((item: any, i) => (
          <Flex flex={1} key={i}>
            <MahitiBaghaItem item={item} />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
