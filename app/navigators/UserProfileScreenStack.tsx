/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useLoginContext } from "../Context/LoginContext"
import { useStores } from "../models" // @demo remove-current-line
import {
  LoginScreen, // @demo remove-current-line
  WelcomeScreen,
} from "../screens"
import { AnganwadiProfileScreen } from "../screens/AnganwadiProfileScreen/AnganwadiProfileScreen"

import { AboutAnganwadiScreen } from "../screens/AnganwadiProfileSpecificForms/AboutAnganwadiScreen"
import { ActivitySummaryScreen } from "../screens/AnganwadiProfileSpecificForms/ActivitySummaryScreen"
import { AWCTypeScreen } from "../screens/AnganwadiProfileSpecificForms/AWCTypeScreen"
import { AWWWorkingHelpersScreen } from "../screens/AnganwadiProfileSpecificForms/AWWWorkingHelpersScreen"
import { FunctionsAndServicesByAWCScreen } from "../screens/AnganwadiProfileSpecificForms/FunctionsAndServicesByAWCScreen"
import { InfrastructureFacilitiesScreen } from "../screens/AnganwadiProfileSpecificForms/InfrastructureFacilitiesScreen"
import { LocationScreen } from "../screens/AnganwadiProfileSpecificForms/LocationScreen"
import { NutritionalStatusScreen } from "../screens/AnganwadiProfileSpecificForms/NutritionalStatusScreen"
import { TotalParticipantsScreen } from "../screens/AnganwadiProfileSpecificForms/TotalParticipantsScreen"

import { AnganwadiSuvidhaTypeScreen } from "../screens/AnganwadiSuvidha/AnganwadiSuvidhaTypeScreen"
import { ShowParticularSuvidhaScreen } from "../screens/AnganwadiSuvidha/ShowParticularSuvidha"
import { SuvidhaSubTypeScreen } from "../screens/AnganwadiSuvidha/SuvidhaSubTypeScreen"
import { BMIScreen } from "../screens/CalculationScreens/BMIScreen"
import { EvaluationScreen } from "../screens/Evaluation/EvaluationScreen"
import { FeedbackScreen } from "../screens/FeedBackScreen/FeedbackScreen"
import { GovermentSchemeScreen } from "../screens/GovermentSchemeScreen/GovermentSchemeScreen"
import { HomeScreen } from "../screens/Home/HomeScreen"
import { ImediateInfoDetailScreen } from "../screens/ImdediateInfoScreen/ImediateInfoDetailScreen"
import { ImediateInfoScreen } from "../screens/ImdediateInfoScreen/ImediateInfoScreen"
import { ImediateInformationScreen } from "../screens/ImediateInformationReport/ImediateInformationScreen"
import { ReportingScreen } from "../screens/ImediateInformationReport/ReportingScreen"
import { LoginPage } from "../screens/LoginPage"
import { LoginPage1 } from "../screens/LoginPage1"
import { MainMenu } from "../screens/MainMenu/MainMenuScreen"
import { MorePlansScreen } from "../screens/MorePlansScreen/MorePlansScreen"
import { OverallFeedBackScreen } from "../screens/OverallFeedBack/OveallFeedBackScreen"
import { SelectStudentShowAllFeedBackScreen } from "../screens/OverallFeedBack/SelectStudentShowAllFeedBack"
import { EditProfile } from "../screens/ProfileEditAndShow/EditProfile"
import { ShowProfile } from "../screens/ProfileEditAndShow/ShowProfile"
import { PurvPrathmikScreen } from "../screens/PurvPrathmikShikshan/PurvPrathmikScreen"
import { QuestionScreen } from "../screens/Question/QuestionScreen"
import { ChooseStudentScreen } from "../screens/Student/ChooseStudentScreen"
import { StudentFormScreen } from "../screens/Student/StudentFormScreen"
import { StudentScreen } from "../screens/Student/StudentScreen"
import { StudentResultScreen } from "../screens/StudentResultScreen/StudentResultScreen"
import { UserProfileScreen } from "../screens/UserProfile/UserProfileScreen"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { HBAnemiaScreen } from "../screens/CalculationScreens/HBAnemiaScreen"
import { VaccinationScreen } from "../screens/CalculationScreens/VaccinationScreen"
import { CalculatorAndTimetableScreen } from "../screens/CalculatorTimetable/CalculatorAndTimetableScreen"
import { AppStackParamList } from "./AppNavigator"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

export const UserProfileScreenStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  const { isLogin } = useLoginContext()
  // @demo remove-block-end
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShowProfile" component={ShowProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  )
})
