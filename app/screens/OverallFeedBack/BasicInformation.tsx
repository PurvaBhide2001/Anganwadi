import { Avatar, Box, Center, Text } from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useStudentContextContext } from "../../Context/StudentContext"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import { useBMIContext } from "../../Context/BMIContext"

interface IProps {
  profileData: any
  profilesTitle: any
}

export default ({ profileData, profilesTitle }: IProps) => {
  const { profile, survey } = usePurvPrathmikContextContext()
  const { calculateBMI } = useBMIContext()
  console.log("profileData on fcdsrdrfsas========", profile)
  console.log("survey on fcdsrdrfsas========", survey)
  console.log("profilesTitle========", profilesTitle)
  console.log("GENDERRRRRRRRRRRRRRRRRRRR", profile?.gender)

  const bmi = profile?.weight / ((profile?.height / 100) * (profile?.height / 100))
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
            source={{ uri: profile?.join_photo }}
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
              {profile?.f_name} {profile?.m_name} {profile?.l_name}
            </Text>
          </Box>

          <Box flex={1}>
            <Text
              fontSize={responsiveFontSize(2.1)}
              padding={responsiveHeight(0.2)}
              color="#7D8592"
            >
              वडिलांचे नाव : {profile?.father_name} {profile?.l_name}
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={responsiveFontSize(2.1)}
              padding={responsiveHeight(0.2)}
              color="#7D8592"
            >
              आईचे नाव : {profile?.mother_name}
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={responsiveFontSize(2.1)}
              padding={responsiveHeight(0.2)}
              color="#7D8592"
            >
              जन्मदिनांक : {profile?.dob}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box flex={1} alignItems={"center"} flexDirection="row" p={responsiveHeight(0.5)}>
        <Box
          flex={3}
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
              {profile?.weight} किलो
            </Text>
          </Box>
        </Box>
        <Box flex={0.2}></Box>
        <Box
          flex={3}
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
              {profile?.height} सेमी
            </Text>
          </Box>
        </Box>
        <Box flex={0.2}></Box>
        <Box
          flex={3}
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
              {/* {"17.5"} */}
              {/* {profile?.weight / ((profile?.height / 100) * (profile?.height / 100))} */}
              {bmi.toFixed(2)}
            </Text>
          </Box>
        </Box>

        <Box flex={0.2}></Box>
        <Box
          flex={3}
          flexDirection="column"
          bg={"#fae5e2"}
          padding={responsiveWidth(1)}
          borderRadius={responsiveWidth(3)}
          alignItems={"center"}
        >
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(1.9)} color="#7D8592" bold>
              लिंग :
            </Text>
          </Box>
          <Box flex={1} flexDirection="row">
            <Text fontSize={responsiveFontSize(2)} color="#7D8592" bold>
              {profile?.gender == "Male" ? "मुलगा" : "मुलगी "}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
