import { useToast } from "native-base"
import { createContext, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { QuestionApi } from "../api/QuestionApi"
import { navigate } from "../navigators"
import { useCommanContextContext } from "./CommanContext"
import { useLoginContext } from "./LoginContext"
import { useQuestionContext } from "./QuestionContext"
import { useStudentContextContext } from "./StudentContext"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { responsiveWidth } from "react-native-responsive-dimensions"
import { dateFormatRequiredType } from "../filter/dateAndTimeFormat"
import { calculateAge } from "../filter/calculateFormule"

interface FeedbackContextInterface {
  control: any
  handleSubmit: Function
  onSubmitFeedBack: Function
  questionAnswers: any[]
  setQuestionAnswers: Function
  studentBasicInfo: any
  setStudentBasicInfo: Function
  titleObject: any
  iconObject: any
  evaluationtitle: string
  answers: any
}
const FeedbackContextContext = createContext<null | FeedbackContextInterface>(null)
type FeedbackContextProps = { children: React.ReactNode }

export const FeedbackContextContextProvider = ({ children }: FeedbackContextProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" })
  const { submitedAnswersArray } = useQuestionContext()
  const toast = useToast()
  const {
    ageCategoery,
    bmiValue,
    evaluationID,
    studentID,
    setEvaluationID,
    setStudentID,
    studentDate,
  } = useStudentContextContext()
  const { toastShow } = useLoginContext()
  const { selectedDate, weight, height, setHeight, setWeight } = useCommanContextContext()
  const [questionAnswers, setQuestionAnswers] = useState<any[]>([])
  const [answers, setanswers] = useState<any[]>([])
  const [studentBasicInfo, setStudentBasicInfo] = useState<any>({})
  const [evaluationtitle, setEvaluationtitle] = useState<string>("")
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
    fullName: "विद्यार्थ्यांचे नाव",
    eval_date: "मूल्यमापन तारीख",
    gender: "लिंग",
    height: "उंची",
    weight: "वजन",
    bmi: "बॉडी मास इंडेक्स",
    dob: "वय",
    age_group: "वयोगट",
    // parent_opinion: "पालकाच अभिप्राय ",
    // teacher_opinion: "शिक्षकाचा  अभिप्राय",
    eval_type: "मूल्यमापनाचा प्रकार",
  })
  const onSubmitFeedBack = async (data: any) => {
    // if (data.parent_opinion !== "" && data.teacher_opinion !== "") {
    const jsonData = {
      basic: {
        age_category: ageCategoery,
        bmi: bmiValue,
        eval_date: dateFormatRequiredType(studentDate, "YYYY-MM-DD"),
        eval_type: evaluationID,
        height: height,
        weight: weight,
        student_id: studentID,

        // ...data,
      },
      answers: submitedAnswersArray,
    }
    const {
      result: {
        data: { data: response },
      },
    } = await QuestionApi.createResult(jsonData)
    const {
      profile,
      survey,
      survey: { answers },
    } = response
    setanswers(answers)

    setQuestionAnswers([...survey])
    console.log("awtQuestionAnswers*******8", answers)

    setEvaluationtitle(profile.evaluation_title)
    setStudentBasicInfo({
      fullName: `${profile.f_name}  ${profile.l_name}`,
      gender: profile.gender,
      dob: calculateAge(profile.dob),
      age_group: profile.age_group,
      eval_date: profile.eval_date,
      bmi: profile.bmi,
      // parent_opinion: profile.parent_opinion,
      // teacher_opinion: profile.teacher_opinion,
      height: profile.height,
      weight: profile.weight,
    })

    setHeight(0)
    setWeight(0)
    setEvaluationID(0)
    setStudentID("")

    toastShow(toast, "तुमची माहिती हि पाठवली गेली आहे !!!", "top", "#bdfcbd")
    navigate("StudentResult")
    // } else {

    // toastShow(toast, "कृपया प्रतिक्रिया भरा!!!!", "top", "#fab4b4")
    // }
  }

  const value: FeedbackContextInterface = {
    control,
    handleSubmit,
    onSubmitFeedBack,
    questionAnswers,
    setQuestionAnswers,
    studentBasicInfo,
    setStudentBasicInfo,
    titleObject,
    iconObject,
    evaluationtitle,
    answers,
  }
  return <FeedbackContextContext.Provider value={value}>{children}</FeedbackContextContext.Provider>
}

export const useFeedbackContextContext = () => {
  const context = useContext(FeedbackContextContext)
  if (!context)
    throw Error("overall feedback context provider wrapp in overall feedback context provider")
  return context
}
