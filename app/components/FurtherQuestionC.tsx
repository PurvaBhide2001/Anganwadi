import { Box, Radio, Text } from "native-base"
import React, { useState } from "react"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"

export default () => {
  const [value, setValue] = React.useState("one")
  return (
    <Box flex={1} padding={responsiveWidth(2)}>
      <Box flex={1}>
        <Text fontSize={responsiveFontSize(2.3)}>1) आपली अंगणवाडी स्मार्ट अंगणवाडी आहे का ?</Text>
      </Box>
      <Box flex={1} paddingY={responsiveWidth(2)}>
        <Radio.Group
          name="myRadioGroup"
          value={value}
          flex={1}
          flexDirection="row"
          onChange={(nextValue) => {
            setValue(nextValue)
          }}
        >
          <Radio flex={1} value="one" mx="2">
            होय
          </Radio>
          <Radio flex={1} value="two" mx="3">
            नाही
          </Radio>
        </Radio.Group>
      </Box>
      <Box flex={10}></Box>
    </Box>
  )
}
