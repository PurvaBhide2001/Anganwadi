import { Box, Image, Pressable, Text } from "native-base"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../../Context/AnganwadiSuvidhaContext"
export default ({ title, id, icon }: any) => {
  const { openModal, onPressToViewTypeList } = useAnganwadiSuvidhaContext()

  return (
    <Box flex={1} flexDirection="row">
      <Box flex={0.5}></Box>
      <Box flex={10.5}>
        <Pressable
          onPress={() => {
            // onPressToViewTypeList(id)
          }}
          height={responsiveHeight(10)}
          padding={responsiveWidth(1.3)}
          paddingLeft={responsiveWidth(8)}
        >
          <Box
            flex={1}
            flexDirection="row"
            height={responsiveHeight(8)}
            bgColor="white"
            borderRadius={responsiveWidth(2)}
          >
            <Box flex={1} flexDirection="row">
              <Box
                flex={2}
                alignItems="center"
                style={{ justifyContent: "center", alignContent: "center" }}
              >
                {icon && (
                  <Image
                    style={{ height: "60%", width: "100%" }}
                    source={{
                      uri: `${icon}`,
                    }}
                    resizeMode="contain"
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
      </Box>
    </Box>
  )
}
