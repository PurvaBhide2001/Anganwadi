import { Box, Fab, Icon, ScrollView, Text } from "native-base"
import { AppStackScreenProps } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions"
import { useHeader } from "../../../utils/useHeader"
import ShowAllSuvidhaList from "./ShowAllSuvidhaList"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMainMenuContext } from "../../../Context/MainMenuContext"
// import { RefreshControl } from "react-native-gesture-handler"
import { RefreshControl } from "react-native"
interface ShowAllSuvidhaAndAddScreenProps extends AppStackScreenProps<"ShowAllSuvidhaAndAdd"> {}

export const ShowAllSuvidhaAndAddScreen: FC<ShowAllSuvidhaAndAddScreenProps> = observer(
  function ShowAllSuvidhaAndAddScreen({ navigation }) {
    useHeader({
      title: "अंगणवाडी सुविधा तपशील माहिती ",
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
    const { onRefresh, refereshing } = useMainMenuContext()

    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            style={{}}
            refreshControl={
              <RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />
            }
          >
            <Box flex={1} flexDirection="column" bgColor={"white"} position="relative">
              <ShowAllSuvidhaList />
            </Box>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  },
)
