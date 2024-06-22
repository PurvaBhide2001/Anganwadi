import { Box, Text } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import FlatList from "../../components/FlatList"
import { useImediateInformationContext } from "../../Context/ImediateInformationContext"

export default () => {
  const { NewReportData } = useImediateInformationContext()
  return (
    <Box flex={1}>
      <FlatList data={NewReportData} />
    </Box>
  )
}
