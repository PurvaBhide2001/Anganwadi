import { Alert, Box, useToast } from "native-base"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { age3TO4 } from "../../assets/constant/Question"
import ToastShow from "../components/ToastShow"
import { useLoginContext } from "./LoginContext"
import { navigate } from "../navigators"
interface SelectedQuestion {
  id: number
  answer: string
}
interface NipunBharatQuestionContextInterface {
  selectedQuestionArray: any[]
  setSelectedQuestionArray: Function
  currentQuestion: number
  setCurrentQuestion: Function
  nextQuestion: Function
  previousQuestion: Function
  selectedQuestion: any
  answerArrayObject: any[]
  isRight: boolean
  isLeft: boolean
  isCenter: boolean
  rightButton: Function
  leftButton: Function
  centerButton: Function
  changesButton: boolean
  questionIndex: any
  setSelectQuestion: Function
  setsubmitedAnswersArray: Function
  submitedAnswersArray: any[]
  setChangeButton: Function
  setSelectedStudentData: Function
  selectedAnswerID: number | string
  setToTheSelectedAnswer: Function
}
const NipunBharatQuestionContext = createContext<null | NipunBharatQuestionContextInterface>(null)

type NipunBharatQuestionContextProps = { children: React.ReactNode }

export const NipunBharatQuestionContextProvider = ({
  children,
}: NipunBharatQuestionContextProps) => {
  // const [questionIndex, setQuestionIndex] = useState<number>(0)
  const questionIndex = useRef(0)
  const currentAnswerData = useRef<any>("")
  const [selectedStudentData, setSelectedStudentData] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedQuestionArray, setSelectedQuestionArray] = useState<any[]>([])
  const [selectedQuestion, setSelectQuestion] = useState(
    selectedQuestionArray[questionIndex.current],
  )
  const [answerArrayObject, setAnswerArrayObject] = useState()
  const [submitedAnswersArray, setsubmitedAnswersArray] = useState<any[]>([])
  const [isRight, setIsRight] = useState<boolean>(false)
  const [isLeft, setIsLeft] = useState<boolean>(false)
  const [isCenter, setIsCenter] = useState<boolean>(false)
  const { toastShow } = useLoginContext()
  const toast = useToast()
  const [changesButton, setChangeButton] = useState(false)
  const [selectedAnswerID, setSelectedAnswerID] = useState<number | string>("")
  /**
   *
   * @param arrayData
   */
  const decrementedAndSetData = (arrayData: any[]) => {
    setsubmitedAnswersArray(arrayData)
    questionIndex.current = questionIndex.current - 1
    setSelectQuestion(selectedQuestionArray[questionIndex.current])
  }
  /**
   *
   * @param arrayData icremented by +1 and set data
   */
  const incrementAndSetData = (arrayData: any[]) => {
    setsubmitedAnswersArray(arrayData)
    if (selectedQuestionArray.length > questionIndex.current) {
      console.log(
        "submitedAnswersArraysubmitedAnswersArray",
        submitedAnswersArray,
        currentAnswerData.current,
      )
      if (selectedQuestionArray.length - 1 === questionIndex.current) {
        setChangeButton(true)
        console.log(
          "submitedAnswersArraysubmitedAnswersArray",
          submitedAnswersArray,
          currentAnswerData.current,
        )
      } else {
        questionIndex.current = questionIndex.current + 1
        setSelectQuestion(selectedQuestionArray[questionIndex.current])
      }
    }
  }
  /**
   * clear button
   */
  const clearButton = () => {
    setSelectedAnswerID("")
    setIsLeft(false)
    setIsRight(false)
    setIsCenter(false)
  }
  /**
   *
   * @param data for set
   */
  const setExistingData = (data: any) => {
    const existdata = submitedAnswersArray.find((item) => item?.question === data?.id)
    if (existdata) {
      setSelectedAnswerID(existdata.answer)
      if (existdata.answer == 1) {
        setIsLeft(true)
        setIsRight(false)
        setIsCenter(false)
      } else if (existdata.answer == 2) {
        setIsLeft(false)
        setIsCenter(false)
        setIsRight(true)
      } else {
        setIsLeft(false)
        setIsRight(false)
        setIsCenter(true)
      }
    }
  }

  const sameValue = () => {
    return isLeft === isRight && isRight === isCenter && isLeft === isCenter
  }
  /**
   * @click to the next question
   */
  const nextQuestion = () => {
    if (selectedQuestionArray.length > questionIndex.current) {
      console.log(
        "selectedQuestionArray.length,questionIndex.current",
        selectedQuestionArray.length,
        questionIndex.current,
      )

      !(selectedQuestionArray.length - 1 === questionIndex.current) && clearButton()
      const existIndex = submitedAnswersArray.findIndex(
        (question) => question?.question === selectedQuestion?.id,
      )

      if (existIndex === -1) {
        if (selectedAnswerID == "") {
          toastShow(toast, "कृपया तुम्ही तुमचे उत्तर निवडा!!!", "top", "#fab4b4")
        } else {
          console.log("selectedAnswerID next", selectedAnswerID)

          const questionObj = {
            question: selectedQuestion?.id,
            answer: selectedAnswerID,
          }
          incrementAndSetData([...submitedAnswersArray, questionObj])
          !(selectedQuestionArray.length - 1 === questionIndex.current) && setSelectedAnswerID("")
          setExistingData(selectedQuestionArray[questionIndex.current])
        }
      } else {
        const questionObj = {
          question: selectedQuestion?.id,
          answer: selectedAnswerID,
        }
        currentAnswerData.current = questionObj
        const arrayData = [...submitedAnswersArray]
        arrayData.splice(existIndex, 1, questionObj)
        setSelectedAnswerID("")
        incrementAndSetData(arrayData)

        setExistingData(selectedQuestionArray[questionIndex.current])
      }
    } else {
      setChangeButton(true)
    }
  }
  /**
   * @click to the previous question
   */
  const previousQuestion = () => {
    if (0 < questionIndex.current) {
      setChangeButton(false)
      clearButton()
      const existIndex = submitedAnswersArray.findIndex(
        (question) => question?.question === selectedQuestion?.id,
      )

      if (existIndex === -1) {
        if (selectedAnswerID == "") {
          // decrementedAndSetData([...submitedAnswersArray])
          decrementedAndSetData([...submitedAnswersArray])

          /**
           * if already data are exist then set it
           */
          setExistingData(selectedQuestionArray[questionIndex.current])
          // toastShow(toast, "कृपया तुम्ही तुमचे उत्तर निवडा!!!", "top")
        } else {
          const questionObj = {
            question: selectedQuestion?.id,
            answer: selectedAnswerID,
          }

          decrementedAndSetData([...submitedAnswersArray, questionObj])

          /**
           * if already data are exist then set it
           */
          setExistingData(selectedQuestionArray[questionIndex.current])
        }
      } else {
        const questionObj = {
          question: selectedQuestion.id,
          answer: selectedAnswerID,
        }
        const arrayData = [...submitedAnswersArray]
        arrayData.splice(existIndex, 1, questionObj)
        decrementedAndSetData(arrayData)

        setExistingData(selectedQuestionArray[questionIndex.current])
      }
    } else {
      toastShow(toast, "तुम्ही कृपया पुढचे बटण दाबा!!!", "top")
    }
  }

  const rightButton = () => {
    setIsRight(true)
    setIsLeft(false)
    setIsCenter(false)
  }
  const leftButton = () => {
    setIsRight(false)
    setIsCenter(false)
    setIsLeft(true)
  }
  const centerButton = () => {
    setIsRight(false)
    setIsLeft(false)
    setIsCenter(true)
  }

  const setToTheSelectedAnswer = (id: number | string) => {
    setSelectedAnswerID(id)
  }

  const value: NipunBharatQuestionContextInterface = {
    selectedQuestionArray,
    setSelectedQuestionArray,
    currentQuestion,
    setCurrentQuestion,
    nextQuestion,
    previousQuestion,
    selectedQuestion,
    isRight,
    isLeft,
    isCenter,
    rightButton,
    leftButton,
    centerButton,
    changesButton,
    questionIndex,
    setSelectQuestion,
    setsubmitedAnswersArray,
    submitedAnswersArray,
    setChangeButton,
    answerArrayObject,
    setSelectedStudentData,
    selectedAnswerID,
    setToTheSelectedAnswer,
  }
  return (
    <NipunBharatQuestionContext.Provider value={value}>
      {children}
    </NipunBharatQuestionContext.Provider>
  )
}

export const useNipunBharatQuestionContext = () => {
  const context = useContext(NipunBharatQuestionContext)
  if (!context) throw new Error("use question context use in question context provider")
  return context
}
