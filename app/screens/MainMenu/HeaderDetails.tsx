import { bg } from "date-fns/locale"
import { Box, Icon, Input, Text } from "native-base"
import React from "react"
import { ImageBackground } from "react-native"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import Feather from "react-native-vector-icons/Feather"
import { useLoginContext } from "../../Context/LoginContext"

export default () => {
  const { useData } = useLoginContext()
  return (
    <Box flex={1} flexDirection="column" bg="gray.100">
      <Box flex={1} padding={responsiveWidth(1)}>
        <Input
          shadow={1}
          placeholder="Search People & Places"
          width="100%"
          // borderRadius={responsiveWidth(4.0)}
          fontSize={responsiveWidth(3)}
          bg="white"
          InputLeftElement={<Icon m="2" ml="3" color="gray.400" as={<Feather name="search" />} />}
          InputRightElement={
            <Icon m="2" mr="3" size="6" color="gray.400" as={<Feather name="mic" />} />
          }
        />
      </Box>
      <Box flex={1} paddingX={responsiveWidth(3)} paddingY={responsiveWidth(1.8)}>
        <Text fontSize={responsiveWidth(3.5)} fontWeight={400} color={"warmGray.600"}>
          {useData?.f_name} {useData?.l_name}, आपले सहर्ष स्वागत आहे
        </Text>
        <Text fontSize={responsiveWidth(3.2)} fontWeight={600} color={"warmGray.600"}>
          माझी अंगणवाडी - महिला व बाल विकासाचे केंद्र
        </Text>
      </Box>
    </Box>
  )
}
