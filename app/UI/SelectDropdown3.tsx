import { CheckIcon, Select, Text } from "native-base"
import { Controller } from "react-hook-form"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
interface IProps {
  control: any
  name: string
  placeholder: string
  listItem: any[]
  label: string
  labelValue: string
  errors?: any
  borderWidth: number
  borderRadius: number
  fontSize: number
  borderBottomColor: string
  isRequiredValue?: boolean
  borderColor: string
  errorMsg?: string
  bgColor: string
}
export default ({
  control,
  name,
  placeholder,
  listItem,
  label,
  labelValue,
  borderWidth,
  borderBottomColor,
  borderColor,
  borderRadius,
  bgColor,
  fontSize,
  isRequiredValue = true,
  errorMsg = "माहिती भरणे अनिवार्य आहे!",
  errors = {},
}: IProps) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <Select
            selectedValue={value}
            minWidth="100%"
            width="70%"
            borderRadius={responsiveWidth(borderRadius)}
            borderWidth={responsiveWidth(borderWidth)}
            borderBottomColor={borderBottomColor}
            borderColor={borderColor}
            bgColor={bgColor}
            accessibilityLabel="Choose Service"
            placeholder={placeholder}
            fontSize={responsiveFontSize(fontSize)}
            _selectedItem={{
              bg: "red.100",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            {listItem?.length !== 0 ? (
              listItem?.map((item: any, i: number) => {
                return <Select.Item key={i} label={item[label]} value={item[labelValue]} />
              })
            ) : (
              <Select.Item label={"कृपया प्रतीक्षा करा......."} value={""} />
            )}
          </Select>
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
