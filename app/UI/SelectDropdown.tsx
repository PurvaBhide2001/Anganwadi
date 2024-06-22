import { CheckIcon, Select } from "native-base"
import { useController } from "react-hook-form"

interface IProps {
  label?: string
  control: any
  name: string
  defaultValue?: any
  style?: any
  keyboardType?:
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "number-pad"
  | "decimal-pad"
  error?: any
  containerStyle?: any
  autoCapitalize?: any
  autoCorrect: boolean
  autoComplete: any
  placeholder: string
  errors?: any
  optionList: any[]
  labelValue: string
  value: string

}
export default ({ control, name, placeholder, optionList, value, labelValue, style }: IProps) => {
  const { field } = useController({
    control,
    name,
  })
  return (
    <>
      <Select
        selectedValue={field.value}
        // style={{ ...style }}
        minWidth={"100%"}
        width={"100%"}
        accessibilityLabel="Choose Service"
        placeholder={placeholder}
        _selectedItem={{
          bg: "white",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={field.onChange}
      >
        {optionList.map((item, i) => (
          <Select.Item label={item[labelValue]} value={item[value]} key={i} />
        ))}
      </Select>
    </>
  )
}
