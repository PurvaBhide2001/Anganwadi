import { Avatar, Box, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useFeedbackContextContext } from "../../Context/FeedbackContext"
import { useStudentResultContext } from "../../Context/StudentResultContext"
import { calculateAge } from "../../filter/calculateFormule"
import { useStudentContextContext } from "../../Context/StudentContext"
interface IProps {
  studentBasicInfo: any
  titleObject: any
  iconObject?: any
}
export default ({ studentBasicInfo, titleObject, iconObject }: IProps) => {
  const { selectedStudent } = useStudentContextContext()

  return (
    <Box flex={1} justifyContent={"center"} bg={"#fdf6f5"}>
      <Box flex={1} flexDirection={"row"}>
        <Box flex={4} pt={responsiveHeight(1)} alignItems={"center"} justifyContent={"center"}>
          <Avatar
            height={responsiveHeight(10)}
            width={responsiveWidth(21)}
            borderColor="white"
            justifyContent={"center"}
            borderWidth={responsiveWidth(0.5)}
            source={{ uri: selectedStudent?.join_photo }}
          ></Avatar>
        </Box>
        <Box flex={8}>
          <Box flex={1}>
            <Text
              fontSize={responsiveFontSize(2.8)}
              padding={responsiveHeight(0.5)}
              color="#7D8592"
              bold
            >
              {studentBasicInfo?.fullName}
            </Text>
          </Box>

          <Box flex={1}>
            <Text
              fontSize={responsiveFontSize(2.1)}
              padding={responsiveHeight(0.2)}
              color="#7D8592"
            >
              वयोगट : {studentBasicInfo?.age_group}
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={responsiveFontSize(2.1)}
              padding={responsiveHeight(0.2)}
              color="#7D8592"
            >
              वय : {studentBasicInfo?.dob} वर्षे
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={responsiveFontSize(2.1)}
              padding={responsiveHeight(0.2)}
              color="#7D8592"
            >
              लिंग : {studentBasicInfo?.gender == "Male" ? "मुलगा" : "मुलगी "}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box flex={0.2}></Box>
      <Box flex={1} alignItems={"center"} flexDirection="row" p={responsiveHeight(0.5)}>
        <Box
          flex={4}
          flexDirection="column"
          bg={"#fae5e2"}
          padding={responsiveWidth(0.2)}
          borderRadius={responsiveWidth(3)}
          alignItems={"center"}
        >
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(1.9)} color="#7D8592" bold>
              वजन :
            </Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
              {studentBasicInfo?.weight} किलो
            </Text>
          </Box>
        </Box>
        <Box flex={0.2}></Box>
        <Box
          flex={4}
          flexDirection="column"
          bg={"#fae5e2"}
          padding={responsiveWidth(1)}
          borderRadius={responsiveWidth(3)}
          alignItems={"center"}
        >
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(1.9)} color="#7D8592" bold>
              उंची :
            </Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
              {studentBasicInfo?.height} सेमी
            </Text>
          </Box>
        </Box>
        <Box flex={0.2}></Box>
        <Box
          flex={4}
          flexDirection="column"
          bg={"#fae5e2"}
          padding={responsiveWidth(1)}
          borderRadius={responsiveWidth(3)}
          alignItems={"center"}
        >
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(1.9)} color="#7D8592" bold>
              बी एम आय :
            </Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
              {studentBasicInfo?.bmi} kg/m2
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
    // <Box flex={1} justifyContent={"center"} bg={"#ebfafa"}>
    //   <Box flex={1} pt={responsiveHeight(1)} alignItems={"center"} justifyContent={"center"}>
    //     <Avatar
    //       height={responsiveHeight(9)}
    //       width={responsiveWidth(19)}
    //       borderColor="white"
    //       justifyContent={"center"}
    //       borderWidth={responsiveWidth(0.5)}
    //       source={{ uri: selectedStudent?.join_photo }}
    //     ></Avatar>
    //   </Box>
    //   <Box flex={1} alignItems={"center"}>
    //     <Box flex={5}>
    //       <Text
    //         fontSize={responsiveFontSize(2.8)}
    //         padding={responsiveHeight(1)}
    //         color="#7D8592"
    //         bold
    //       >
    //         {studentBasicInfo?.fullName}
    //       </Text>
    //     </Box>

    //     <Box flex={4}>
    //       <Text
    //         fontSize={responsiveFontSize(2)}
    //         padding={responsiveHeight(0.5)}
    //         color="#7D8592"
    //         bold
    //       >
    //         वयोगट : {studentBasicInfo?.age_group}
    //       </Text>
    //     </Box>
    //     <Box flex={4}>
    //       <Text
    //         fontSize={responsiveFontSize(2)}
    //         padding={responsiveHeight(0.5)}
    //         color="#7D8592"
    //         bold
    //       >
    //         वय : {studentBasicInfo?.dob} वर्षे
    //       </Text>
    //     </Box>
    //     <Box flex={4}>
    //       <Text
    //         fontSize={responsiveFontSize(2)}
    //         padding={responsiveHeight(0.5)}
    //         color="#7D8592"
    //         bold
    //       >
    //         लिंग : {studentBasicInfo?.gender}
    //       </Text>
    //     </Box>

    //     <Box flex={4} flexDirection="row" pt={responsiveHeight(1)}>
    //       <Box flex={4} alignItems={"center"} bg={"#ccfcfc"}>
    //         <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
    //           वजन :
    //         </Text>
    //       </Box>
    //       <Box flex={4} alignItems={"center"} bg={"#d4fcfc"}>
    //         <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
    //           उंची :
    //         </Text>
    //       </Box>
    //       <Box flex={4} alignItems={"center"} bg={"#c0fcfc"}>
    //         <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
    //           बॉडी मास इंडेक्स :
    //         </Text>
    //       </Box>
    //     </Box>
    //     <Box flex={4} flexDirection="row">
    //       <Box flex={3} paddingX={responsiveWidth(1)} alignItems={"center"} bg={"#ccfcfc"}>
    //         <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
    //           {studentBasicInfo?.weight} किलो
    //         </Text>
    //       </Box>
    //       <Box flex={3} paddingX={responsiveWidth(1)} alignItems={"center"} bg={"#d4fcfc"}>
    //         <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
    //           {studentBasicInfo?.height} सेमी
    //         </Text>
    //       </Box>
    //       <Box flex={3} paddingX={responsiveWidth(1)} alignItems={"center"} bg={"#c0fcfc"}>
    //         <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
    //           {studentBasicInfo?.bmi} kg/m2
    //         </Text>
    //       </Box>
    //     </Box>
    //     <Box flex={1}></Box>
    //   </Box>
    // </Box>
  )
}
