import { Box, FlatList, HStack, Image, Spacer, Text, VStack } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useImediateInformationContext } from "../Context/ImediateInformationContext"

export default ({ data }: any) => {
  const { passToTheData } = useImediateInformationContext()
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => passToTheData(item)}>
          <Box
            borderBottomWidth={responsiveWidth(0.5)}
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.300"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py={responsiveHeight(2)}
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              {/* <Avatar size="48px" source={{
            uri: item.avatarUrl
          }} /> */}
              <Box flex={2} alignItems="center" padding={responsiveWidth(1.5)}>
                <Image source={item.icon} resizeMode="cover" alt="some" />
              </Box>
              <Box flex={10} justifyContent="center">
                <Text
                  fontSize={responsiveFontSize(2.1)}
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.600"
                  bold
                >
                  {item.name}
                </Text>
              </Box>
              <Spacer />
            </HStack>
          </Box>
        </TouchableOpacity>
      )}
      keyExtractor={(item: any) => item?.id.toString()}
    />
  )
}
