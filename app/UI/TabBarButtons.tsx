import { Box, Text } from "native-base"
import { TouchableOpacity } from "react-native"

import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"

interface IProps {
  onClickToViewTab: Function
  index: number
  title: string
  selectedTabIndex: number
}
import { responsiveHeight } from "react-native-responsive-dimensions"
export default ({ onClickToViewTab, index, title, selectedTabIndex }: IProps) => {
  console.log("seleceted index", selectedTabIndex)

  return (
    <Box
      flex={3}
      alignItems={"center"}
      bg={selectedTabIndex == index ? "red.300" : "red.200"}
      borderBottomWidth={selectedTabIndex == index ? responsiveWidth(1) : 0}
      borderBottomColor={selectedTabIndex == index ? "red.400" : ""}
    >
      <TouchableOpacity
        onPress={() => onClickToViewTab(index)}
        style={{
          width: "100%",
          height: responsiveHeight(6),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Text
            fontSize={selectedTabIndex == index ? responsiveFontSize(1.9) : responsiveFontSize(1.5)}
            color={selectedTabIndex == index ? "white" : "gray.700"}
          >
            {title}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
