import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react"
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
import { dateFormat, dateFormatRequiredType } from "../filter/dateAndTimeFormat"
import { BackHandler } from "react-native"
import { useAnganwadiEmployeeContext } from "./AnganwadiEmployeeContext"
import { log } from "react-native-reanimated"
interface StudentContextInterface {
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
  callBackDate: Function
  studentDate: any
  onSubmitStudentData: Function
  studentData: any[]
  studentDataStatus: any
  studentControl: any
  studentHandleSubmit: Function
  callBackShow1: Function
  callBackShow2: Function
  callBackShow3: Function
  show1: boolean
  show2: boolean
  show3: boolean
  birthDateValue: any
  admissionDateValue: any
  passDateValue: any
  callBackdateSet: Function
  callBackdateSet1: Function
  callBackdateSet2: Function
  studentWatch: Function
  isLoadingImage1: any
  isLoadingImage2: any
  imageName1: any
  imageName2: any
  exectuteLoaderImage1: Function
  exectuteLoaderImage2: Function
  setIsLoadingImage1: Function
  setIsLoadingImage2: Function
  setImageCallBack1: Function
  setImageCallBack2: Function
  addStudentStatus: any
  studentError: any
  isLoadingPage: boolean
  resetDataForm: Function
  openStudentModal: Function
  closeStudentModal: Function
  isOpenStudentModal: boolean
  onClickToTheStudent: Function
  currentSelectedStudent: any
  deleteMessage: string
  deleteBtnName: string
  yesToDeleteStudentItem: Function
  deleteStudentItem: Function
  isWarningModalOpen: boolean
  closeWarningModal: Function
  onUpdateStudent: Function
  updateStudentID: Function
  status: any
  isUpdate: boolean
  onUpdatedStudent: Function
}
const StudentContext = createContext<null | StudentContextInterface>(null)

type StudentContextProps = { children: React.ReactNode }

export const StudentContextProvider = ({ children }: StudentContextProps) => {
  const bmiVal = useRef(0)
  const {
    questionIndex,
    setSelectQuestion,
    setsubmitedAnswersArray,
    setSelectedQuestionArray,
    setCurrentQuestion,
    setChangeButton,
  } = useQuestionContext()

  const studentForm = {
    block: "",
    district: "",
    f_name: "",
    gender: " ",
    height: "",
    l_name: "",
    m_name: "",
    mother_name: "",
    state: "",
    village: "",
    weight: "",
  }
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
  const [studentDate, setStudentDate] = useState<any>(new Date())
  const [studentData, setStudentData] = useState<any[]>([])
  const [studentDataStatus, setStudentDataStatus] = useState<any>([])
  const toast = useToast()
  const [addStudentStatus, setAddStudentStatus] = useState<any>([])
  const [isOpenStudentModal, setIsOpenStudentModal] = useState<boolean>(false)
  const [birthDateValue, setbirthDateValue] = useState<any>("")
  const [admissionDateValue, setAdmissionDateValue] = useState<any>("")
  const [passDateValue, setPassDateValue] = useState<any>("")
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [show3, setShow3] = useState<boolean>(false)
  const [isLoadingImage1, setIsLoadingImage1] = useState<boolean>(false)
  const [isLoadingImage2, setIsLoadingImage2] = useState<boolean>(false)
  const [imageName1, setImageName1] = useState<string>("")
  const [imageName2, setImageName2] = useState<string>("")
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false)
  const [currentSelectedStudent, setCurrentSelectedStudent] = useState<any>(null)
  const [deleteMessage, setDeleteMessage] = useState<any>(
    "तुम्हाला लाभार्थी नक्की हटवायचा आहे का??",
  )
  const [deleteBtnName] = useState<string>("हटवा")
  const [cancelBtnName] = useState<string>("रद्द करा")
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)
  const [selectedStudentID, setSelectedStudentID] = useState<string | number>("")
  const [status, setStatus] = useState<any>([])
  const closeWarningModal = () => {
    setIsWarningModalOpen(false)
  }
  const openWarningModal = () => {
    setIsWarningModalOpen(true)
  }
  /* Delete Student */
  const yesToDeleteStudentItem = async () => {
    console.log("about to delete")
    console.log("selectedStudentID", selectedStudentID)

    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await StudentApi.deleteStudent(selectedStudentID)
    console.log("data deleted", data, status)
    closeWarningModal()
    getStudentList()
  }
  const deleteStudentItem = (id: number | string) => {
    setSelectedStudentID(id)
    openWarningModal()
  }

  /**
   * open student modal
   */
  const openStudentModal = () => {
    setIsOpenStudentModal(true)
  }
  /**
   * close student modal
   */
  const closeStudentModal = () => {
    setIsOpenStudentModal(false)
  }

  /**
   * on click to student show modal
   */
  const onClickToTheStudent = (student: any) => {
    setCurrentSelectedStudent(student)
    openStudentModal()
  }

  const setImageCallBack1 = useCallback((response: any) => {
    setImageName1(response)
  }, [])
  const setImageCallBack2 = useCallback((response: any) => {
    setImageName2(response)
  }, [])
  const exectuteLoaderImage1 = useCallback(() => {
    setIsLoadingImage1(false)
  }, [])
  const exectuteLoaderImage2 = useCallback(() => {
    setIsLoadingImage2(false)
  }, [])
  const callBackShow1 = useCallback((value: boolean) => {
    setShow1(value)
  }, [])
  const callBackShow2 = useCallback((value: boolean) => {
    setShow2(value)
  }, [])
  const callBackShow3 = useCallback((value: boolean) => {
    setShow3(value)
  }, [])
  const callBackdateSet = useCallback((date: any) => {
    setbirthDateValue(date)
  }, [])
  const callBackdateSet1 = useCallback((date: any) => {
    setAdmissionDateValue(date)
  }, [])
  const callBackdateSet2 = useCallback((date: any) => {
    setPassDateValue(date)
  }, [])

  const { useData } = useLoginContext()

  const getStudentList = async () => {
    const { result: { data: { data = [], status = 204 } = {} } = {} } =
      await StudentApi.getStudentsOfPerticularAnganwadi(useData?.anganwadi_id)
    status == 200 && setStudentData(data)
    status == 204 && setStudentData([])
  }

  useEffect(() => {
    ;(async () => {
      if (!useData) return

      await getStudentList()
    })()
  }, [useData])
  const {
    reset: studentFormReset,
    control: studentControl,
    formState: { errors: studentError },
    handleSubmit: studentHandleSubmit,
    watch: studentWatch,
    setValue,
  } = useForm()

  const resetDataForm = () => {
    studentFormReset()
    setImageName1("")
    setImageName2("")
    setbirthDateValue("")
    setPassDateValue("")
    setAdmissionDateValue("")
    setPassDateValue("")
  }

  const commanToCheckUnformData = () => {
    if (imageName1 == "" || birthDateValue == "" || admissionDateValue == "") {
      let message: string = ""
      if (imageName1 == "" && birthDateValue == "" && admissionDateValue == "") {
        message = "सामील होण्याचा फोटो,जन्मतारीख,अंगणवाडीत प्रवेश तारीख अनिवार्य आहे!!"
      } else if (imageName1 == "" && birthDateValue == "") {
        message = "सामील होण्याचा फोटो,जन्मतारीख अनिवार्य आहे!!"
      } else if (imageName1 == "" && admissionDateValue == "") {
        message = "सामील होण्याचा फोटो,अंगणवाडीत प्रवेश तारीख अनिवार्य आहे!!"
      } else if (birthDateValue == "" && admissionDateValue == "") {
        message = "जन्मतारीख,अंगणवाडीत प्रवेश तारीख अनिवार्य आहे!!"
      } else if (imageName1 == "") {
        message = "सामील होण्याचा फोटो अनिवार्य आहे!!"
      } else if (birthDateValue == "") {
        message = "जन्मतारीख अनिवार्य आहे!!"
      } else {
        message = "अंगणवाडीत प्रवेश तारीख अनिवार्य आहे!!"
      }
      toastShow(toast, message, "top", "#bdfcbd")
      return
    }
  }
  const onSubmitStudentData = async (formData: any) => {
    commanToCheckUnformData()
    setIsLoadingPage(true)
    const jsonData = {
      anganwadi_id: useData.anganwadi_id,
      join_photo: imageName1,
      pass_photo: imageName2,
      dob: dateFormatRequiredType(birthDateValue, "YYYY-MM-DD"),
      join_date: dateFormatRequiredType(admissionDateValue, "YYYY-MM-DD"),
      pass_date: dateFormatRequiredType(passDateValue, "YYYY-MM-DD"),
      ...formData,
    }
    console.log(jsonData, "STUDENT dataaaaa create")
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await StudentApi.createStudent(jsonData)
    setAddStudentStatus(status)
    console.log("addStudent status", formData)
    studentFormReset(studentForm)
    setImageName1("")
    setImageName2("")

    if (status == 200) {
      setIsLoadingPage(false)
      toastShow(toast, "लाभार्थी यशस्वीरित्या जोडला गेला आहे", "top", "#bdfcbd")

      await getStudentList()
      navigate("ShowStudent")
    }

    console.log(data, "Student created")
  }

  /* Set Student */

  const StudentDetailsArray = [
    "f_name",
    "m_name",
    "l_name",
    "mother_name",
    "state",
    "district",
    "block",
    "village",
    "gender",
    "weight",
    "height",
  ]
  const getStudent = async () => {
    setIsUpdate(false)
    const { result: { data: { data: [studentData] = [], status = 204 } = {} } = {} } =
      await StudentApi.getPerticularStudent(studentID)
    console.log(studentData, "Studentdata=======")

    setStatus(status)
    if (status == 200) {
      StudentDetailsArray.forEach((element) => {
        setValue(element, studentData[element])
      })
    }
  }
  useEffect(() => {
    if (!useData) return
    getStudent()
  }, [useData])
  /* Student Update */
  const updateStudentID = (id: number | string) => {
    setSelectedStudentID(id)
  }

  const onUpdateStudent = async (student: any) => {
    setIsUpdate(true)
    setStudentID(student?.Id)
    StudentDetailsArray.forEach((name: string) => setValue(name, student[name]))
    console.log(" student?.join_photo", student)
    student?.join_photo && setImageName1(student?.join_photo)
    student?.pass_photo && setImageName2(student?.pass_photo)
    student?.dob && setbirthDateValue(new Date(student?.dob))
    student?.join_date && setAdmissionDateValue(new Date(student?.join_date))
    student?.pass_date && setPassDateValue(new Date(student?.pass_date))
    navigate("AddStudent")
  }
  const onUpdatedStudent = async (formData: any) => {
    setIsLoadingPage(true)
    const jsonData = {
      anganwadi_id: useData.anganwadi_id,
      ...formData,
      join_photo: imageName1,
      pass_photo: imageName2,
      dob: dateFormatRequiredType(birthDateValue, "YYYY-MM-DD"),
      join_date: dateFormatRequiredType(admissionDateValue, "YYYY-MM-DD"),
      pass_date: dateFormatRequiredType(passDateValue, "YYYY-MM-DD"),
    }
    console.log(jsonData, "THIS is Updated Student json")

    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await StudentApi.updateStudent(studentID, jsonData)
    console.log("update  by employee data", data, status)
    if (status == 200) {
      setIsLoadingPage(false)
      getStudentList()
      navigate("ShowStudent")
    }
  }

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
  const callBackDate = useCallback((date: any) => {
    setStudentDate(date)
  }, [])
  const onChangeStudent = async (item: any) => {
    setStudentID(item)
    setEavluationArray([])
    getStudentEvaluationData(item)
  }
  const getStudentData = async (studentID: number | string) => {
    const {
      result: {
        data: { data },
      },
    } = await StudentApi.get(studentID)
    return data
  }
  const setToTheStudent = async () => {
    if (studentID && evaluationID !== 0) {
      const student = studentList?.find((student: any) => student?.Id == studentID)
      const age = calculateAge(student?.dob)

      if (Number(age) >= 3 && Number(age) <= 6) {
        const studentData = await getStudentData(studentID)

        const questionData = await studentQuestions(studentID)
        setAgeCategoery(studentData?.age_group_id)
        setAgeString(studentData?.age_group)
        setAge(Number(age))
        questionIndex.current = 0
        bmiVal.current = bmi(height, weight)

        setSelectedQuestionArrayData(questionData)
        setSelectedQuestionArray([...questionData])
        setSelectQuestion(questionData[questionIndex.current])
        setsubmitedAnswersArray([])
        setCurrentQuestion(null)
        setChangeButton(false)
        setSelectedStudent(student)

        navigate("StudentBMIcalculate")
      } else {
        toastShow(toast, "तुम्ही वयोगटात बसत नाही!!!", "top", "#bdfcbd")
      }
    } else {
      toastShow(toast, "कृपया विद्यार्थी आणि मूल्यमापन निवडा !!!!", "top", "#fab4b4")
    }
  }

  const onSubmit = () => {
    if (weight != 0 && height != 0) {
      navigate("Question")
    } else {
      toastShow(toast, "कृपया उंची आणि वजन निवडा !!!!", "top", "#fab4b4")
    }
  }
  const value: StudentContextInterface = {
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
    callBackDate,
    studentDate,
    onSubmitStudentData,
    studentData,
    studentDataStatus,
    studentControl,
    studentHandleSubmit,
    callBackShow1,
    callBackShow2,
    callBackShow3,
    show1,
    show2,
    show3,
    birthDateValue,
    admissionDateValue,
    passDateValue,
    callBackdateSet,
    callBackdateSet1,
    callBackdateSet2,
    studentWatch,
    isLoadingImage1,
    isLoadingImage2,
    imageName1,
    imageName2,
    exectuteLoaderImage1,
    exectuteLoaderImage2,
    setIsLoadingImage1,
    setIsLoadingImage2,
    setImageCallBack1,
    setImageCallBack2,
    addStudentStatus,
    studentError,
    isLoadingPage,
    resetDataForm,
    openStudentModal,
    closeStudentModal,
    isOpenStudentModal,
    onClickToTheStudent,
    currentSelectedStudent,
    yesToDeleteStudentItem,
    deleteMessage,
    deleteBtnName,
    deleteStudentItem,
    isWarningModalOpen,
    closeWarningModal,
    onUpdateStudent,
    updateStudentID,
    status,
    isUpdate,
    onUpdatedStudent,
  }
  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

export const useStudentContextContext = () => {
  const context = useContext(StudentContext)
  if (!context) throw Error("use StudentContext in  StudentContext screen context provider!!")
  return context
}

/**
 *  const setToTheStudent = async () => {
    if (studentID) {
      const student = studentList.find((student: any) => student.id == studentID)
      const age = calculateAge(student.dob)
      const data = await studentQuestions(studentID)
    
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
        setSelectedStudent(student)
        navigate("StudentForm")
      } else {
        toastShow(toast, "तुम्ही वयोगटात बसत नाही!!!", "top", "emerald.400")
      }
    } else {
      toastShow(toast, "कृपया विद्यार्थी निवडा!!!!", "top", "#fab4b4")
    }
  }
 */
