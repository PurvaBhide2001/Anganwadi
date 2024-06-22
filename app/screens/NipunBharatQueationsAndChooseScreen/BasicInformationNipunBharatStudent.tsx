import { Avatar, Box, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useStudentContextContext } from "../../Context/StudentContext"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import { calculateAge } from "../../filter/calculateFormule"

interface IProps {
  userData: any
}

export default ({ userData }: IProps) => {
  return (
    <Box flex={1} justifyContent={"center"} bg={"#FFF8EB"}>
      <Box flex={1} pt={responsiveHeight(1)} alignItems={"center"} justifyContent={"center"}>
        <Avatar
          height={responsiveHeight(9)}
          width={responsiveWidth(19)}
          borderColor="white"
          justifyContent={"center"}
          borderWidth={responsiveWidth(0.5)}
          source={{ uri: userData?.join_photo }}
        ></Avatar>
      </Box>
      <Box flex={1} alignItems={"center"}>
        <Box flex={5}>
          <Text
            fontSize={responsiveFontSize(2.8)}
            padding={responsiveHeight(1)}
            color="#7D8592"
            bold
          >
            {userData?.f_name} {userData?.m_name} {userData?.l_name}
          </Text>
        </Box>
        <Box flex={4}>
          <Text
            fontSize={responsiveFontSize(2)}
            padding={responsiveHeight(0.5)}
            color="#7D8592"
            bold
          >
            जन्मदिनांक : {userData?.dob}
          </Text>
        </Box>
        <Box flex={4}>
          <Text
            fontSize={responsiveFontSize(2)}
            padding={responsiveHeight(0.5)}
            color="#7D8592"
            bold
          >
            वय : {calculateAge(userData?.dob, true)}
          </Text>
        </Box>
        <Box flex={4}>
          <Text
            fontSize={responsiveFontSize(2)}
            padding={responsiveHeight(0.5)}
            color="#7D8592"
            bold
          >
            लिंग : {userData?.gender == "Male" ? "मुलगा" : "मुलगी "}
          </Text>
        </Box>

        <Box flex={1}></Box>
      </Box>
    </Box>
  )
}
