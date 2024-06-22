import { Box, Button, Input } from "native-base"
import React from "react"
import { StyleSheetProperties } from "react-native"
import { Controller } from "react-hook-form"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
interface IProps {
  control?: any
  name: string
  placeholder: string
  variant?: string
  style?: any
  keyPadType: any
  Icon?: any
  iconName?: string
  iconSize?: number
  inputRightElementTopRightRadius?: number
  inputRightElementBottomRightRadius?: number
  inputRightElementBorderWidth?: number
  maxLength: number
  type?: "text" | "password"
  message: string
  isValue: boolean
}
export default ({
  control,
  name,
  placeholder,
  keyPadType,
  style,
  variant = "unstyled",
  maxLength,
  message,
  isValue,
}: IProps) => {
  /* 

<Input
          keyboardType={"numeric"}
          placeholder="मोबाइल नंबर प्रविष्ट करा "
          borderWidth={responsiveWidth(0.4)}
          borderColor="#e4e4e4"
          borderRadius={responsiveWidth(2)}
          fontSize={responsiveFontSize(2.2)}
          onChangeText={(value) => setContactNumber(value)}
          w={responsiveWidth(80)}
          type="text"
          maxLength={10}
        />
*/

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            keyboardType={keyPadType}
            size="lg"
            style={{ ...style }}
            placeholder={placeholder}
            value={value}
            variant={variant}
            onChangeText={(itemValue: any) => onChange(itemValue)}
            maxLength={maxLength}
          />
        )}
        rules={{
          required: {
            value: isValue,
            message: message,
          },
        }}
      />
    </>
  )
}
