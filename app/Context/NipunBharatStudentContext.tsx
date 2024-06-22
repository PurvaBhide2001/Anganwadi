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
import { StudentApi } from "../api/StudentApi"
import { evaluationData } from "../../assets/constant/commanConstant"
import { useNipunBharatQuestionContext } from "./NipunBharatQuestionContext"
import { NipunBharatApi } from "../api/NipunBharatApi"
interface NipunBharatStudentContextInterface {
  selectedStudent: any
  setSelectedStudent: Function
  control: any
  handleSubmit: Function
  ageGroup: any[]
  onSubmit: Function
  setToTheStudent: Function
  studentID: number | string
  setStudentID: Function
  ageCategoery: number
  age: number
  bmiValue: number | string
  setBmiValue: Function
  selectedQuestionArrayData: any[]
  evaluationID: number
  setEvaluationID: Function
  onChangeStudent: Function
  evaluationArray: any[]
  onSubmitQuestionAnswer: Function
  ageString: string
  examCategoeries: any[]
  examCategoery: any
  onClickQuestionCategoery: Function
  onSubmitQuestionData: Function
  onSumitShowExamResult: Function
  onSubmitToShowExamCategoeries: Function
  nipunBharatResultData: any
}
const NipunBharatStudentContext = createContext<null | NipunBharatStudentContextInterface>(null)

type NipunBharatStudentContextProps = { children: React.ReactNode }

export const NipunBharatStudentContextProvider = ({ children }: NipunBharatStudentContextProps) => {
  const bmiVal = useRef(0)
  const {
    questionIndex,
    setSelectQuestion,
    setsubmitedAnswersArray,
    setSelectedQuestionArray,
    setCurrentQuestion,
    setChangeButton,
    submitedAnswersArray,
  } = useNipunBharatQuestionContext()
  const [ageGroup, setAgeGroup] = useState([
    {
      id: 1,
      group: " ३-४ वयोगट",
    },
    {
      id: 2,
      group: "४-५  वयोगट",
    },
    {
      id: 3,
      group: " ५-६ वयोगट",
    },
  ])
  const [selectedQuestionArrayData, setSelectedQuestionArrayData] = useState<any[]>([])
  const { weight, height, setHeight, setWeight } = useCommanContextContext()
  const [studentID, setStudentID] = useState<number | string>("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [evaluationArray, setEavluationArray] = useState<any[]>([])
  const [evaluationID, setEvaluationID] = useState<number>(0)
  const [bmiValue, setBmiValue] = useState<number | string>(0)
  const [ageString, setAgeString] = useState<string>("")
  const { studentList, toastShow } = useLoginContext()
  const [ageCategoery, setAgeCategoery] = useState<number>(0)
  const [age, setAge] = useState<number>(0)
  const [examCategoery, setStudentCategoery] = useState([])
  const [examTitle, setExamTitle] = useState<string>("")
  const toast = useToast()

  const [categoeryID, setCategoeryID] = useState<number | string>("")
  const [nipunBharatResultData, setNipunBharatResultData] = useState<any[]>(null)
  const [examCategoeries] = useState([
    {
      id: 2,
      title: "मूल्यमापन बघा",
      icon: require("../../assets/surveyimages/MenuXL/Mullyamapan_Bagha.png"),
      bgcolor: "#dde8fa",
      itemList: [],
      bottomBorderColor: "#88b2f7",
      event: () => navigate("SelectStudentShowAllFeedBack"),
    },
    {
      id: 3,
      title: "मूल्यमापन करा",
      icon: require("../../assets/surveyimages/MenuXL/Mullyamapan_Kara.png"),
      bgcolor: "#fdf7e7",
      itemList: [],
      bottomBorderColor: "#f8d1ae",
      event: () => navigate("ChooseNipunBharatStudent"),
    },
    {
      id: 4,
      title: "मूल्यमापन बघा2343243",
      icon: require("../../assets/surveyimages/MenuXL/Mullyamapan_Bagha.png"),
      bgcolor: "#dde8fa",
      itemList: [],
      bottomBorderColor: "#88b2f7",
      event: () => navigate("SelectStudentShowAllFeedBack"),
    },
    {
      id: 6,
      title: "मूल्यमापन करा324234",
      icon: require("../../assets/surveyimages/MenuXL/Mullyamapan_Kara.png"),
      bgcolor: "#fdf7e7",
      itemList: [],
      bottomBorderColor: "#f8d1ae",
      event: () => navigate("ChooseNipunBharatStudent"),
    },
  ])
  const { control, handleSubmit } = useForm()
  const studentQuestions = async (studentID: number | string) => {
    const {
      result: {
        data: { data },
      },
    } = await QuestionApi.get(studentID)

    return data
  }
  const getStudentEvaluationData = async (studentID: number | string) => {
    const {
      result: {
        data: { data, status },
      },
    } = await StudentApi.getEvaluation(studentID)

    status == 200 &&
      setEavluationArray(
        data?.map((item: any) => ({
          id: item?.id,
          label: evaluationData[item?.eval_type],
        })),
      )
    status == 204 && toastShow(toast, "तुमचे सर्व मूल्यमापन झालेले आहेत!!!", "top", "#bdfcbd")
    status == 204 && setEavluationArray([])
  }
  const onSubmitQuestionAnswer = () => {
    // setHeight(0)
    // setWeight(0)
    // setStudentID("")
    // setEvaluationID(0)
    // navigate("FeedBack")
  }
  const onChangeStudent = async (item: any) => {
    setStudentID(item)
  }
  const getStudentData = async (studentID: number | string) => {
    const {
      result: {
        data: { data },
      },
    } = await StudentApi.get(studentID)
    return data
  }
  const getEaxamCategoeries = async (studentID: number | string) => {
    const {
      result: {
        data: { data, status },
      },
    } = await NipunBharatApi.getExamCategoeries(studentID)

    return { data, status }
  }
  const setToTheStudent = async () => {
    if (studentID) {
      const { data, status } = await getEaxamCategoeries(studentID)
      console.log("====================================")
      console.log("this is nipun", data, status)
      console.log("====================================")

      if (data.length !== 0 && status == 200) {
        setStudentCategoery(data)
        const student = studentList?.find((student: any) => student?.Id == studentID)
        const age = calculateAge(student?.dob)

        const studentData = await getStudentData(studentID)

        setAgeCategoery(studentData?.age_group_id)
        setAgeString(studentData?.age_group)
        setAge(Number(age))
        questionIndex.current = 0
        bmiVal.current = bmi(height, weight)

        setsubmitedAnswersArray([])
        setCurrentQuestion(null)
        setChangeButton(false)
        setSelectedStudent(student)
        navigate("NipunBharatExamCategoeries")
      } else {
        toastShow(toast, "तुम्ही वयोगटात बसत नाही !!!!", "top", "#fab4b4")
      }
    } else {
      toastShow(toast, "कृपया लाभार्थी निवडा !!!!", "top", "#fab4b4")
    }
  }

  const onSubmit = () => {
    if (weight != 0 && height != 0) {
      navigate("Question")
    } else {
      toastShow(toast, "कृपया उंची आणि वजन निवडा !!!!", "top", "#fab4b4")
    }
  }

  const onClickQuestionCategoery = async (item: any) => {
    const {
      result: {
        data: {
          data: { exam_title, questions },
          status,
        },
      },
    } = await NipunBharatApi.getExamQuestions(studentID, item?.id)
    console.log(" exam_title, questions ", exam_title, questions)

    item.is_exam_done && toastShow(toast, "तुमची चाचणी अगोदर झालेली आहे !!", "top", "#fab4b4")

    if (status == 200 && !item.is_exam_done) {
      setExamTitle(exam_title)
      setCategoeryID(item?.id)
      setSelectedQuestionArrayData(questions)
      setSelectedQuestionArray([...questions])
      setSelectQuestion(questions[questionIndex.current])
      navigate("NipunBharatQuestion")
    }
  }

  const onSubmitQuestionData = async () => {
    const jsonData = {
      student_id: studentID,
      exam_id: categoeryID,
      questions: [...submitedAnswersArray],
    }
    console.log("json data=========", jsonData)

    const {
      result: { data, status },
    } = await NipunBharatApi.submitQuestionAnswer(jsonData)
    console.log("====================================")
    console.log("NipunBharatApi.submitQuestionAnswer", data)
    console.log("====================================")
    if (status == 200) {
      setStudentID("")
      toastShow(toast, "तुमची माहिती हि पाठवली गेली आहे !!!", "top", "#bdfcbd")
      setTimeout(() => {
        navigate("ChooseNipunBharatStudent")
      }, 1000)
    } else {
      toastShow(toast, "कृपया प्रतिक्रिया भरा!!!!", "top", "#fab4b4")
    }
  }
  const onSubmitToShowExamCategoeries = async () => {
    const { data, status } = await getEaxamCategoeries(studentID)
    console.log("====================================")
    console.log(data, status)
    console.log("====================================")
    if (status == 200) {
      setStudentCategoery(data)
      navigate("NipunBharatShowResultCategoery")
    }
  }

  const onSumitShowExamResult = async (item: any) => {
    console.log("studentID, exam_id", studentID, item.id)

    const {
      result: { data },
    } = await NipunBharatApi.getExistedExam(studentID, item?.id)
    console.log("data +++", data)
    setNipunBharatResultData(data)
    navigate("NipunStudentResult")
  }
  const value: NipunBharatStudentContextInterface = {
    selectedStudent,
    setSelectedStudent,
    control,
    handleSubmit,
    ageGroup,
    onSubmit,
    setToTheStudent,
    studentID,
    setStudentID,
    ageCategoery,
    age,
    bmiValue,
    setBmiValue,
    selectedQuestionArrayData,
    evaluationID,
    setEvaluationID,
    onChangeStudent,
    evaluationArray,
    onSubmitQuestionAnswer,
    ageString,
    examCategoeries,
    examCategoery,
    onClickQuestionCategoery,
    onSubmitQuestionData,
    onSumitShowExamResult,
    onSubmitToShowExamCategoeries,
    nipunBharatResultData,
  }
  return (
    <NipunBharatStudentContext.Provider value={value}>
      {children}
    </NipunBharatStudentContext.Provider>
  )
}

export const useNipunBharatStudentContextContext = () => {
  const context = useContext(NipunBharatStudentContext)
  if (!context) throw Error("use StudentContext in  StudentContext screen context provider!!")
  return context
}
