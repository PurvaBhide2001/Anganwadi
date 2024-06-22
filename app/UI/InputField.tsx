import { FormControl, Input, WarningOutlineIcon } from "native-base"
import { useController } from "react-hook-form"
import { TextField } from "../components"
interface IProps {
  label?: string
  control: any
  name: string
  defaultValue?: any
  style?: any
  formState?: any
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
  autoComplete?: any
  placeholder: string
  errors?: any
  type?: "text" | "password"
}
export default ({
  label,
  formState,
  control,
  name,
  defaultValue = "",
  style,
  keyboardType,
  autoCorrect,
  autoComplete,
  containerStyle,
  autoCapitalize = "none",
  placeholder,
  type = "text",
}: IProps) => {
  const { field } = useController({
    name: name,
    defaultValue: defaultValue,
    control,
  })
  return (
    <>
      <Input
        _focus={{ borderColor: "yellow.500" }}
        onChangeText={field?.onChange}
        style={style}
        value={field?.value}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        type={type}
      />
    </>
  )
}
