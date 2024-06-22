import { Box, Pressable, useColorModeValue } from "native-base"
import Animated from "react-native-reanimated"
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions"

import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"

export default ({ navigationState, position }: any) => {
  const { routes } = navigationState
  const inputRange = routes.map((_: any, i: number) => i)
  const { tabBarIndex, setTabBarIndex } = usePurvPrathmikContextContext()
  return (
    <Box flexDirection="row">
      {routes.map((route: any, i: number) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: number) => (inputIndex === i ? 1 : 0.5)),
        })
        const color =
          tabBarIndex === i
            ? useColorModeValue("#535050", "#e5e5e5")
            : useColorModeValue("#1f2937", "#a1a1aa")
        const borderColor =
          tabBarIndex === i ? "cyan.500" : useColorModeValue("coolGray.200", "gray.400")
        return (
          <Box
            borderBottomWidth="3"
            borderColor={borderColor}
            flex={1}
            alignItems="center"
            p="3"
            key={i}
          >
            <Pressable
              onPress={() => {
                console.log(i)
                setTabBarIndex(i)
              }}
            >
              <Animated.Text
                style={{
                  color,
                  fontSize: responsiveFontSize(1.9),
                  fontWeight: "500",
                }}
              >
                {route.title}
              </Animated.Text>
            </Pressable>
          </Box>
        )
      })}
    </Box>
  )
}
