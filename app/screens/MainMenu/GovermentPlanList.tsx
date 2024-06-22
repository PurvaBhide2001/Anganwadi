import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useLoginContext } from "../../Context/LoginContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import GovermentPlanItem from "./GovermentPlanItem"
import MenuXLItem from "./MenuXLItem"

export default () => {
  const { govermentPlanList } = useMainMenuContext()
  const { schemeList } = useLoginContext()

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
      {schemeList &&
        schemeList
          ?.filter((_, i: number) => i <= 5)
          ?.map(({ title, icon, id }: any, i: number) => {
            return <GovermentPlanItem title={title} icon={icon} key={i + 982} id={id} />
          })}
    </Box>
  )
}
