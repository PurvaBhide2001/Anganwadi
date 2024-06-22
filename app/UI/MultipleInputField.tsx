import React, { useState } from "react"
import { View, Input, Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import InputField2 from "./InputField2"
import { useUserProfileContextContext } from "../Context/UserProfileContext"

const NumberInput = () => {
  const [numberOfFields, setNumberOfFields] = useState(0)

  const handleInputChange = (value) => {
    // Update the state with the new number of fields
    setNumberOfFields(value)
  }
  const { control } = useUserProfileContextContext()

  const renderInputFields = () => {
    // Use a loop to render the desired number of Input fields
    const inputFields = []
    for (let i = 0; i < numberOfFields; i++) {
      inputFields.push(
        <Box flex={1} bg={"white"} paddingBottom={responsiveWidth(12)}>
          <Box flex={1} flexDirection="row">
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <InputField2
                control={control}
                name={""}
                placeholder={"नाव"}
                keyPadType={undefined}
                variant="underlined"
                inputRightElementTopRightRadius={0}
                inputRightElementBottomRightRadius={0}
                inputRightElementBorderWidth={0}
              />
            </Box>
          </Box>
          <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <InputField2
                control={control}
                name={""}
                placeholder={"दूरध्वनी"}
                keyPadType={"phone-pad"}
                variant="underlined"
                inputRightElementTopRightRadius={0}
                inputRightElementBottomRightRadius={0}
                inputRightElementBorderWidth={0}
              />
            </Box>
          </Box>
          <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <InputField2
                control={control}
                name={""}
                placeholder={"प्रकार"}
                keyPadType={undefined}
                variant="underlined"
                inputRightElementTopRightRadius={0}
                inputRightElementBottomRightRadius={0}
                inputRightElementBorderWidth={0}
              />
            </Box>
          </Box>
        </Box>,
      )
    }
    return inputFields
  }

  return (
    <View>
      <Input
        placeholder={"कृपया संख्या प्रविष्ट करा"}
        size={1}
        keyboardType="numeric"
        onChangeText={handleInputChange}
        borderBottomColor={"warmGray.300"}
        borderColor={"white"}
      />
      {renderInputFields()}
    </View>
  )
}

export default NumberInput
