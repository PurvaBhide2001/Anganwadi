import { Box } from "native-base"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import MenuItem from "./MenuItem"

export default () => {
  const { menuData } = useHomeScreenContext()
  return (
    <Box
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
      }}
    >
      {menuData.map(
        ({ title, icon, bgcolor, bottomBorderColor, textColor, event }: any, i: number) => {
          return (
            <MenuItem
              title={title}
              icon={icon}
              bgcolor={bgcolor}
              bottomBorderColor={bottomBorderColor}
              textColor={textColor}
              event={event}
              key={i}
            />
          )
        },
      )}
    </Box>
  )
}
