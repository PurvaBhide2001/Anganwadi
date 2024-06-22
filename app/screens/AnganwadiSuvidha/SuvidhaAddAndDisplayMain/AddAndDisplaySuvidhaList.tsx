import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../../Context/AnganwadiSuvidhaContext"
import SuvidhaItem from "../SuvidhaItem"
import AddAndDisplaySuvidhaItem from "./AddAndDisplaySuvidhaItem"

export default () => {
  const { suvidhaMain } = useAnganwadiSuvidhaContext()

  return (
    <Box
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: responsiveWidth(2),
      }}
    >
      {suvidhaMain.map(({ title, bgColor, bordercolor, image, navigation }: any, i) => {
        return (
          <AddAndDisplaySuvidhaItem
            title={title}
            bgColor={bgColor}
            navigation={navigation}
            bordercolor={bordercolor}
            image={image}
          />
        )
      })}
    </Box>
  )
}
