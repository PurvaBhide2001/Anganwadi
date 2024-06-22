import {
  Box,
  Center,
  FormControl,
  Input,
  Text,
  Link,
  Button,
  HStack,
  Stack,
  CheckIcon,
  Select,
  Icon,
} from "native-base"
import { useEffect } from "react"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAddressContext } from "../Context/AddressContext"
import SelectDropdown3 from "../UI/SelectDropdown3"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { Image } from "react-native"
import IconComponent from "./IconComponent"

interface IProps {
  errors?: any
  control: any
  watch: Function
}
export default ({ control, watch, errors = {} }: IProps) => {
  const {
    states,
    setSelectedState,
    setSelectedDistrict,
    districts,
    talukas,
    setSelectedTaluka,
    grampanchayats,
    setSelectedGrampanchayat,
    setSelectedVillage,
    villages,
  } = useAddressContext()

  const state_code = watch("state")
  const district_code = watch("district")
  const block_code = watch("block")
  const local_body_code = watch("local_body")
  const village_code = watch("village_code")
  // console.log(`watch("state")`, watch("state"))

  useEffect(() => {
    state_code && setSelectedState(state_code)
    // console.log("state code ", state_code)

    // setValue('district', data?.district);
  }, [state_code])

  useEffect(() => {
    district_code && setSelectedDistrict(district_code)
  }, [district_code])

  useEffect(() => {
    block_code && setSelectedTaluka(block_code)
  }, [block_code])
  return (
    <>
      <Box flex={1} flexDirection="column">
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <IconComponent src={require("../../assets/comman-icons/rajya.png")} />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
            <SelectDropdown3
              control={control}
              name={"state"}
              placeholder={"राज्य"}
              listItem={states}
              label={"state_title"}
              labelValue={"state_code"}
              bgColor="white"
              borderBottomColor="warmGray.200"
              borderColor="white"
              borderRadius={2}
              borderWidth={0.4}
              fontSize={2}
              errors={errors}
            />
          </Box>
        </Box>
      </Box>
      <Box flex={1} flexDirection="column">
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <IconComponent src={require("../../assets/comman-icons/jilha.png")} />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
            <SelectDropdown3
              control={control}
              name={"district"}
              placeholder={"जिल्हा"}
              listItem={districts}
              label={"district_title"}
              labelValue={"district_code"}
              bgColor="white"
              borderBottomColor="warmGray.200"
              borderColor="white"
              borderRadius={2}
              borderWidth={0.4}
              fontSize={2}
              errors={errors}
            />
          </Box>
        </Box>
      </Box>

      <Box flex={1} flexDirection="column">
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <IconComponent
              src={require("../../assets/comman-icons/taluka.png")}
              resizeMode="contain"
            />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
            <SelectDropdown3
              control={control}
              name={"block"}
              placeholder={"तालुका"}
              listItem={talukas}
              label={"block_title"}
              labelValue={"block_code"}
              bgColor="white"
              borderBottomColor="warmGray.200"
              borderColor="white"
              borderRadius={2}
              borderWidth={0.4}
              fontSize={2}
              errors={errors}
            />
          </Box>
        </Box>
      </Box>

      <Box flex={1} flexDirection="column">
        <Box
          flex={1}
          flexDirection="row"
          paddingRight={responsiveWidth(2)}
          paddingBottom={responsiveHeight(2)}
        >
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <IconComponent
              src={require("../../assets/comman-icons/gav.png")}
              resizeMode="contain"
            />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
            <SelectDropdown3
              control={control}
              name={"village"}
              placeholder={"गाव"}
              listItem={villages}
              label={"village_name"}
              labelValue={"village_code"}
              bgColor="white"
              borderBottomColor="warmGray.200"
              borderColor="white"
              borderRadius={2}
              borderWidth={0.4}
              fontSize={2}
              errors={errors}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}
