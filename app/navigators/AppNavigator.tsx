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
import React, { useEffect } from "react"
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
import { EDDScreen } from "../screens/CalculatorTimetable/EDDScreen"
import { SamMamScreen } from "../screens/CalculatorTimetable/SamMamScreen"
import { BottomTabNavigation } from "./BottomTabNavigation"
import { LoginPageScreenStack } from "./LoginPageScreenStack"
import { SuwMuwScreen } from "../screens/CalculatorTimetable/SuwMuwScreen"
import { AarambhaScreen } from "../screens/PurvPrathmikShikshan/AarambhaScreen"
import { AakarScreen } from "../screens/PurvPrathmikShikshan/AakarScreen"
import { NipunBharatScreen } from "../screens/PurvPrathmikShikshan/NipunBharatScreen"
import { SansadhaneScreen } from "../screens/SansadhaneScreen/SansadhaneScreen"
import { ParyavekshanScreen } from "../screens/ParyavekshanScreen/ParyavekshanScreen"
import { FurtherQuestionsScreen } from "../screens/FurtherQuestions/FurtherQuestionsScreen"
import { HealthCheckupScreen } from "../screens/Ahaval/HealthCheckupScreen"
import { CustomisedReportScreen } from "../screens/Ahaval/CustomisedReportScreen"
import { MonthlyReportScreen } from "../screens/Ahaval/MonthlyReportScreen"
import { VDCCScreen } from "../screens/Ahaval/VDCCScreen"
import { WeeklyReportScreen } from "../screens/Ahaval/WeeklyReportScreen"
import { PurakPoshanAharScreen } from "../screens/PurakPoshanAhar/PurakPoshanAharScreen"
import { YearlyReportScreen } from "../screens/Ahaval/YearlyReportScreen"
import { SuchanaScreen } from "../screens/SuchanaScreen/SuchanaScreen"
import { ShowParticularSuchanaScreen } from "../screens/SuchanaScreen/ShowParticularSuchanaScreen"
import { MeetingScreen } from "../screens/ImportantLinksScreen/MeetingScreen"
import { NoticeBoardScreen } from "../screens/ImportantLinksScreen/NoticeBoardScreen"
import { NutritionCampaignScreen } from "../screens/ImportantLinksScreen/NutritionCampaignScreen"
import { ToolCenterScreen } from "../screens/ImportantLinksScreen/ToolCenterScreen"
import { ShowParticularResourceScreen } from "../screens/ImportantLinksScreen/Resource/ShowParticularResourceScreen"
import { SpecificResourceScreen } from "../screens/ImportantLinksScreen/Resource/SpecificResourceScreen"
import { ShowAllSuvidhaAndAddScreen } from "../screens/AnganwadiSuvidha/ShowAndAddSuvidha/ShowAllSuvidhaAndAddScreen"
import { ShowParticularSuvidhaDetailScreen } from "../screens/AnganwadiSuvidha/ShowAndAddSuvidha/ShowParticularSuvidhaDetailScreen"
import { SuvidhaAddAndDisplayMainScreen } from "../screens/AnganwadiSuvidha/SuvidhaAddAndDisplayMain/SuvidhaAddAndDisplayMainScreen"
import { MahitiBaghaDetailListScreen } from "../screens/AnganwadiSuvidha/ShowAndAddSuvidha/MahitiBaghaDetailListScreen"
import { StudentBMIcalculateScreen } from "../screens/Student/StudentBMIcalculateScreen"
import { AakarDetailsScreen } from "../screens/PurvPrathmikShikshan/aakarDetailsScreen"
import { FinalGradationScreen } from "../screens/MonthlyReportSpecificForms/FinalGradationScreen"
import { PSEScreen } from "../screens/MonthlyReportSpecificForms/PSEScreen"
import { SamMamReportScreen } from "../screens/MonthlyReportSpecificForms/SamMamReportScreen"
import { SuwMuwSudharnaScreen } from "../screens/MonthlyReportSpecificForms/SuwMuwSudharnaScreen"
import { VCDCReportScreen } from "../screens/MonthlyReportSpecificForms/VCDCReportScreen"
import { FirstCBEReportScreen } from "../screens/MonthlyReportSpecificForms/FirstCBEReportScreen"
// import { SecondCBEReportScreen } from "../screens/MonthlyReportSpecificForms/SecondCBEReportScreen"
import { LBWReportScreen } from "../screens/MonthlyReportSpecificForms/LBWReportScreen"
import { BALAawcScreen } from "../screens/MonthlyReportSpecificForms/BALAawcScreen"
import { WashroomInfoScreen } from "../screens/MonthlyReportSpecificForms/WashroomInfoScreen"
import { WomenHBBMIScreen } from "../screens/MonthlyReportSpecificForms/WomenHBBMIScreen"
import { KishoriHBBMIScreen } from "../screens/MonthlyReportSpecificForms/KishoriHBBMIScreen"
import { BirthRateScreen } from "../screens/MonthlyReportSpecificForms/BirthRateScreen"
import { FinalHealthCheckupScreen } from "../screens/MonthlyReportSpecificForms/FinalHealthCheckupScreen"
import { BalAdharNondaniScreen } from "../screens/MonthlyReportSpecificForms/BalAdharNondaniScreen"
import { ForgotPassword } from "../screens/User/FotgotPassword"
import { BirthRateCalculatorScreen } from "../screens/CalculatorTimetable/BirthRateCalculatorScreen"
import { StudentAddScreen } from "../screens/Student/StudentAddScreen"
import { PastMeetingListScreen } from "../screens/ImportantLinksScreen/Meeting/PastMeetingListScreen"
import { PastMeetingDetailShowScreen } from "../screens/ImportantLinksScreen/Meeting/PastMeetingDetailShowScreen"
import { AddStudentScreen } from "../screens/PurvPrathmikShikshan/addStudent"
import { ShowStudentScreen } from "../screens/PurvPrathmikShikshan/ShowStudentScreen"
import crashlytics from "@react-native-firebase/crashlytics"
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
export type AppStackParamList = {
  Home: undefined
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Evaluation: undefined
  ChooseStudent: undefined
  Question: undefined
  UserProfile: undefined
  StudentForm: undefined
  AnganwadiSuvidha: undefined
  ImediateInformation: undefined
  OverallFeedBack: undefined
  LoginPage: undefined
  Reporting: undefined
  ShowProfile: undefined
  EditProfile: undefined
  LoginPage1: undefined
  Student: undefined
  FeedBack: undefined
  MainMenu: undefined
  BMI: undefined
  Imediate: undefined
  ImediateDetail: undefined
  PurvPrathmik: undefined
  StudentResult: undefined
  SelectStudentShowAllFeedBack: undefined
  SuvidhaSubType: undefined
  MorePlans: undefined
  AnganwadiSuvidhaTypes: undefined

  AboutAnganwadi: undefined
  Location: undefined
  AWCType: undefined
  AWWWorkingHelpers: undefined
  FunctionsAndServicesByAWC: undefined
  InfrastructureFacilities: undefined
  ShowParticularSuvidha: undefined
  GovermentScheme: undefined
  AddToPlayToyItem: undefined

  NutritionalStatus: undefined
  TotalParticipants: undefined
  ActivitySummary: undefined
  AnganwadiProfile: undefined
  HBAnemia: undefined
  Vaccination: undefined
  CalculatorAndTimetable: undefined
  EDD: undefined
  SamMam: undefined
  SuwMuw: undefined
  Aarambha: undefined
  PurakPoshanAhar: undefined

  Aakar: undefined
  NipunBharat: undefined
  Sansadhane: undefined
  Paryavekshan: undefined
  HealthCheckup: undefined
  CustomisedReport: undefined
  MonthlyReport: undefined
  VDCC: undefined
  WeeklyReport: undefined
  YearlyReport: undefined
  FurtherQuestions: undefined
  Suchana: undefined
  ShowParticularSuchana: undefined
  ShowParticularResource: undefined
  MeetingDetailShow: undefined
  Meeting: undefined
  NoticeBoard: undefined
  NutritionCampaign: undefined
  ToolCenter: undefined
  SpecificResource: undefined
  ShowAllSuvidhaAndAdd: undefined
  ShowParticularSuvidhaDetail: undefined
  SuvidhaAddAndDisplayMain: undefined
  MahitiBaghaDetailList: undefined
  NipunBharatQuestion: undefined
  ChooseNipunBharatStudent: undefined
  NipunBharatExamCategoeries: undefined
  NipunBharatShowResultCategoery: undefined
  AnganwadiSmartStatus: undefined
  NipunStudentResult: undefined
  SuwMuwSudharna: undefined

  StudentBMIcalculate: undefined
  AakarDetails: undefined

  ChooseNipunBharatStudentForShowResult: undefined

  FinalGradation: undefined
  PSE: undefined
  SamMamReport: undefined
  VCDCReport: undefined
  FirstCBEReport: undefined
  StudentAdd: undefined
  LBWReport: undefined
  BALAawc: undefined
  WashroomInfo: undefined
  WomenHBBMI: undefined
  KishoriHBBMI: undefined
  BirthRate: undefined
  FinalHealthCheckup: undefined
  BalAdharNondani: undefined
  ForgotPassword: undefined
  BirthRateCalculator: undefined
  PastMeetingList: undefined
  PastMeetingDetailShow: undefined
  AddStudent: undefined
  ShowStudent: undefined

  Demo: NavigatorScreenParams<DemoTabParamList>
  // @demo remove-current-line
  // 🔥 Your screens go here
}

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

const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  const { isLogin } = useLoginContext()
  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={true ? "Welcome" : "Welcome"} // @demo remove-current-line
    >
      {/* @demo remove-block-start */}
      {isLogin ? (
        <>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          {/* @demo remove-block-end */}
          <Stack.Screen name="MainMenu" component={MainMenu} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

          {/* @demo remove-block-start */}
          <Stack.Screen name="ChooseStudent" component={ChooseStudentScreen} />
          <Stack.Screen name="Question" component={QuestionScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="Evaluation" component={EvaluationScreen} />
          <Stack.Screen name="ImediateInformation" component={ImediateInformationScreen} />
          <Stack.Screen name="StudentForm" component={StudentFormScreen} />
          <Stack.Screen name="OverallFeedBack" component={OverallFeedBackScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ShowProfile" component={ShowProfile} />
          <Stack.Screen name="LoginPage1" component={LoginPage1} />
          <Stack.Screen name="Reporting" component={ReportingScreen} />
          <Stack.Screen name="Student" component={StudentScreen} />
          <Stack.Screen name="FeedBack" component={FeedbackScreen} />
          <Stack.Screen name="BMI" component={BMIScreen} />
          <Stack.Screen name="Imediate" component={ImediateInfoScreen} />
          <Stack.Screen name="ImediateDetail" component={ImediateInfoDetailScreen} />
          <Stack.Screen name="PurvPrathmik" component={PurvPrathmikScreen} />
          <Stack.Screen name="StudentResult" component={StudentResultScreen} />
          <Stack.Screen name="Demo" component={DemoNavigator} />
          <Stack.Screen
            name="SelectStudentShowAllFeedBack"
            component={SelectStudentShowAllFeedBackScreen}
          />

          <Stack.Screen name="MorePlans" component={MorePlansScreen} />
          <Stack.Screen name="AnganwadiSuvidhaTypes" component={AnganwadiSuvidhaTypeScreen} />

          <Stack.Screen name="AboutAnganwadi" component={AboutAnganwadiScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="AWCType" component={AWCTypeScreen} />
          <Stack.Screen name="AWWWorkingHelpers" component={AWWWorkingHelpersScreen} />
          <Stack.Screen name="NutritionalStatus" component={NutritionalStatusScreen} />
          <Stack.Screen name="AnganwadiProfile" component={AnganwadiProfileScreen} />

          <Stack.Screen name="TotalParticipants" component={TotalParticipantsScreen} />
          <Stack.Screen
            name="FunctionsAndServicesByAWC"
            component={FunctionsAndServicesByAWCScreen}
          />
          <Stack.Screen
            name="InfrastructureFacilities"
            component={InfrastructureFacilitiesScreen}
          />
          <Stack.Screen name="GovermentScheme" component={GovermentSchemeScreen} />

          <Stack.Screen name="ActivitySummary" component={ActivitySummaryScreen} />
          <Stack.Screen name="ShowParticularSuvidha" component={ShowParticularSuvidhaScreen} />
          <Stack.Screen name="SuvidhaSubType" component={SuvidhaSubTypeScreen} />
          <Stack.Screen name="HBAnemia" component={HBAnemiaScreen} />
          <Stack.Screen name="Vaccination" component={VaccinationScreen} />
          <Stack.Screen name="CalculatorAndTimetable" component={CalculatorAndTimetableScreen} />
          <Stack.Screen name="EDD" component={EDDScreen} />
          <Stack.Screen name="SamMam" component={SamMamScreen} />
          <Stack.Screen name="SuwMuw" component={SuwMuwScreen} />
          <Stack.Screen name="Aarambha" component={AarambhaScreen} />
          <Stack.Screen name="Aakar" component={AakarScreen} />
          <Stack.Screen name="NipunBharat" component={NipunBharatScreen} />

          <Stack.Screen name="Sansadhane" component={SansadhaneScreen} />
          <Stack.Screen name="Paryavekshan" component={ParyavekshanScreen} />
          <Stack.Screen name="HealthCheckup" component={HealthCheckupScreen} />
          <Stack.Screen name="CustomisedReport" component={CustomisedReportScreen} />
          <Stack.Screen name="MonthlyReport" component={MonthlyReportScreen} />
          <Stack.Screen name="VDCC" component={VDCCScreen} />
          <Stack.Screen name="WeeklyReport" component={WeeklyReportScreen} />
          <Stack.Screen name="YearlyReport" component={YearlyReportScreen} />
          <Stack.Screen name="PurakPoshanAhar" component={PurakPoshanAharScreen} />
          <Stack.Screen name="Suchana" component={SuchanaScreen} />
          <Stack.Screen name="ShowParticularSuchana" component={ShowParticularSuchanaScreen} />
          <Stack.Screen name="ShowParticularResource" component={ShowParticularResourceScreen} />

          <Stack.Screen name="Meeting" component={MeetingScreen} />
          <Stack.Screen name="NoticeBoard" component={NoticeBoardScreen} />
          <Stack.Screen name="NutritionCampaign" component={NutritionCampaignScreen} />
          <Stack.Screen name="ToolCenter" component={ToolCenterScreen} />
          <Stack.Screen name="SpecificResource" component={SpecificResourceScreen} />
          <Stack.Screen name="ShowAllSuvidhaAndAdd" component={ShowAllSuvidhaAndAddScreen} />
          <Stack.Screen name="AakarDetails" component={AakarDetailsScreen} />
          <Stack.Screen name="FinalGradation" component={FinalGradationScreen} />
          <Stack.Screen name="PSE" component={PSEScreen} />
          <Stack.Screen name="SamMamReport" component={SamMamReportScreen} />
          <Stack.Screen name="SuwMuwSudharna" component={SuwMuwSudharnaScreen} />
          <Stack.Screen name="VCDCReport" component={VCDCReportScreen} />
          <Stack.Screen name="FirstCBEReport" component={FirstCBEReportScreen} />
          <Stack.Screen name="StudentAdd" component={StudentAddScreen} />
          <Stack.Screen name="LBWReport" component={LBWReportScreen} />
          <Stack.Screen name="BALAawc" component={BALAawcScreen} />
          <Stack.Screen name="WashroomInfo" component={WashroomInfoScreen} />
          <Stack.Screen name="WomenHBBMI" component={WomenHBBMIScreen} />
          <Stack.Screen name="KishoriHBBMI" component={KishoriHBBMIScreen} />
          <Stack.Screen name="BirthRate" component={BirthRateScreen} />
          <Stack.Screen name="FinalHealthCheckup" component={FinalHealthCheckupScreen} />
          <Stack.Screen name="BalAdharNondani" component={BalAdharNondaniScreen} />
          <Stack.Screen name="BirthRateCalculator" component={BirthRateCalculatorScreen} />
          <Stack.Screen name="PastMeetingList" component={PastMeetingListScreen} />
          <Stack.Screen name="PastMeetingList" component={PastMeetingListScreen} />
          <Stack.Screen name="PastMeetingDetailShow" component={PastMeetingDetailShowScreen} />
          <Stack.Screen name="AddStudent" component={AddStudentScreen} />
          <Stack.Screen name="ShowStudent" component={ShowStudentScreen} />
          <Stack.Screen
            name="ShowParticularSuvidhaDetail"
            component={ShowParticularSuvidhaDetailScreen}
          />
          <Stack.Screen
            name="SuvidhaAddAndDisplayMain"
            component={SuvidhaAddAndDisplayMainScreen}
          />
          <Stack.Screen name="MahitiBaghaDetailList" component={MahitiBaghaDetailListScreen} />
          <Stack.Screen name="StudentBMIcalculate" component={StudentBMIcalculateScreen} />

          <Stack.Screen name="FurtherQuestions" component={FurtherQuestionsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
        </>
      )}
      {/* @demo remove-block-end */}
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  const { isLogin } = useLoginContext()
  useEffect(() => {
    crashlytics().log("App mounted.")
  }, [])
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} {...props}>
      {/* <AppStack /> */}
      {isLogin ? <BottomTabNavigation /> : <LoginPageScreenStack />}
    </NavigationContainer>
  )
})
