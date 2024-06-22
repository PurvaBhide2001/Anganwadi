import { Box, Icon, Image, Pressable, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { emploayeeTypeList1 } from "../../../assets/constant/commanConstant"
import { useAnganwadiEmployeeContext } from "../../Context/AnganwadiEmployeeContext"
export default ({ firstName, middleName, lastName, id, role }: any) => {
  const { deleteEmployeeItem, onUpdateEmployee } = useAnganwadiEmployeeContext()
  return (
    <Box>
      <Box flex={1} padding={responsiveWidth(1.3)}>
        <Box
          flex={1}
          flexDirection="row"
          height={responsiveHeight(9)}
          bgColor="white"
          borderRadius={responsiveWidth(2)}
          padding={responsiveWidth(1.3)}
        >
          <Box flex={1} flexDirection="row" alignItems={"center"}>
            <Box flex={1.5} style={{ alignItems: "center" }}>
              <Icon as={FontAwesome} name="user" size={responsiveHeight(3.5)} color="#e9aefc" />
            </Box>
            <Box
              flex={8}
              style={{ justifyContent: "center", alignContent: "center" }}
              flexDirection={"column"}
            >
              <Box flex={12}>
                <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                  {firstName} {middleName} {lastName}
                </Text>
              </Box>
              <Box flex={12}>
                <Text fontSize={responsiveFontSize(2)} color="#7D8592">
                  {emploayeeTypeList1[role].value}
                </Text>
              </Box>
            </Box>
            <Box flex={1.5} style={{ justifyContent: "center", alignContent: "center" }}>
              <Icon
                as={Feather}
                name="edit"
                size={responsiveHeight(3.5)}
                color="blue.400"
                onPress={() => onUpdateEmployee(id)}
              />
            </Box>
            <Box flex={1.5} style={{ justifyContent: "center", alignContent: "center" }}>
              <Icon
                as={Feather}
                name="trash-2"
                onPress={() => deleteEmployeeItem(id)}
                size={responsiveHeight(3.5)}
                color="red.400"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
