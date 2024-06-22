import { Box, Button, Input, Text } from "native-base"
import React from "react"
import { Controller } from "react-hook-form"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
interface IProps {
  control?: any
  name: string
  placeholder: string
  variant?: string
  style?: any
  defaultValue?: any
  keyPadType: any
  Icon?: any
  iconName?: string
  iconSize?: number
  inputRightElementTopRightRadius?: number
  inputRightElementBottomRightRadius?: number
  inputRightElementBorderWidth?: number
  isDisabled?: boolean
  isRequiredValue?: boolean
  errors?: any
  errorMsg?: string
  maxLength?: number
  minLength?: number
}
export default ({
  errors = {},
  control,
  name,
  placeholder,
  keyPadType,
  style,
  defaultValue,
  Icon,
  iconName,
  iconSize,
  isDisabled,
  variant = "unstyled",
  inputRightElementTopRightRadius = 2,
  inputRightElementBottomRightRadius = 2,
  inputRightElementBorderWidth = 0.4,
  isRequiredValue = true,
  errorMsg = "माहिती भरणे अनिवार्य आहे!",
  maxLength,
}: IProps) => {
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
            defaultValue={defaultValue}
            placeholder={placeholder}
            value={value}
            variant={variant}
            onChangeText={(itemValue: any) => onChange(itemValue)}
            maxLength={maxLength}
            InputRightElement={
              <Box
                flex={1 / 8}
                justifyContent="center"
                borderLeftWidth="0"
                height={"100%"}
                borderWidth={responsiveWidth(inputRightElementBorderWidth)}
                borderColor="grey"
                borderTopRightRadius={responsiveWidth(inputRightElementTopRightRadius)}
                borderBottomRightRadius={responsiveWidth(inputRightElementBottomRightRadius)}
              >
                {Icon ? <Icon name={iconName} size={iconSize} /> : ""}
              </Box>
            }
            isDisabled={isDisabled}
          />
        )}
        rules={{
          required: {
            value: isRequiredValue,
            message: errorMsg,
          },
        }}
      />
      <Text color={"red.600"}>{errors[name] && errors[name]?.message} </Text>
    </>
  )
}
