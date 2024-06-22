import { Box, Icon, Image, Pressable, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import Feather from "react-native-vector-icons/Feather"

import { usePlayingToysContext } from "../../Context/PlayingToysContext"
export default ({ title, id, icon }: any) => {
  const { onUpdateToy, deleteToyItem } = usePlayingToysContext()
  return (
    <Box>
      <Box flex={1} padding={responsiveWidth(1)}>
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
            <Box flex={1.5} style={{ justifyContent: "center", alignContent: "center" }}>
              <Icon
                as={Feather}
                name="edit"
                size={responsiveHeight(3.5)}
                color="warmGray.500"
                onPress={() => onUpdateToy(id)}
              />
            </Box>
            <Box flex={1.5} style={{ justifyContent: "center", alignContent: "center" }}>
              <Icon
                as={Feather}
                name="trash-2"
                onPress={() => deleteToyItem(id)}
                size={responsiveHeight(3.5)}
                color="warmGray.500"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
