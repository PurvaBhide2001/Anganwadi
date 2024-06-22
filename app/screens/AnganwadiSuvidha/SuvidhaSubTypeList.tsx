import { Box, Flex, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"

import SuvidhaSubTypeItem from "./SuvidhaSubTypeItem"
import { TouchableOpacity } from "react-native"
import { navigate } from "../../navigators"

export default () => {
  const { subTypesList, mainTypeOfID } = useAnganwadiSuvidhaContext()
  return (
    <Box flex={1} flexDirection="column" height={"100%"}>
      <Box flex={11}>
        {mainTypeOfID == 3 && (
          <Box flex={1} flexDirection={"row"}>
            <Box flex={8}> </Box>
            <Box flex={4}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: responsiveHeight(5),
                  backgroundColor: "#DC143C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: responsiveWidth(2),
                }}
                onPress={() => {
                  // navigate("DemoCommunity", {
                  //   screen: "AddToPlayToyItem",
                  // })
                  navigate("AddToPlayToyItem")
                }}
              >
                <Text
                  style={{ fontSize: responsiveFontSize(1.8), fontWeight: "600" }}
                  color="white"
                >
                  खेळणी जोडा
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        )}
        {subTypesList.map(({ title, id, icon }: any, i) => (
          <Flex flex={1} key={i}>
            <SuvidhaSubTypeItem title={title} id={id} icon={icon} />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
