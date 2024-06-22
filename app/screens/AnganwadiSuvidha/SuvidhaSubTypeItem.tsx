import { Box, Image, Pressable, Text } from "native-base"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
export default ({ title, id, icon }: any) => {
  const { openModal, onPressToViewTypeList, onPressViewParticularSuvidha } =
    useAnganwadiSuvidhaContext()

  return (
    <Pressable
      onPress={() => {
        onPressViewParticularSuvidha(id)
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
            padding={responsiveWidth(3)}
            style={{ justifyContent: "center", alignContent: "center" }}
          >
            {icon && (
              <Image
                style={{ height: "100%", width: responsiveWidth(17) }}
                source={{
                  uri: `${icon}`,
                }}
                resizeMode="cover"
                alt={"Image"}
              />
            )}
          </Box>
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
