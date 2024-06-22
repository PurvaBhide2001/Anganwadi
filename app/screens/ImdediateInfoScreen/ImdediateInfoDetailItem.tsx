import { Box, Radio, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useImdediateInfoContext } from "../../Context/ImdediateInfoContext"
export default ({ item }: any) => {
  const { openModal } = useImdediateInfoContext()
  console.log(item, "itemitemitemitemitemitemitemitem")

  return (
    <Box flex={1} padding={responsiveWidth(1)}>
      <Box
        flex={1}
        width={"100%"}
        bg="white"
        height={responsiveHeight(8)}
        padding={responsiveWidth(2)}
        borderRadius={responsiveWidth(2)}
        shadow={3}
        flexDirection="row"
      >
        <Box flex={5} justifyContent="center">
          <Radio value={item.id} isDisabled={item.status === 1 ? false : true}>
            <Text fontSize={responsiveFontSize(2.1)} textAlign="center" color="#7D8592" bold>
              {item.title}
            </Text>
          </Radio>
        </Box>
        <Box flex={0.5}></Box>
        <Box flex={3}>
          <TouchableOpacity
            disabled={item.status === 1 || item.status === 2 ? false : true}
            style={{ flex: 1, padding: responsiveWidth(0.5) }}
            onPress={() => {
              openModal(item)
              console.log("Modal OPENNNN")
            }}
          >
            <Box
              flex={1}
              // bg="#FFB3C6"
              bg={item.status === 2 ? "#b5b3b3" : "#FF8FAB"}
              borderRadius={responsiveWidth(2)}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={responsiveFontSize(2.3)} color="white" fontWeight={600}>
                {item.status === 2 ? "माहिती बघा" : "अपडेट करा"}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box flex={1} justifyContent="center">
          {item.status === 2 ? (
            <Ionicons name="checkmark-done-circle" size={responsiveWidth(6)} color="#FF8FAB" />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  )
}
