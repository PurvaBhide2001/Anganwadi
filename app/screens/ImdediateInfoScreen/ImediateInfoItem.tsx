import { Box, Image, Pressable, Text } from "native-base"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useImdediateInfoContext } from "../../Context/ImdediateInfoContext"
export default ({ title, id, icon, nav }: any) => {
  const { getImediateInfoReport } = useImdediateInfoContext()
  return (
    <Pressable
      onPress={() => {
        nav()
        getImediateInfoReport()
      }}
      height={responsiveHeight(12)}
      padding={responsiveWidth(1.2)}
    >
      <Box
        flex={1}
        flexDirection="row"
        height={responsiveHeight(10)}
        bgColor="white"
        borderRadius={responsiveWidth(2)}
      >
        <Box flex={1} flexDirection="row">
          <Box
            flex={2}
            alignItems="center"
            padding={responsiveWidth(2.2)}
            style={{ justifyContent: "center", alignContent: "center" }}
          >
            <Image source={icon} style={{ flex: 1 }} resizeMode="contain" alt={"Image"} />
          </Box>
          <Box flex={0.5}></Box>
          <Box flex={8} style={{ justifyContent: "center", alignContent: "center" }}>
            <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
              {title}
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  )
}
