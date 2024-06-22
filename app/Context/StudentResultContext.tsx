import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { navigate } from "../navigators"
import { useLoginContext } from "./LoginContext"
import { bmi, calculateAge } from "../filter/calculateFormule"
import { useToast } from "native-base"
import { useCommanContextContext } from "./CommanContext"
import { age3TO4, age4TO5, age5TO6 } from "../../assets/constant/Question"
import { useQuestionContext } from "./QuestionContext"
import { QuestionApi } from "../api/QuestionApi"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { responsiveWidth } from "react-native-responsive-dimensions"

interface StudentResultContextInterface {
  iconObject: any
  titleObject: any
  studentBasicInfo: any
  questionAnswers: any[]
  setQuestionAnswers: Function
}
const StudentResultContext = createContext<null | StudentResultContextInterface>(null)

type StudentResultContextProps = { children: React.ReactNode }

export const StudentResultContextProvider = ({ children }: StudentResultContextProps) => {
  const [questionAnswers, setQuestionAnswers] = useState<any[]>([])
  const [studentBasicInfo, setStudentBasicInfo] = useState<any>({
    id: "29",
    student_id: "1",
    eval_date: "2023",
    height: "78",
    weight: "20",
    age_category: "1",
    parent_opinion: "sdlkfjslkdf",
    teacher_opinion: "slkdfjl",
    eval_type: "1",
    created_at: "2023-02-08 09:14:16",
    updated_at: null,
  })
  const [iconObject] = useState<any>({
    student_id: <FontAwesome5 name="user-check" size={responsiveWidth(5)} />,
    eval_date: <FontAwesome5 name="date" size={responsiveWidth(5)} />,
    height: <FontAwesome5 name="human-male-height-variant" size={responsiveWidth(5)} />,
    weight: <FontAwesome5 name="weight" size={responsiveWidth(5)} />,
    age_categoery: <FontAwesome5 name="category" size={responsiveWidth(5)} />,
    parent_opinion: <FontAwesome5 name="unknowfile1" size={responsiveWidth(5)} />,
    teacher_opinion: <FontAwesome5 name="unknowfile1" size={responsiveWidth(5)} />,
    eval_type: <FontAwesome5 name="unknowfile1" size={responsiveWidth(5)} />,
  })
  const [titleObject] = useState<any>({
    student_id: "विद्यार्थ्यांचे नाव",
    eval_date: "मूल्यमापन तारीख",
    height: "उंची",
    weight: "वजन",
    age_category: "वयाचा वर्ग",
    parent_opinion: "पालकाच अभिप्राय ",
    teacher_opinion: "शिक्षकाचा  अभिप्राय",
    eval_type: "मूल्यमापनाचा प्रकार",
  })

  const value: StudentResultContextInterface = {
    titleObject,
    iconObject,
    studentBasicInfo,
    questionAnswers,
    setQuestionAnswers,
  }
  return <StudentResultContext.Provider value={value}>{children}</StudentResultContext.Provider>
}

export const useStudentResultContext = () => {
  const context = useContext(StudentResultContext)
  if (!context)
    throw Error("use StudentResultContext in  StudentResultContext screen context provider!!")
  return context
}

/**
 *  const setToTheStudentResult = async () => {
    if (StudentResultID) {
      const StudentResult = StudentResultList.find((StudentResult: any) => StudentResult.id == StudentResultID)
      const age = calculateAge(StudentResult.dob)
      const data = await StudentResultQuestions(StudentResultID)
  
      if (age >= 3 && age <= 6) {
        setAge(Number(age))
        questionIndex.current = 0
        setSelectedQuestionArrayData(data)
        setSelectedQuestionArray([...data])
        setSelectQuestion(data[questionIndex.current])
        if (age >= 3 && age <= 4) {
          setAgeCategoery("३-४ वयोगट")
          setSelectedQuestionArrayData(data)
          setSelectedQuestionArray([...data])
          setSelectQuestion(data[questionIndex.current])
        } else if (age > 4 && age <= 5) {
          setAgeCategoery("४-५ वयोगट")
          setSelectedQuestionArrayData(age4TO5)
          setSelectedQuestionArray([...data])
          setSelectQuestion(data[questionIndex.current])
        } else if (age > 5 && age <= 6) {
          setAgeCategoery("५-६ वयोगट")
          setSelectedQuestionArrayData(data)
          setSelectedQuestionArray([...data])
          setSelectQuestion(data[questionIndex.current])
        }
        setsubmitedAnswersArray([])
        setCurrentQuestion(null)
        setChangeButton(false)
        setSelectedStudentResult(StudentResult)
        navigate("StudentResultForm")
      } else {
        toastShow(toast, "तुम्ही वयोगटात बसत नाही!!!", "top", "emerald.400")
      }
    } else {
      toastShow(toast, "कृपया विद्यार्थी निवडा!!!!", "top", "#fab4b4")
    }
  }
 */
