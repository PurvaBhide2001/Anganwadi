import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import MenuXLItem from "./MenuXLItem"

export default () => {
  const { menuXLList } = useMainMenuContext()
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
      {menuXLList.map(
        (
          { title, icon, bgcolor, bottomBorderColor, textColor, event, itemList, count }: any,
          i: number,
        ) => {
          return (
            <MenuXLItem
              title={title}
              icon={icon}
              bgcolor={bgcolor}
              // bottomBorderColor={bottomBorderColor}
              // textColor={textColor}
              event={event}
              key={i + 1}
              itemList={itemList}
              count={count}
            />
          )
        },
      )}
    </Box>
  )
}
