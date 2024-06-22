import { Box, Text } from "native-base"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

interface IProps {
  title: string
  when: string
  amount: string
  way: string
  place: string
}

function Vaccination1Item({ title, when, amount, way, place }: IProps) {
  const [clicked, setClicked] = useState(false)

  const handlePress = () => {
    setClicked(!clicked)
  }

  return (
    <Box>
      <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1)}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            backgroundColor: "#90cafc",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            color={"white"}
            justifyContent="center"
            fontSize={responsiveFontSize(2.2)}
            padding={responsiveWidth(1.2)}
            paddingLeft={responsiveWidth(3)}
            bold
          >
            {title}
          </Text>
        </TouchableOpacity>
      </Box>

      {clicked && (
        <>
          <Box flex={1} flexDirection="row">
            <Box flex={3}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                कधी द्यावे
              </Text>
            </Box>
            <Box flex={9}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                {when}
              </Text>
            </Box>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={3}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                मात्रा
              </Text>
            </Box>
            <Box flex={9}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                {amount}
              </Text>
            </Box>
          </Box>
          <Box flex={1} flexDirection="row">
            <Box flex={3}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                मार्ग
              </Text>
            </Box>
            <Box flex={9}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                {way}
              </Text>
            </Box>
          </Box>
          <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1.5)}>
            <Box flex={3}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                जागा
              </Text>
            </Box>
            <Box flex={9}>
              <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                {place}
              </Text>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Vaccination1Item
