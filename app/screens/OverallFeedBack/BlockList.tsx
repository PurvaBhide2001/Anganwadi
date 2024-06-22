import { Box, ScrollView } from "native-base"
import { responsiveHeight } from "react-native-responsive-dimensions"
import { useOverallFeedBackContext } from "../../Context/OverallFeedBackContext"
import BlockItem from "./BlockItem"

export default () => {
  const { overallFeedBack } = useOverallFeedBackContext()
  return (
    <Box flex={1} flexDirection="column">
      <ScrollView width={"100%"} height={responsiveHeight(80)}>
        {overallFeedBack.map((item, i) => {
          return <BlockItem item={item} key={i} />
        })}
      </ScrollView>
    </Box>
  )
}
