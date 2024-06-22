import { Box, Flex, Text } from "native-base"
import { useMeetingContextContext } from "../../../Context/MeetingContext"
import PastMeetingItem from "./PastMeetingItem"
import { responsiveFontSize } from "react-native-responsive-dimensions"

export default () => {
  const { pastMeeting, pastMeetingStatus } = useMeetingContextContext()
  console.log(pastMeeting, "PAST status ==========")

  return (
    <>
      {pastMeetingStatus == 200 ? (
        <Box flex={1} height={"100%"}>
          <Box flex={11}>
            {pastMeeting?.map((item: any, i: number) => (
              <Flex flex={1} key={i}>
                <PastMeetingItem item={item} />
              </Flex>
            ))}
          </Box>
        </Box>
      ) : (
        <Box flex={1} alignItems={"center"} justifyContent={"center"}>
          <Text fontSize={responsiveFontSize(3)} color={"#7d8592"} bold>
            सध्या मीटिंग उपलब्ध नाही
          </Text>
        </Box>
      )}
    </>
  )
}
