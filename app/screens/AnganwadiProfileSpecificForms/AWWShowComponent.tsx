import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import InputField2 from "../../UI/InputField2"

export default () => {
  return (
    <>
      <Box flex={1}>
        <Box flex={1} flexDirection="row">
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <InputField2
              control={undefined}
              name={""}
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
              control={undefined}
              name={""}
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
              control={undefined}
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
}
