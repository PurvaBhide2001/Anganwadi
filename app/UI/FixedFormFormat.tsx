import { Box, Input, Radio, Text, View } from "native-base"
import InputField2 from "./InputField2"
import { responsiveWidth } from "react-native-responsive-dimensions"
interface IPpros {
  control: any
  name: string
  id: number
}
export default ({ control, id }: IPpros) => {
  return (
    <Box flex={1}>
      <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
        <Box flex={1} borderRadius={responsiveWidth(3)}>
          <InputField2
            control={control}
            name={`f_name${id}`}
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
            name={`m_name${id}`}
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
            name={`l_name${id}`}
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
            name={`contact_number${id}`}
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
            name={`email${id}`}
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
  )
}
