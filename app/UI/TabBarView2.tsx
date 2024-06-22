import { Box } from "native-base"
import { TouchableOpacity } from "react-native"
import TabBarButtons from "./TabBarButtons"
interface IProps {
  onClickToViewTab: Function
  selectedTabIndex: number
  itemList: any[]
  Component: Function
  requiresurveyProfileDataKey: any
}
export default ({ onClickToViewTab, selectedTabIndex, itemList, Component }: IProps) => {
  return (
    <>
      <Box flex={1} flexDirection={"column"}>
        <Box flex={4} flexDirection={"row"}>
          {itemList.map(({ evaluation_title }: any, index: number) => (
            <TabBarButtons
              onClickToViewTab={onClickToViewTab}
              index={index}
              title={evaluation_title}
              selectedTabIndex={selectedTabIndex}
            />
          ))}
        </Box>
        <Box flex={8}>
          <Component itemList={itemList} selectedTabIndex={selectedTabIndex} />
        </Box>
      </Box>
    </>
  )
}
