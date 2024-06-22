import { observer } from "mobx-react-lite"
import { Box, Center, InputLeftAddon, Pressable, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import FlatList2 from "../../components/FlatList2"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useHeader } from "../../utils/useHeader"
// import { TouchableOpacity } from "react-native-gesture-handler"

import {
  Button,
  Card,
  Icon,
  Screen,
  // Text,
  TextField,
  TextFieldAccessoryProps,
} from "./../../components"
import { useStores } from "./../../models"
import { AppStackScreenProps, navigate } from "./../../navigators"
import { colors, spacing } from "./../../theme"
import GovermentPlanList from "./GovermentPlanList"
import HeaderDetails from "./HeaderDetails"
import ImportantLinksList from "./ImportantLinksList"
import MenuMDItem from "./MenuMDItem"
import MenuSMItem from "./MenuSMItem"
import MenuXLList from "./MenuXLList"
import UpdateItem from "./UpdateItem"
import { useLoginContext } from "../../Context/LoginContext"

interface MainMenuProps extends AppStackScreenProps<"MainMenu"> {}

export const MainMenu: FC<MainMenuProps> = observer(function MainMenu(_props) {
  const { navigation } = _props
  const { onRefresh, refereshing } = useLoginContext()

  const { menuSMList, menuMDList, UpdatesList } = useMainMenuContext()
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{}}
          refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
        >
          <Box flex={1} flexDirection="column" bgColor={"white"}>
            <HeaderDetails />
            <Box flex={1}>
              <Box flex={11} alignItems={"center"}>
                <FlatList2
                  Component={MenuSMItem}
                  data={menuSMList}
                  isHorizontal={true}
                  isScrollEnabled={false}
                />
              </Box>
            </Box>
            <Box flex={1} flexDirection="column">
              <Box flex={1} bg="#f1f1f1" height={responsiveHeight(1)}></Box>
              <Box flex={11} padding={responsiveWidth(2)}>
                <MenuXLList />
              </Box>
            </Box>

            <Box flex={1} flexDirection="column">
              <Box flex={1} flexDirection="column">
                <Box flex={1} bg="#f1f1f1" height={responsiveHeight(2)}></Box>
              </Box>
              <Box flex={11} paddingX={responsiveWidth(1.5)}>
                <Text fontSize={responsiveFontSize(2.1)} color="#7d8592" bold>
                  इतर
                </Text>
                <ImportantLinksList />
              </Box>
            </Box>

            <Box flex={3} flexDirection="column">
              <Box flex={1} flexDirection="column">
                <Box flex={1} bg="#f1f1f1" height={responsiveHeight(1)}></Box>
              </Box>
              <Box flex={11} padding={responsiveWidth(2)}>
                <Text fontSize={responsiveFontSize(2.1)} color="#7d8592" bold>
                  अहवाल
                </Text>
                <FlatList2
                  Component={MenuMDItem}
                  data={menuMDList}
                  isHorizontal={true}
                  isScrollEnabled={true}
                />
              </Box>
            </Box>
            <Box flex={2} flexDirection="column">
              <Box flex={1} flexDirection="column">
                <Box flex={1} bg="#f1f1f1" height={responsiveHeight(2)}></Box>
              </Box>
              <Text
                padding={responsiveWidth(2)}
                fontSize={responsiveFontSize(2.1)}
                color="#7d8592"
                bold
              >
                महत्वाच्या योजना
              </Text>
              <Box flex={1}></Box>
              <Box flex={11}>
                <Box flex={10}>
                  <GovermentPlanList />
                </Box>
                <Box
                  flex={1}
                  flexDirection="row"
                  alignItems={"center"}
                  // padding={responsiveWidth(1)}
                >
                  <TouchableOpacity
                    style={{
                      flex: 3,
                      borderRadius: responsiveWidth(1),
                    }}
                    onPress={() => navigate("MorePlans")}
                  >
                    <Text
                      color="blue.800"
                      fontSize={responsiveFontSize(2)}
                      fontWeight={600}
                      textAlign="center"
                    >
                      अधिक योजना
                    </Text>
                  </TouchableOpacity>
                  {/* <Box flex={9}></Box> */}
                </Box>
              </Box>
            </Box>

            <Box flex={9}></Box>
            <Box flex={1} flexDirection="column">
              <Box flex={1} bg="#f1f1f1" height={responsiveHeight(1.5)}></Box>
            </Box>
            <Text
              padding={responsiveWidth(2)}
              fontSize={responsiveFontSize(2.1)}
              color="#7d8592"
              bold
            >
              महत्वाच्या लिंक्स
            </Text>
            <FlatList2
              Component={UpdateItem}
              data={UpdatesList}
              isHorizontal={true}
              isScrollEnabled={true}
            />
            <Box flex={1} flexDirection="column">
              <Box flex={1} bg="#ffffff" height={responsiveHeight(2)}></Box>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

// @demo remove-file
