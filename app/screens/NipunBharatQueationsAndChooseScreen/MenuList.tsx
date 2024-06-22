import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { useHomeScreenContext } from "../../Context/HomeScreenContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import MenuItem from "./MenuItem"
import { useNipunBharatStudentContextContext } from "../../Context/NipunBharatStudentContext"
import { randIntWithZero } from "../../filter/requireFunction"
interface IProps {
  examCategoery: any[]
  onClickQuestionCategoery: Function
  isExam?: boolean
}
export default ({ examCategoery, onClickQuestionCategoery, isExam }: IProps) => {
  const { examCategoeries } = useNipunBharatStudentContextContext()

  const selectedExamCategoery = examCategoeries[randIntWithZero(examCategoeries.length)]
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
      {examCategoery.map((item: any, i: number) => {
        return (
          <MenuItem
            item={item}
            bgcolor={selectedExamCategoery.bgcolor}
            bottomBorderColor={selectedExamCategoery.bottomBorderColor}
            textColor={selectedExamCategoery.textColor}
            onClickQuestionCategoery={onClickQuestionCategoery}
            isExam={isExam}
            key={i}
          />
        )
      })}
    </Box>
  )
}
