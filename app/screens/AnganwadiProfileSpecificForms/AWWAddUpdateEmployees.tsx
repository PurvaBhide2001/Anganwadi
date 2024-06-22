import { Box } from "native-base"
import InputField2 from "../../UI/InputField2"
import { responsiveWidth } from "react-native-responsive-dimensions"
import SelectDropdown3 from "../../UI/SelectDropdown3"
import { emploayeeTypeList } from "../../../assets/constant/commanConstant"
interface IProps {
  control: any
  item: any
  index: number
}
export default ({ control, item, index }: IProps) => {
  return (
    <Box flex={1}>
      <Box flex={1}>
        <Box flex={1} flexDirection="column" paddingY={responsiveWidth(3)}>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <SelectDropdown3
              control={control}
              name={`aww.${index}.role`}
              placeholder={"रोल निवडा"}
              listItem={emploayeeTypeList}
              label={"value"}
              labelValue={"id"}
              bgColor="white"
              borderBottomColor="warmGray.200"
              borderColor="white"
              borderRadius={2}
              borderWidth={0.4}
              fontSize={2.2}
            />
          </Box>
        </Box>
        <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <InputField2
              control={control}
              name={`aww.${index}.f_name`}
              placeholder={"पहिले नाव"}
              keyPadType={"default"}
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
              name={`aww.${index}.m_name`}
              placeholder={"मधले नाव"}
              keyPadType={"default"}
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
              name={`aww.${index}.l_name`}
              placeholder={"आडनाव"}
              keyPadType={"default"}
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
              name={`aww.${index}.contact_number`}
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
              name={`aww.${index}.email`}
              placeholder={"ई-मेल"}
              keyPadType={"email-address"}
              variant="underlined"
              inputRightElementTopRightRadius={0}
              inputRightElementBottomRightRadius={0}
              inputRightElementBorderWidth={0}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
