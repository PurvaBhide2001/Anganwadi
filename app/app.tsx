/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import { setupReactotron } from "./services/reactotron"
import Config from "./config"
import { NativeBaseProvider } from "native-base"
import { HomeScreenContextProvider } from "./Context/HomeScreenContext"
import { StudentContextProvider } from "./Context/StudentContext"
import { QuestionContextProvider } from "./Context/QuestionContext"
import { LoginContextProvider } from "./Context/LoginContext"
import { AnganwadiSuvidhaContextProvider } from "./Context/AnganwadiSuvidhaContext"
import { ImediateInformationContextProvider } from "./Context/ImediateInformationContext"
import { OverallFeedBackContextProvider } from "./Context/OverallFeedBackContext"

import { AddressContextProvider } from "./Context/AddressContext"
import { UserProfileContextProvider } from "./Context/UserProfileContext"

import { CommanContextProvider } from "./Context/CommanContext"
import { FeedbackContextContextProvider } from "./Context/FeedbackContext"
import { MainMenuContextProvider } from "./Context/MainMenuContext"
import { ImdediateInfoContextProvider } from "./Context/ImdediateInfoContext"
import { PurvPrathmikContextContextProvider } from "./Context/PurvPrathmikContext"
import { StudentResultContextProvider } from "./Context/StudentResultContext"
import { CalculationContextProvider } from "./Context/CalculationContext"
import { BMIContextProvider } from "./Context/BMIContext"
import { AnganwadiProfileContextProvider } from "./Context/AnganwadiProfileContext"
import { SchemeContextProvider } from "./Context/SchemeContext"
import { RadioButtonRenderContextProvider } from "./Context/RadioButtonRenderContext"
import { MeetingContextProvider } from "./Context/MeetingContext"
import { SuchanaContextProvider } from "./Context/SuchanaContext"
import { SansadhaneContextProvider } from "./Context/SansadhaneContext"
import { PlayingToysContextProvider } from "./Context/PlayingToysContext"
import { SuvidhaDetailShowContextProvider } from "./Context/SuvidhaDetailShowContext"
import { NipunBharatQuestionContextProvider } from "./Context/NipunBharatQuestionContext"
import { NipunBharatStudentContextProvider } from "./Context/NipunBharatStudentContext"
import { TabBarContextProvider } from "./Context/TabBarContext"
import { ReportContextProvider } from "./Context/ReportContext"
import { AakarContextProvider } from "./Context/AakarContext"
import { AnganwadiEmployeeContextProvider } from "./Context/AnganwadiEmployeeContext"
import { StudentAddContextProvider } from "./Context/StudentAddContext"

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: "localhost",
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.
    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(hideSplashScreen, 1500)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NativeBaseProvider>
        <ErrorBoundary catchErrors={Config.catchErrors}>
          <CommanContextProvider>
            <TabBarContextProvider>
              <CalculationContextProvider>
                <MainMenuContextProvider>
                  <LoginContextProvider>
                    <SuchanaContextProvider>
                      <AakarContextProvider>
                        <StudentAddContextProvider>
                          <ReportContextProvider>
                            <SansadhaneContextProvider>
                              <SchemeContextProvider>
                                <PlayingToysContextProvider>
                                  <AnganwadiEmployeeContextProvider>
                                    <AnganwadiProfileContextProvider>
                                      <UserProfileContextProvider>
                                        <RadioButtonRenderContextProvider>
                                          <AnganwadiSuvidhaContextProvider>
                                            <SuvidhaDetailShowContextProvider>
                                              <ImdediateInfoContextProvider>
                                                <MeetingContextProvider>
                                                  <AddressContextProvider>
                                                    <ImediateInformationContextProvider>
                                                      <PurvPrathmikContextContextProvider>
                                                        <NipunBharatQuestionContextProvider>
                                                          <NipunBharatStudentContextProvider>
                                                            <HomeScreenContextProvider>
                                                              <QuestionContextProvider>
                                                                <BMIContextProvider>
                                                                  <StudentContextProvider>
                                                                    <FeedbackContextContextProvider>
                                                                      <StudentResultContextProvider>
                                                                        <OverallFeedBackContextProvider>
                                                                          <AppNavigator
                                                                            linking={linking}
                                                                            initialState={
                                                                              initialNavigationState
                                                                            }
                                                                            onStateChange={
                                                                              onNavigationStateChange
                                                                            }
                                                                          />
                                                                        </OverallFeedBackContextProvider>
                                                                      </StudentResultContextProvider>
                                                                    </FeedbackContextContextProvider>
                                                                  </StudentContextProvider>
                                                                </BMIContextProvider>
                                                              </QuestionContextProvider>
                                                            </HomeScreenContextProvider>
                                                          </NipunBharatStudentContextProvider>
                                                        </NipunBharatQuestionContextProvider>
                                                      </PurvPrathmikContextContextProvider>
                                                    </ImediateInformationContextProvider>
                                                  </AddressContextProvider>
                                                </MeetingContextProvider>
                                              </ImdediateInfoContextProvider>
                                            </SuvidhaDetailShowContextProvider>
                                          </AnganwadiSuvidhaContextProvider>
                                        </RadioButtonRenderContextProvider>
                                      </UserProfileContextProvider>
                                    </AnganwadiProfileContextProvider>
                                  </AnganwadiEmployeeContextProvider>
                                </PlayingToysContextProvider>
                              </SchemeContextProvider>
                            </SansadhaneContextProvider>
                          </ReportContextProvider>
                        </StudentAddContextProvider>
                      </AakarContextProvider>
                    </SuchanaContextProvider>
                  </LoginContextProvider>
                </MainMenuContextProvider>
              </CalculationContextProvider>
            </TabBarContextProvider>
          </CommanContextProvider>
        </ErrorBoundary>
      </NativeBaseProvider>
    </SafeAreaProvider>
  )
}

export default App
