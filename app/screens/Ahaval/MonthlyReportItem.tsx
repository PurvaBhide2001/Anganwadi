import { Box, Text, Image, Avatar } from "native-base"
import { TouchableOpacity } from "react-native"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import AntDesign from "react-native-vector-icons/AntDesign"

interface IProps {
  title: string
  icon: any
  navigation: Function
}

export default ({ title, icon, navigation }: IProps) => {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation()}>
      <Box flex={1} flexDirection="row" bgColor="warmGray.200" width="100%">
        <Box
          flexDirection="row"
          bgColor="white"
          height={responsiveHeight(8)}
          borderBottomWidth={responsiveWidth(0.2)}
          width="100%"
          borderBottomColor="warmGray.200"
        >
          <Box flex={2} justifyContent="center" flexDirection="column" alignItems="center">
            <Image
              source={icon}
              padding={responsiveHeight(1)}
              resizeMode="contain"
              height={"85%"}
              alt="icon"
            />
          </Box>
          <Box flex={8} justifyContent="center" flexDirection="column" alignItems="flex-start">
            <Text
              fontSize={responsiveFontSize(2.2)}
              color="#7D8592"
              paddingTop={responsiveHeight(1)}
            >
              {title}
            </Text>
          </Box>
          <Box flex={1} justifyContent="center" flexDirection="column" alignItems="flex-start">
            <AntDesign name="right" color="#5dbe9a" size={responsiveWidth(5)} />
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
