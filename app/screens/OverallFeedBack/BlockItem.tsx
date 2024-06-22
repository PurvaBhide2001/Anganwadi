import { Box, Center, Text } from "native-base"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

export default ({ item }: any) => {
  return (
    <Box
      flex={1}

      padding={responsiveWidth(1.5)}
      height={responsiveHeight(40)}
      borderRadius={responsiveWidth(3.3)}
    >
      <Text fontSize={responsiveFontSize(2.2)} color={item.titleColor} fontWeight={responsiveWidth(2.5)}>{item.title}</Text>

      <Box
        flex={1}
        flexDirection="column"
        bgColor={item.bgColor}
        borderBottomColor={item.borderBottomColor}
        padding={responsiveWidth(2)}
        borderRadius={responsiveWidth(3.6)}
        borderBottomWidth={responsiveWidth(2.5)}
      // titleColor={item.titleColor}
      >

        <Box flex={1} flexDirection="row" margin={responsiveWidth(2)}>
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>मूल्यमापन दिनांक</Text>
          </Center>
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>{item.evaluationDate}</Text>
          </Center>
        </Box>
        <Box flex={1} flexDirection="row">
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>उंची (सेमी)</Text>
          </Center>
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>{item.height}</Text>
          </Center>
        </Box>
        <Box flex={1} flexDirection="row">
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>वजन (किलो)</Text>
          </Center>
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>{item.weight}</Text>
          </Center>
        </Box>
        <Box flex={1} flexDirection="row">
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>बी एम आय</Text>
          </Center>
          <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>{item.bmi}</Text>
          </Center>
        </Box>

        <Box flex={1} paddingLeft={responsiveWidth(2)} padding={responsiveWidth(1)} flexDirection="row">
          {/* <Center flex={6}>
            <Text fontSize={responsiveFontSize(2.2)}>मूल्यमापन दिनांक</Text>
          </Center> */}
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color={"cyan.600"}>एकंदर अभिप्राय</Text>
          </Box>
        </Box>
        <Box flex={1} paddingLeft={responsiveWidth(2)} flexDirection="row">
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} borderBottomColor="grey" color={"cyan.600"} borderBottomWidth={responsiveWidth(0.2)}>पालक</Text>
          </Box>
        </Box>
        <Box flex={1} paddingLeft={responsiveWidth(2)} flexDirection="row">
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color={"cyan.600"}>सेविका</Text>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}
