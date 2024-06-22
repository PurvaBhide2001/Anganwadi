import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useLoginContext } from "../../Context/LoginContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import GovermentPlanItem from "../MainMenu/GovermentPlanItem"
// import GovermentPlanItem from "./GovermentPlanItem"

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
      {schemeList?.map(({ title, icon, id }: any, i: number) => {
        return <GovermentPlanItem title={title} icon={icon} id={id} key={i} />
      })}
    </Box>
  )
}
