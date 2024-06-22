import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import AakarItem from "./aakarItem"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import { useAakarContext } from "../../Context/AakarContext"

export default () => {
  const { akarMonth } = usePurvPrathmikContextContext()
  const { Aakar } = useAakarContext()
  console.log("akar details?????", Aakar)
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
      {Aakar.map(({ date, title, bgColor, file }: any, i: number) => {
        return <AakarItem date={date} title={title} bgColor={bgColor} file={file} />
      })}
    </Box>
  )
}
