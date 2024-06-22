import { createContext, useContext, useState } from "react"

interface OverallFeedBackInterface {
  overallFeedBack: any[]
}
const OverallFeedBackContext = createContext<null | OverallFeedBackInterface>(null)
type overallFeedBackProps = { children: React.ReactNode }

export const OverallFeedBackContextProvider = ({ children }: overallFeedBackProps) => {
  const [overallFeedBack] = useState<any[]>([
    {
      title: "पहिले मूल्यमापन",
      evaluationDate: "12-02.2023",
      height: "96",
      weight: "15",
      bmi: "16.3",
      overAllFeedBack: "something",
      parent: "adfdsffdf",
      sevika: "dsfdsfdsf",
      bgColor: "indigo.100",
      titleColor: "indigo.500",
      borderBottomColor: "indigo.300"
    },
    {
      title: "दुसरे मूल्यमापन",
      evaluationDate: "12-02.2023",
      height: "96",
      weight: "15",
      bmi: "16.3",
      overAllFeedBack: "something",
      parent: "adfdsffdf",
      sevika: "dsfdsfdsf",
      bgColor: "green.100",
      titleColor: "green.500",
      borderBottomColor: "green.300"
    },
    {
      title: "तिसरे मूल्यमापन",
      evaluationDate: "12-02.2023",
      height: "96",
      weight: "15",
      bmi: "16.3",
      overAllFeedBack: "something",
      parent: "adfdsffdf",
      sevika: "dsfdsfdsf",
      bgColor: "yellow.100",
      titleColor: "yellow.500",
      borderBottomColor: "yellow.300"
    },
    {
      title: "चौथे मूल्यमापन",
      evaluationDate: "12-02.2023",
      height: "96",
      weight: "15",
      bmi: "16.3",
      overAllFeedBack: "something",
      parent: "adfdsffdf",
      sevika: "dsfdsfdsf",
      bgColor: "red.100",
      titleColor: "red.500",
      borderBottomColor: "red.300"
    },
  ])

  const value: OverallFeedBackInterface = {
    overallFeedBack,
  }
  return <OverallFeedBackContext.Provider value={value}>{children}</OverallFeedBackContext.Provider>
}

export const useOverallFeedBackContext = () => {
  const context = useContext(OverallFeedBackContext)
  if (!context)
    throw Error("overall feedback context provider wrapp in overall feedback context provider")
  return context
}
