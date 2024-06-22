import { Box } from "native-base"
import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import { responsiveWidth } from "react-native-responsive-dimensions"
import InputField2 from "../UI/InputField2"
import { useUserProfileContextContext } from "./UserProfileContext"

interface RadioButtonRenderContextInterface {
  renderAdditionalFields: Function
}
const RadioButtonRenderContext = createContext<null | RadioButtonRenderContextInterface>(null)
type RadioButtonRenderContextProps = { children: React.ReactNode }
export const RadioButtonRenderContextProvider = ({ children }: RadioButtonRenderContextProps) => {
  const [selectedOption, setSelectedOption] = useState("")
  const { control } = useUserProfileContextContext()

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const renderAdditionalFields = (control: any) => {
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
            </Box>
          </Box>
        </>
      )
    } else {
      return null
    }
  }

  const value: RadioButtonRenderContextInterface = {
    renderAdditionalFields: Function,
  }
  return (
    <RadioButtonRenderContext.Provider value={value}>{children}</RadioButtonRenderContext.Provider>
  )
}
export const useRadioButtonRenderContextContext = () => {
  const context = useContext(RadioButtonRenderContext)
  if (!context)
    throw Error(
      "use RadioButtonRenderContext in  RadioButtonRenderContext screen context provider!!",
    )
  return context
}
