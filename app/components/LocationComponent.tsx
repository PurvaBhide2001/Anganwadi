import { Box, Icon, Text } from "native-base"
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
import { useAnganwadiProfileContext } from "../Context/AnganwadiProfileContext"
import { TouchableOpacity } from "react-native"

export default ({ control, watch }: any) => {
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
    selectedPrakalpa,
    bitList,
    setSelectedPrakalpaId,
  } = useAddressContext()
  const {
    LocationControl,
    LocationHandleSubmit,
    onUpdateAnganwadiLocation,
    LocationHandleWatch,
    locationsErrors,
  } = useAnganwadiProfileContext()

  const state_code = LocationHandleWatch("state")
  const district_code = LocationHandleWatch("district")
  const block_code = LocationHandleWatch("block")
  const local_body_code = LocationHandleWatch("local_body")
  const village_code = LocationHandleWatch("village")
  const prakalpa_code = LocationHandleWatch("prakalpa_id")
  // console.log(`watch("village")`, watch("village"))

  useEffect(() => {
    state_code && setSelectedState(state_code)
    // console.log("state code ", state_code)

    // setValue('district', data?.district);
  }, [state_code])

  useEffect(() => {
    // console.log("selected district", district_code, state_code)

    district_code && setSelectedDistrict(district_code)
  }, [district_code])

  useEffect(() => {
    block_code && setSelectedTaluka(block_code)
  }, [block_code])

  useEffect(() => {
    local_body_code && setSelectedGrampanchayat(local_body_code)
  }, [local_body_code])
  useEffect(() => {
    village_code && setSelectedVillage(village_code)
  }, [village_code])
  useEffect(() => {
    console.log("prakalpa_code", prakalpa_code)
    prakalpa_code && setSelectedPrakalpaId(prakalpa_code)
  }, [prakalpa_code])
  return (
    <>
      <Box flex={1} flexDirection="column" paddingBottom={responsiveHeight(1.5)}>
        <Box flex={1} justifyContent={"flex-end"} paddingLeft={responsiveWidth(18)}>
          <Text fontSize={responsiveFontSize(2.3)}>राज्य :</Text>
        </Box>
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <Icon as={Feather} name="map" size={responsiveHeight(3.5)} color="warmGray.500" />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <SelectDropdown3
              control={LocationControl}
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
              errors={locationsErrors}
            />
          </Box>
        </Box>
      </Box>
      <Box flex={1} flexDirection="column" paddingBottom={responsiveHeight(1.5)}>
        <Box flex={1} justifyContent={"flex-end"} paddingLeft={responsiveWidth(18)}>
          <Text fontSize={responsiveFontSize(2.3)}>जिल्हा :</Text>
        </Box>
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <Icon as={Feather} name="map-pin" size={responsiveHeight(3.5)} color="warmGray.500" />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <SelectDropdown3
              control={LocationControl}
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
              errors={locationsErrors}
            />
          </Box>
        </Box>
      </Box>
      <Box flex={1} flexDirection="column" paddingBottom={responsiveHeight(1.5)}>
        <Box flex={1} justifyContent={"flex-end"} paddingLeft={responsiveWidth(18)}>
          <Text fontSize={responsiveFontSize(2.3)}>तालुका :</Text>
        </Box>
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <Icon
              as={FontAwesome5}
              name="map-marked-alt"
              size={responsiveHeight(3.5)}
              color="warmGray.500"
            />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <SelectDropdown3
              control={LocationControl}
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
              errors={locationsErrors}
            />
          </Box>
        </Box>
      </Box>

      {/* <Box flex={1} flexDirection="column">
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <Icon
              as={FontAwesome5}
              name="map-marked-alt"
              size={responsiveHeight(3.5)}
              color="warmGray.500"
            />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
            <SelectDropdown3
              control={LocationControl}
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
            />
          </Box>
        </Box>
      </Box> */}

      <Box flex={1} flexDirection="column" paddingBottom={responsiveHeight(1.5)}>
        <Box flex={1} justifyContent={"flex-end"} paddingLeft={responsiveWidth(18)}>
          <Text fontSize={responsiveFontSize(2.3)}>गाव :</Text>
        </Box>
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <Icon
              as={FontAwesome5}
              name="map-marked-alt"
              size={responsiveHeight(3.5)}
              color="warmGray.500"
            />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <SelectDropdown3
              control={LocationControl}
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
              fontSize={2.2}
              errors={locationsErrors}
            />
          </Box>
        </Box>
      </Box>

      <Box flex={1} flexDirection="column" paddingBottom={responsiveHeight(1.5)}>
        <Box flex={1} justifyContent={"flex-end"} paddingLeft={responsiveWidth(18)}>
          <Text fontSize={responsiveFontSize(2.3)}>प्रकल्प :</Text>
        </Box>
        <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <Icon
              as={FontAwesome5}
              name="map-marked-alt"
              size={responsiveHeight(3.5)}
              color="warmGray.500"
            />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)}>
            <SelectDropdown3
              control={LocationControl}
              name={"prakalpa_id"}
              placeholder={"प्रकल्प"}
              listItem={selectedPrakalpa}
              label={"title"}
              labelValue={"id"}
              bgColor="white"
              borderBottomColor="warmGray.200"
              borderColor="white"
              borderRadius={2}
              borderWidth={0.4}
              fontSize={2}
              errors={locationsErrors}
            />
          </Box>
        </Box>
      </Box>
      <Box flex={1} flexDirection="column" paddingBottom={responsiveHeight(1.5)}>
        <Box flex={1} justifyContent={"flex-end"} paddingLeft={responsiveWidth(18)}>
          <Text fontSize={responsiveFontSize(2.3)}>बिट :</Text>
        </Box>
        <Box
          flex={1}
          flexDirection="row"
          paddingRight={responsiveWidth(2)}
          paddingBottom={responsiveHeight(2)}
        >
          <Box flex={0.2} justifyContent={"center"} alignItems="center">
            <Icon
              as={FontAwesome5}
              name="map-pin"
              size={responsiveHeight(3.5)}
              color="warmGray.500"
            />
          </Box>
          <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
            <SelectDropdown3
              control={LocationControl}
              name={"bit_id"}
              placeholder={"बिट"}
              listItem={bitList}
              label={"title"}
              labelValue={"id"}
              bgColor="white"
              borderBottomColor="warmGray.200"
              borderColor="white"
              borderRadius={2}
              borderWidth={0.4}
              fontSize={2}
              errors={locationsErrors}
            />
          </Box>
        </Box>
      </Box>
      <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
        <TouchableOpacity
          style={{
            backgroundColor: "#669df6",
            width: "100%",
            justifyContent: "center",
          }}
          onPress={LocationHandleSubmit(onUpdateAnganwadiLocation)}
        >
          <Text
            textAlign="center"
            color={"white"}
            justifyContent="center"
            fontSize={responsiveFontSize(2.5)}
            padding={responsiveWidth(1)}
            bold
          >
            अपडेट करा
          </Text>
        </TouchableOpacity>
      </Box>
    </>
  )
}
