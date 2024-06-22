import { Box, Text } from "native-base"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useLoginContext } from "../../../Context/LoginContext"
import ShowSuvidhaItem from "./ShowSuvidhaItem"

export default () => {
  const { anganwadiSuvidhaListIssueByMonth, status } = useLoginContext()

  return (
    <>
      {status == 204 ? (
        <Box flex={1} alignItems={"center"} justifyContent={"center"}>
          <Text fontSize={responsiveFontSize(3)} color={"#7d8592"} bold>
            माहिती उपलब्ध नाही
          </Text>
        </Box>
      ) : (
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
          {anganwadiSuvidhaListIssueByMonth.map((date: any, i) => {
            return <ShowSuvidhaItem date={date} bgColor={"yellow.100"} key={i} />
          })}
        </Box>
      )}
    </>
  )
}
