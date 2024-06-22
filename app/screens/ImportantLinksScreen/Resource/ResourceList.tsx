import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useSansadhaneContext } from "../../../Context/SansadhaneContext"
import { useSuchanaContext } from "../../../Context/SuchanaContext"
import ResourceItem from "./ResourceItem"

export default () => {
  // const { resourceData } = useSuchanaContext()
  const { sansadhane } = useSansadhaneContext()
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
      {/* {resourceData.map((item: any, i: number) => {
        return <ResourceItem item={item} />
      })} */}

      {sansadhane.map((item: any, i: number) => {
        return <ResourceItem item={item} />
      })}
    </Box>
  )
}
