import React, { useState } from "react"
import { Box, Input, Radio, Text, View } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import InputField2 from "./InputField2"
import { useUserProfileContextContext } from "../Context/UserProfileContext"
import { navigate } from "../navigators"

const MyRadioButtons2 = () => {
  const [selectedOption, setSelectedOption] = useState("")
  //   const { control } = useUserProfileContextContext()

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }
  return (
    <Box flex={1} paddingY={responsiveWidth(5)}>
      <Radio.Group
        name="options"
        flex={1}
        flexDirection="row"
        value={selectedOption}
        onChange={handleOptionSelect}
      >
        <Box flex={4} paddingLeft={responsiveWidth(8)}>
          <Radio value="0">
            <Text color="warmGray.500">होय</Text>
          </Radio>
        </Box>
        <Box flex={4} paddingY={responsiveWidth(1)} paddingLeft={responsiveWidth(8)}>
          <Radio value="1">
            <Text color="warmGray.500">नाही</Text>
          </Radio>
        </Box>
        <Box flex={4} paddingY={responsiveWidth(1)}></Box>
      </Radio.Group>
    </Box>
  )
}

export default MyRadioButtons2
