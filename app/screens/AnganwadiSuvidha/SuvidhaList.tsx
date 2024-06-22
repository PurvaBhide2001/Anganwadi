import { Box, Flex } from "native-base"

import { useLoginContext } from "../../Context/LoginContext"

import SuvidhaItem from "./SuvidhaItem"

export default () => {
  const { mainAnganvadiSuvidhaTypesArray } = useLoginContext()
  return (
    <Box flex={1} flexDirection="column" height={"100%"}>
      <Box flex={11}>
        {mainAnganvadiSuvidhaTypesArray.map(({ title, id, icon }: any, i) => (
          <Flex flex={1} key={i}>
            <SuvidhaItem title={title} key={i} id={id} icon={icon} />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
