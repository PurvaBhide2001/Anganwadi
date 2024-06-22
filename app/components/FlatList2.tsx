import { Box, FlatList, HStack, Image, Spacer, Text, VStack } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

interface IProps {
  data: any
  Component: Function
  isScrollEnabled: boolean
  isHorizontal: boolean
  flatListRef?: any
}
export default ({ Component, data, isScrollEnabled, isHorizontal, flatListRef }: IProps) => {
  return (
    <FlatList
      // ref={flatListRef ? flatListRef : ""}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      // contentContainerStyle={{ padding: responsiveWidth(1) }}
      // style={{ flex: 1, flexWrap: "wrap", backgroundColor: "red" }}

      horizontal={isHorizontal}
      data={data}
      scrollEnabled={isScrollEnabled}
      renderItem={({ item }) => <Component item={item} key={item?.id} />}
      keyExtractor={(item: any) => {
        return item?.id.toString()
      }}
    />
  )
}

/* 



*/
