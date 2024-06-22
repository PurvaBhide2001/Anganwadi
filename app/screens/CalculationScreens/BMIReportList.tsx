import { Box, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useBMIContext } from "../../Context/BMIContext"
import { useCalculationContext } from "../../Context/CalculationContext"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { navigate } from "../../navigators"
// import { useMainMenuContext } from "../../Context/MainMenuContext"
// import MenuXLItem from "./MenuXLItem"
import BMIReportItem from "./BMIReportItem"

export default () => {
  const { bmiLabel, bmiValue } = useCalculationContext()
  const { BMI } = useBMIContext()
  return (
    <Box
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: responsiveWidth(0.2),
      }}
    >
      {BMI.map(({ title, description, bgColor, borderColor, name, icon }: any, i: number) => {
        return (
          <BMIReportItem
            title={title}
            description={description}
            bgColor={bgColor}
            borderColor={borderColor}
            name={name}
            key={i}
            icon={icon}
          />
        )
      })}
    </Box>
  )
}
