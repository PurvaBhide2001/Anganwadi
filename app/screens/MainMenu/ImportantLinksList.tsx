import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import ImportantLinksItem from "./ImportantLinksItem"

export default () => {
  const { ImportantLinksList } = useMainMenuContext()
  return (
    <Box
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: responsiveWidth(2),
      }}
    >
      {ImportantLinksList.map(
        ({ title, bgColor, icon, borderColor, navigation }: any, i: number) => {
          return (
            <ImportantLinksItem
              key={i + 7771}
              title={title}
              bgColor={bgColor}
              icon={icon}
              borderColor={borderColor}
              navigation={navigation}
            />
          )
        },
      )}
    </Box>
  )
}
