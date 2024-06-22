import React, { useState } from "react"
import { Box, Input, Radio, Text, View } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { Controller } from "react-hook-form"
interface IProps {
  control: any
  name: string
  isDisabled?: boolean
  defaultValue: any
  errors?: any
  errorMsg?: string
  isRequiredValue?: boolean
}
export default ({
  control,
  name,
  defaultValue,
  isDisabled = false,
  errors = {},
  errorMsg = "Field is required!",
  isRequiredValue = true,
}: IProps) => {
  return (
    <>
      <Box flex={1} paddingY={responsiveWidth(5)}>
        <Controller
          defaultValue={defaultValue}
          control={control}
          name={name}
          render={({ field: { onChange, value, onBlur } }) => (
            <Radio.Group
              name="options"
              flex={1}
              flexDirection="row"
              value={value}
              onChange={onChange}
            >
              <Box flex={4} paddingLeft={responsiveWidth(8)}>
                <Radio value="1" isDisabled={isDisabled}>
                  <Text color="warmGray.500">होय</Text>
                </Radio>
              </Box>
              <Box flex={4} paddingLeft={responsiveWidth(8)}>
                <Radio value="0" isDisabled={isDisabled}>
                  <Text color="warmGray.500">नाही</Text>
                </Radio>
              </Box>
              <Box flex={1} paddingY={responsiveWidth(1)}></Box>
            </Radio.Group>
          )}
          rules={{
            required: {
              value: isRequiredValue,
              message: errorMsg,
            },
          }}
        />
        <Text>{errors[name] && errors[name]?.message} </Text>
      </Box>
    </>
  )
}
