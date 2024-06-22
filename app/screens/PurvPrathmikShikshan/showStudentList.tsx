import { Box, Flex, Text } from "native-base"
import { responsiveFontSize } from "react-native-responsive-dimensions"
import { useStudentContextContext } from "../../Context/StudentContext"
import ShowStudentItem from "./showStudentItem"

export default () => {
  // const { meetingList } = useLoginContext()
  const { studentData, studentDataStatus } = useStudentContextContext()

  return (
    <>
      {studentData.length !== 0 ? (
        <Box flex={1} height={"100%"}>
          <Box flex={11}>
            {studentData?.map((item: any, i) => (
              <Flex flex={1} key={i}>
                <ShowStudentItem item={item} />
              </Flex>
            ))}
          </Box>
        </Box>
      ) : (
        <Box flex={1} alignItems={"center"} justifyContent={"center"}>
          <Text fontSize={responsiveFontSize(3)} color={"#7d8592"} bold>
            सध्या लाभार्थी उपलब्ध नाही
          </Text>
        </Box>
      )}
    </>
  )
}
