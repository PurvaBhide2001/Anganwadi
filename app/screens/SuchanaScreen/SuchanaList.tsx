import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useSuchanaContext } from "../../Context/SuchanaContext"
import { randomNumberArray, _arrayRandom } from "../../filter/requireFunction"
import SuchanaItem from "./SuchanaItem"

export default () => {
  const { suchana, colorData } = useSuchanaContext()
  console.log("====================================")
  console.log(_arrayRandom(colorData.length, 0, colorData.length, true))
  console.log("====================================")

  return (
    <Box
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: responsiveWidth(1),
      }}
    >
      {suchana.map((item: any, i: number) => {
        return <SuchanaItem item={item} key={i} />
      })}
    </Box>
  )
}
