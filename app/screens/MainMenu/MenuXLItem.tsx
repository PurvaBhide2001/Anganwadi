import { Box, Text, Image } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
interface IProps {
  title: string
  icon: any
  bgcolor: string

  event: Function
  itemList: any[]
  count: string
}
export default ({ title, icon, bgcolor, event, itemList, count }: IProps) => {
  return (
    <Box width="50%" height={responsiveHeight(26)} padding={responsiveWidth(1)}>
      <TouchableOpacity
        style={{ flex: 1, borderRadius: responsiveWidth(7) }}
        onPress={() => event()}
      >
        <Box
          flex={1}
          bgColor={bgcolor}
          style={{ backgroundColor: bgcolor }}
          borderRadius={responsiveWidth(2)}
          padding={responsiveWidth(2)}
          shadow={4}
        >
          <Box flex={1} style={{ backgroundColor: bgcolor }} flexDirection="column">
            <Box flex={1} flexDirection="column">
              <Text fontSize={responsiveFontSize(2)} color={"#7d8592"} textAlign={"left"} bold>
                {title}
              </Text>
              <Box flex={0.1}></Box>

              <Box flex={1} flexDirection="row">
                <Box flex={0.1} flexDirection="column"></Box>
                <Box flex={1} flexDirection="column">
                  {itemList.map((item) => (
                    <>
                      <Box flex={1}>
                        <Text fontSize={responsiveFontSize(1.9)} color={"#8f94a2"}>
                          {item}
                        </Text>
                      </Box>
                    </>
                  ))}
                </Box>
              </Box>

              {/* <Box flex={1}>
                <Text fontSize={responsiveFontSize(2)}>3+</Text>
              </Box> */}

              <Box flex={1} flexDirection="row" alignItems={"flex-end"}>
                <Box flex={1} flexDirection="column">
                  <Box flex={1} alignItems={"flex-start"}>
                    <Text
                      fontSize={responsiveFontSize(2.2)}
                      alignItems={"center"}
                      color={"orange.500"}
                      width="10"
                      textAlign="center"
                      justifyContent="center"
                      flex={1}
                    >
                      {count}
                    </Text>
                  </Box>
                  <Box flex={1} flexDirection="column">
                    <Box
                      style={{
                        backgroundColor: "#e9696e",
                        height: "60%",
                        width: "105%",
                        borderRadius: responsiveWidth(2),
                      }}
                    >
                      <Text
                        textAlign="center"
                        color={"white"}
                        justifyContent="center"
                        fontSize={responsiveFontSize(1.7)}
                        // padding={responsiveHeight(0.2)}
                      >
                        अधिक माहिती
                      </Text>
                    </Box>
                  </Box>
                </Box>

                <Box flex={1} alignItems="flex-end" justifyItems="center" justifyContent="center">
                  <Image source={icon} resizeMode="cover" alt="something" />
                </Box>
                <Box flex={0.1} alignItems="flex-end"></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
