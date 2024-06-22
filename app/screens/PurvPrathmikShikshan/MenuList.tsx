import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import MenuItem from "./MenuItem"

export default ({ arrayMenuList }: any) => {
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
      {arrayMenuList.map(
        (
          { title, icon, bgcolor, bottomBorderColor, textColor, event, itemList }: any,
          i: number,
        ) => {
          return (
            <MenuItem
              title={title}
              icon={icon}
              bgcolor={bgcolor}
              bottomBorderColor={bottomBorderColor}
              textColor={textColor}
              event={event}
              key={i}
              itemList={itemList}
            />
          )
        },
      )}
    </Box>
  )
}
