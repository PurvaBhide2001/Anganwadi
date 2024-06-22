import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  Pressable,
  Spinner,
  Text,
} from "native-base"
import { TouchableOpacity, Image } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useCommanContextContext } from "../../Context/CommanContext"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { usePlayingToysContext } from "../../Context/PlayingToysContext"
import { useStudentContextContext } from "../../Context/StudentContext"
import { jsonToParse } from "../../filter/requireFunction"

interface Iprops {
  maxWidth: number
  isShowModal: boolean
  closeModal: Function
  cancelButton: Function
  submitButton: Function
  width?: number
}
export default ({
  maxWidth,
  isShowModal,
  closeModal,
  cancelButton,
  submitButton,
  width = 90,
}: Iprops) => {
  const { currentSelectedStudent } = useStudentContextContext()

  const { block_obj, district_obj, state_obj, village_obj } = currentSelectedStudent

  const { village_name = "" } = jsonToParse(jsonToParse(village_obj))
  const { block_title = "" } = jsonToParse(jsonToParse(block_obj))
  const { district_title = "" } = jsonToParse(jsonToParse(district_obj))
  const { state_title = "" } = jsonToParse(jsonToParse(state_obj))

  return (
    <Modal.Content maxWidth={maxWidth} width={responsiveScreenWidth(width)}>
      <Modal.CloseButton />
      <Modal.Body>
        <Box flex={1} flexDirection="column">
          <Box flex={1}>
            <Modal.Header flex={1} justifyItems="center" alignContent="center" alignItems="center">
              <Text fontSize={responsiveFontSize(2.9)} fontWeight={700} color="#ff9900">
                लाभार्थी माहिती
              </Text>
            </Modal.Header>
          </Box>
          <Box flex={11} flexDirection="column">
            <Box flex={1} flexDirection="row" alignItems={"center"} justifyContent={"center"}>
              <Image
                source={{
                  uri: currentSelectedStudent?.join_photo,
                }}
                style={{ height: responsiveHeight(15), width: responsiveWidth(26) }}
                resizeMode="cover"
              />
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"center"}
              padding={responsiveWidth(1)}
            >
              <Box flex={5}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={700} color="gray.700">
                  लाभार्थीचे पूर्ण नाव
                </Text>
              </Box>
              <Box flex={10}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={600} color="gray.600">
                  {currentSelectedStudent?.f_name} {currentSelectedStudent?.m_name}
                  {currentSelectedStudent?.l_name}
                </Text>
              </Box>
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"center"}
              padding={responsiveWidth(1)}
            >
              <Box flex={5}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={700} color="gray.700">
                  आईचे नाव
                </Text>
              </Box>
              <Box flex={10}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={600} color="gray.600">
                  {currentSelectedStudent?.mother_name}
                </Text>
              </Box>
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"center"}
              padding={responsiveWidth(1)}
            >
              <Box flex={5}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={700} color="gray.700">
                  जन्मतारीख
                </Text>
              </Box>
              <Box flex={10}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={600} color="gray.600">
                  {currentSelectedStudent?.dob}
                </Text>
              </Box>
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"center"}
              padding={responsiveWidth(1)}
            >
              <Box flex={5}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={700} color="gray.700">
                  लिंग
                </Text>
              </Box>
              <Box flex={10}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={600} color="gray.600">
                  {currentSelectedStudent?.gender}
                </Text>
              </Box>
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"center"}
              padding={responsiveWidth(1)}
            >
              <Box flex={5}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={700} color="gray.700">
                  रुजू होण्याची तारीख
                </Text>
              </Box>
              <Box flex={10}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={600} color="gray.600">
                  {currentSelectedStudent?.join_date}
                </Text>
              </Box>
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"center"}
              padding={responsiveWidth(1)}
            >
              <Box flex={5}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={700} color="gray.700">
                  पत्ता
                </Text>
              </Box>
              <Box flex={10}>
                <Text fontSize={responsiveFontSize(1.7)} fontWeight={600} color="gray.600">
                  {village_name} {block_title} {district_title} {state_title}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal.Content>
  )
}
