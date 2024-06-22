import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"
import QuestionsAndSurveyDetailItem from "./QuestionsAndSurveyDetailItem"
interface IProps {
  itemList: any[]
  selectedTabIndex: number
}
export default ({ itemList, selectedTabIndex }: IProps) => {
  const { requiresurveyProfileDataKey } = usePurvPrathmikContextContext()
  return (
    <>
      {itemList.map(
        (item: any, index: number) =>
          selectedTabIndex === index && (
            <QuestionsAndSurveyDetailItem
              item={item}
              requiresurveyProfileDataKey={requiresurveyProfileDataKey}
              key={index}
            />
          ),
      )}
    </>
  )
}
