import { Box, Flex, Text } from "native-base"
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { navigate } from "../../navigators"
import { useHeader } from "../../utils/useHeader"
import AnganwadiProfileItem from "./MonthlyReportItem"
import MonthlyReportItem from "./MonthlyReportItem"

export default () => {
  const { MonthlyReport } = useAnganwadiSuvidhaContext()
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
    <Box flex={1} flexDirection="row" paddingTop={responsiveHeight(1)}>
      <Box flex={1} flexDirection="column" width="100%">
        {MonthlyReport.map(({ title, icon, navigation }: any, i) => (
          <Flex flex={1} key={i}>
            <MonthlyReportItem title={title} icon={icon} navigation={navigation} />
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
