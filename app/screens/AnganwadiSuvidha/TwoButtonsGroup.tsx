import { Box, Pressable, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"

export default () => {
  const { btnOne, setBtnOne, btnTwo, setBtnTwo, btnThree, setBtnThree, isExist } =
    useAnganwadiSuvidhaContext()
  return (
    <>
      <Box flex={1} padding={responsiveWidth(2)} height={responsiveHeight(8)}>
        <Pressable
          disabled={isExist}
          height="100%"
          onPress={() => {
            setBtnOne(true)
            setBtnTwo(false)
          }}
        >
          <Box
            flex={1}
            bgColor={btnOne ? "green.300" : "gray.200"}
            padding={responsiveWidth(2)}
            borderRadius={responsiveWidth(1)}
          >
            <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
              उपलब्ध आहे
            </Text>
          </Box>
        </Pressable>
      </Box>
      <Box flex={1} padding={responsiveWidth(2)} height={responsiveHeight(8)}>
        <Pressable
          disabled={isExist}
          height="100%"
          onPress={() => {
            setBtnOne(false)
            setBtnTwo(true)
          }}
        >
          <Box
            flex={1}
            bgColor={btnThree ? "green.300" : "gray.200"}
            padding={responsiveWidth(2)}
            borderRadius={responsiveWidth(1)}
          >
            <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
              उपलब्ध नाही
            </Text>
          </Box>
        </Pressable>
      </Box>
    </>
  )
}
