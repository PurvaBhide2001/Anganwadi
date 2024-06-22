import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Icon } from "native-base"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { Icon } from "../components"
import { translate } from "../i18n"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import { DemoCommunityScreen, DemoShowroomScreen, DemoDebugScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { HomeScreen } from "../screens/Home/HomeScreen"
import { colors, spacing, typography } from "../theme"
import { AnganwadiProfileScreenStack } from "./AnganwadiProfileScreenStack"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { MainMenuScreenStack } from "./MainMenuScreenStack"
import { UserProfileScreenStack } from "./UserProfileScreenStack"
import { responsiveHeight } from "react-native-responsive-dimensions"

export type DemoTabParamList = {
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoCommunity: undefined
  DemoDebug: undefined
  DemoPodcastList: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function BottomTabNavigation() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="DemoShowroom"
        component={MainMenuScreenStack}
        options={{
          tabBarLabel: "होम",
          tabBarIcon: ({ focused }) => (
            <Icon
              as={AntDesign}
              name="home"
              color={focused ? colors.tint : "warmGray.600"}
              size={responsiveHeight(2.7)}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={AnganwadiProfileScreenStack}
        options={{
          tabBarLabel: "अंगणवाडी प्रोफाइल",
          tabBarIcon: ({ focused }) => (
            <Icon
              as={AntDesign}
              name="profile"
              size={responsiveHeight(2.7)}
              color={focused ? colors.tint : "warmGray.600"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={UserProfileScreenStack}
        options={{
          tabBarLabel: "यूजर  प्रोफाइल",
          tabBarIcon: ({ focused }) => (
            <Icon
              as={AntDesign}
              name="user"
              size={responsiveHeight(2.7)}
              color={focused ? colors.tint : "warmGray.600"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        // component={UserProfileScreenStack}
        component={MainMenuScreenStack}
        options={{
          tabBarLabel: "सेटिंग",
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Feather}
              name="settings"
              size={responsiveHeight(2.7)}
              color="warmGray.300"
              // color={focused ? colors.tint : "warmGray.600"}
              // disabled={true}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
