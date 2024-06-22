import { observer } from "mobx-react-lite"
import { Box, Text, Icon } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  RefreshControl,
} from "react-native"
import { Button, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import BlockList from "./BlockList"
import BasicInformation from "./BasicInformation"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import QuestionsAndSurveyDetailItem from "./QuestionsAndSurveyDetailItem"
import { removeDuplicate } from "../../filter/requireFunction"
import { useHeader } from "../../utils/useHeader"
import Octicons from "react-native-vector-icons/Octicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import TabBarView from "../../UI/TabBarView"
import { useTabBarContextContext } from "../../Context/TabBarContext"
import RenderTabBarForOverallFidback from "./RenderTabBarForOverallFidback"
import TabBarView2 from "../../UI/TabBarView2"
import RenderTabBarComponent from "./RenderTabBarComponent"

interface OverallFeedBackScreenProps extends AppStackScreenProps<"OverallFeedBack"> {}

export const OverallFeedBackScreen: FC<OverallFeedBackScreenProps> = observer(
  function OverallFeedBackScreen({ navigation }) {
    const {
      profileData,
      questionAndSurveyDataArray,
      requiredSurveyDataKey,
      profilesTitle,
      requiresurveyProfileDataKey,
      tabBarIndex,
      setTabBarIndex,
      onClickToViewTab,
    } = usePurvPrathmikContextContext()
    const { routes, renderScene, initialLayout } = useTabBarContextContext()
    useHeader({
      title: "एकंदरीत मूल्यमापन",
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
      <ScrollView
        style={{ height: "100%", width: "100%", backgroundColor: "white" }}
        refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
      >
        <Box flex={1} height="100%" width="100%" flexDirection="column">
          <Box flex={4} padding={responsiveWidth(0.1)}>
            <BasicInformation profileData={profileData} profilesTitle={profilesTitle} />
          </Box>
          <Box flex={8} padding={responsiveWidth(1)} height="100%" width="100%">
            {removeDuplicate(questionAndSurveyDataArray, "eval_type").length !== 0 ? (
              <TabBarView2
                onClickToViewTab={onClickToViewTab}
                selectedTabIndex={tabBarIndex}
                itemList={removeDuplicate(questionAndSurveyDataArray, "eval_type")}
                Component={RenderTabBarComponent}
                requiresurveyProfileDataKey={requiresurveyProfileDataKey}
              />
            ) : (
              <Box
                flex={1}
                height="100%"
                alignItems={"center"}
                bg="yellow.100"
                alignContent={"center"}
              >
                <Text fontSize={responsiveFontSize(2.5)} fontWeight={600} color="gray.500">
                  "तुमचे मूल्यमापन झालेले नाही !!!!"
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </ScrollView>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
  textAlign: "center",
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
