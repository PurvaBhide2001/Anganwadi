import React, { useState } from "react"
import { Box, Input, Radio, Text, View } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import InputField2 from "./InputField2"
import { useUserProfileContextContext } from "../Context/UserProfileContext"
import { navigate } from "../navigators"
import { useAnganwadiProfileContext } from "../Context/AnganwadiProfileContext"
interface IProps {
  control: any
}
const MyRadioButtons = (control: IProps) => {
  const [selectedOption, setSelectedOption] = useState("")
  // const { control } = useUserProfileContextContext()
  const { awcMiniType, WorkerhandleSubmit, WorkerControl } = useAnganwadiProfileContext()

  const handleOptionSelect = (option) => {
    console.log("option", typeof option)

    setSelectedOption(option)
  }

  const renderAdditionalFields = () => {
    if (selectedOption == "0") {
      return (
        <>
          <Box flex={1}>
            <Box flex={1} flexDirection="row">
              <Box flex={1} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={control}
                  name={"f_name m_name l_name"}
                  placeholder={"नाव"}
                  keyPadType={"default"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box>
            {/* <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={1} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={control}
                  name={"contact_number"}
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
                  name={"email"}
                  placeholder={"ई-मेल"}
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
                  placeholder={"प्रकार"}
                  keyPadType={undefined}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box> */}
          </Box>
        </>
      )
    } else {
      return null
    }
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
      {renderAdditionalFields()}
    </Box>
  )
}

export default MyRadioButtons
