import { Box, Icon, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMeetingContextContext } from "../../Context/MeetingContext"
import { randIntWithZero } from "../../filter/requireFunction"
import { TouchableOpacity } from "react-native"
import { useStudentContextContext } from "../../Context/StudentContext"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { useAnganwadiEmployeeContext } from "../../Context/AnganwadiEmployeeContext"
import { navigate } from "../../navigators"
export default ({ item }: any) => {
  // const { meetingColorObjArray } = useMeetingContextContext()
  // const colorObject = meetingColorObjArray[randIntWithZero(meetingColorObjArray.length)]
  console.log(item?.Id, "date of birth")
  const { onClickToTheStudent, deleteStudentItem, onUpdateStudent } = useStudentContextContext()

  return (
    <Box
      //   onPress={() => {
      //     onPressToViewParticularDetail(item)
      //   }}
      style={{
        height: responsiveHeight(7),
        padding: responsiveWidth(0.8),
      }}
    >
      <TouchableOpacity
        style={{ height: "100%", width: "100%" }}
        // onPress={() => onClickToTheStudent(item)}
      >
        <Box flex={1} padding={responsiveWidth(0.3)}>
          <Box
            flex={1}
            flexDirection="row"
            height={responsiveHeight(10)}
            bgColor="white"
            borderRadius={responsiveWidth(2)}
            paddingX={responsiveWidth(3)}
          >
            <Box flex={10} flexDirection={"column"}>
              <Box flex={0.1}></Box>
              <Box flex={1.5} flexDirection="row">
                <Text fontSize={responsiveFontSize(2.2)} color="#7D8592" fontWeight={600}>
                  {item?.f_name} {item?.m_name} {item?.l_name}
                </Text>
              </Box>
            </Box>
            <Box flex={2} flexDirection="column" alignItems="center">
              <Box flex={0.1}></Box>
              <TouchableOpacity
                style={{ width: "100%", height: "100%" }}
                onPress={() => onClickToTheStudent(item)}
              >
                <Icon
                  as={Feather}
                  name="eye"
                  size={responsiveHeight(3.5)}
                  color="warmGray.300"
                  // onPress={() => onUpdateEmployee(id)}
                />
              </TouchableOpacity>
            </Box>
            <Box flex={2} flexDirection="column" alignItems="center">
              <Box flex={0.1}></Box>
              <TouchableOpacity style={{ width: "100%", height: "100%" }}>
                <Icon
                  as={Feather}
                  name="edit"
                  size={responsiveHeight(3.5)}
                  color="blue.400"
                  onPress={() => onUpdateStudent(item)}
                />
              </TouchableOpacity>
            </Box>
            <Box flex={2} flexDirection="column" alignItems="center">
              <Box flex={0.1}></Box>
              <TouchableOpacity
                style={{ width: "100%", height: "100%" }}
                onPress={() => deleteStudentItem(item?.Id)}
              >
                <Icon as={Feather} name="trash-2" size={responsiveHeight(3.5)} color="red.400" />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
