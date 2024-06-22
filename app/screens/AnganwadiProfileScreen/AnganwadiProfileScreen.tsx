import { Box, Text } from "native-base"
import { AppStackScreenProps } from "../../navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnganwadiProfileList from "./AnganwadiProfileList"
import { useHeader } from "../../utils/useHeader"

interface AnganwadiProfileScreenProps extends AppStackScreenProps<"AnganwadiProfile"> {}

export const AnganwadiProfileScreen: FC<AnganwadiProfileScreenProps> = observer(
  function AnganwadiProfileScreen({ navigation }) {
    const { control, handleSubmit, onSubmit } = useLoginContext()
    useHeader({
      title: " अंगणवाडी प्रोफाइल",
      titleStyle: {
        fontStyle: "normal",
        fontSize: responsiveFontSize(2.5),
        fontWeight: "700",
        color: "#7d8592",
      },

      onLeftPress(event) {
        navigation.goBack()
      },
      leftIcon: "back",
    })
    return (
      <Box flex={1} width="100%">
        <AnganwadiProfileList />
      </Box>
    )
  },
)
