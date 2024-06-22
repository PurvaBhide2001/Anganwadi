import { Box, Flex, Text } from "native-base"
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { navigate } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import AnganwadiProfileItem from "./AnganwadiProfileItem"

export default () => {
  const { Anganwadi } = useAnganwadiSuvidhaContext()
  // useHeader({
  //   title: " अंगणवाडी प्रोफाइल",
  //   titleStyle: {
  //     fontStyle: "normal",
  //     fontSize: responsiveFontSize(2.5),
  //     fontWeight: "700",
  //     color: "#7d8592",
  //   },

  //   onLeftPress(event) {
  //     navigate("MainMenu")
  //   },
  //   leftIcon: "back",
  // })
  return (
    <Box flex={1} flexDirection="row" padding={responsiveHeight(0.5)}>
      <Box flex={1} flexDirection="column" width="100%">
        {Anganwadi.map(({ title, icon, navigation }: any, i) => (
          <Box
            key={i}
            style={{
              height: responsiveHeight(14),
              borderBottomWidth: 4,
            }}
            borderBottomColor={"warmGray.200"}
          >
            <AnganwadiProfileItem title={title} icon={icon} navigation={navigation} />
          </Box>
        ))}
        {/* <AnganwadiProfileItem/> */}
      </Box>
    </Box>
  )
}
