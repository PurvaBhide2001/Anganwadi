import { Box, Pressable, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"

export default () => {
  const { btnOne, setBtnOne, btnTwo, setBtnTwo, btnThree, setBtnThree, isExist, setBtnFour } =
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
            setBtnThree(false)
            setBtnFour(false)
          }}
        >
          <Box
            flex={1}
            bgColor={btnOne ? "green.300" : "gray.200"}
            padding={responsiveWidth(2)}
            borderRadius={responsiveWidth(1)}
          >
            <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
              वापरास योग्य
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
            setBtnTwo(false)
            setBtnThree(true)
            setBtnFour(false)
          }}
        >
          <Box
            flex={1}
            bgColor={btnThree ? "green.300" : "gray.200"}
            padding={responsiveWidth(2)}
            borderRadius={responsiveWidth(1)}
          >
            <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
              वापरास अयोग्य
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
            setBtnThree(false)
            setBtnFour(false)
          }}
        >
          <Box
            flex={1}
            bgColor={btnTwo ? "green.300" : "gray.200"}
            padding={responsiveWidth(2)}
            borderRadius={responsiveWidth(1)}
          >
            <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
              तात्काळ दुरुस्तीची गरज
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
            setBtnThree(false)
            setBtnFour(true)
          }}
        >
          <Box
            flex={1}
            bgColor={btnTwo ? "green.300" : "gray.200"}
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
