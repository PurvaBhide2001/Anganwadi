import { Box, ScrollView, Text } from "native-base"
import { AppStackScreenProps } from "../../../navigators"
import { Image } from "react-native"
import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../../Context/LoginContext"
import { useHeader } from "../../../utils/useHeader"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMainMenuContext } from "../../../Context/MainMenuContext"
import { RefreshControl } from "react-native-gesture-handler"
import { useAnganwadiSuvidhaContext } from "../../../Context/AnganwadiSuvidhaContext"
import { useSuvidhaDetailShowContext } from "../../../Context/SuvidhaDetailShowContext"
import { calenderFormat, monthDateFormat } from "../../../filter/dateAndTimeFormat"

interface ShowParticularSuvidhaDetailScreenProps
  extends AppStackScreenProps<"ShowParticularSuvidhaDetail"> {}

export const ShowParticularSuvidhaDetailScreen: FC<ShowParticularSuvidhaDetailScreenProps> =
  observer(function ShowParticularSuvidhaDetailScreen({ navigation }) {
    const { selectedParticularDoneItem } = useSuvidhaDetailShowContext()
    const { title, file, created_at, issue } = selectedParticularDoneItem
    console.log("====================================")
    console.log(selectedParticularDoneItem, "selectedParticularDoneItemselectedParticularDoneItem")
    console.log("====================================")
    useHeader({
      title: "अंगणवाडी सुविधा तपशील",
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
    const { menuSMList, menuMDList, UpdatesList, onRefresh, refereshing } = useMainMenuContext()
    const icon = require("../../../../assets/surveyimages/yojna/ban2.png")
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1}>
            <Box width="100%" height={"100%"} padding={responsiveWidth(4)}>
              <Box flex={1} flexDirection="column" bg={"white"} shadow={5}>
                <Box flex={1}>
                  <Box flex={1} padding={responsiveWidth(3)} borderRadius={responsiveWidth(1)}>
                    <Text fontSize={responsiveFontSize(2.1)} color="#7D8592" bold>
                      <Text> तारीख:</Text> {calenderFormat(created_at, "en")}
                    </Text>
                  </Box>
                </Box>
                <Box flex={1} padding={responsiveWidth(2)}>
                  <Box flex={1} borderRadius={responsiveWidth(1)}>
                    <Text
                      fontSize={responsiveFontSize(2.1)}
                      textAlign="center"
                      color="#7D8592"
                      bold
                    >
                      {title}
                    </Text>
                  </Box>
                </Box>
                <Box flex={1} height={responsiveHeight(7)}>
                  <Box flex={1} borderRadius={responsiveWidth(1)}>
                    <Text
                      fontSize={responsiveFontSize(2.1)}
                      textAlign="center"
                      color="#7D8592"
                      bold
                    >
                      स्थिती : {issue}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box
                  bg="white"
                  width={"100%"}
                  height="100%"
                  alignContent="center"
                  justifyContent={"center"}
                  padding={responsiveWidth(1)}
                  shadow={5}
                >
                  <Image
                    source={{
                      uri: `${file}`,
                    }}
                    style={{ height: responsiveHeight(50), flex: 1 }}
                    resizeMode="cover"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    )
  })
