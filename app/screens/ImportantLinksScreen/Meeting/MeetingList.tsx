import { Box, Flex, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../../Context/LoginContext"
import MeetingItem from "./MeetingItem"
import { useMeetingContextContext } from "../../../Context/MeetingContext"

export default () => {
  // const { meetingList } = useLoginContext()
  const { meeting, meetingStatus } = useMeetingContextContext()
  console.log(meetingStatus, "++++++++++++++++++++++=")

  return (
    <>
      {meetingStatus == 200 ? (
        <Box flex={1} height={"100%"}>
          <Box flex={11}>
            {meeting?.map((item: any, i) => (
              <Flex flex={1} key={i}>
                <MeetingItem item={item} />
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
