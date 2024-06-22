import { CheckIcon, Select } from "native-base"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
interface IProps {
  bgColor: string
  selected: any
  setSelected: Function
  placeholder: string
  width: string
  borderRadius?: number
  minWidth: string
  fontSize: number
  IconSize: number
  list: any[]
  optionLabel: string
  optionValue: string
  style: any
  isFullName?: boolean
  secondLable?: string
  thirdLable?: string
}
export default ({
  bgColor,
  selected,
  setSelected,
  placeholder,
  width,
  borderRadius,
  minWidth,
  fontSize,
  IconSize,
  list,
  optionLabel,
  optionValue,
  style,
  isFullName = false,
  secondLable,
  thirdLable,
}: IProps) => {
  return (
    <Select
      selectedValue={selected}
      minWidth={minWidth}
      width={width}
      borderRadius={responsiveWidth(borderRadius)}
      bgColor={bgColor}
      accessibilityLabel="Choose Service"
      placeholder={placeholder}
      fontSize={responsiveFontSize(fontSize)}
      _selectedItem={{
        bg: "red.200",
        endIcon: <CheckIcon size={responsiveWidth(IconSize)} />,
      }}
      mt={responsiveWidth(1)}
      onValueChange={(itemValue: any) => {
        setSelected(itemValue)
      }}
    >
      {list.map((item: any, i: number) => (
        <Select.Item
          key={i}
          label={
            isFullName
              ? `${item[optionLabel]} ${item[secondLable]} ${item[thirdLable]}`
              : item[optionLabel]
          }
          value={item[optionValue]}
        />
      ))}
    </Select>
  )
}
