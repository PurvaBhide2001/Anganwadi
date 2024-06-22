import { Alert, Box, useToast } from "native-base"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { age3TO4 } from "../../assets/constant/Question"
import ToastShow from "../components/ToastShow"
import { useLoginContext } from "./LoginContext"
interface SelectedQuestion {
  id: number
  answer: string
}
interface QuestionContextInterface {
  selectedQuestionArray: any[]
  setSelectedQuestionArray: Function
  currentQuestion: number
  setCurrentQuestion: Function
  nextQuestion: Function
  previousQuestion: Function
  selectedQuestion: any
  isRight: boolean
  isLeft: boolean
  rightButton: Function
  leftButton: Function
  changesButton: boolean
  questionIndex: any
  setSelectQuestion: Function
  setsubmitedAnswersArray: Function
  submitedAnswersArray: any[]
  setChangeButton: Function
}
const QuestionContext = createContext<null | QuestionContextInterface>(null)

type QuestionContextProps = { children: React.ReactNode }

export const QuestionContextProvider = ({ children }: QuestionContextProps) => {
  // const [questionIndex, setQuestionIndex] = useState<number>(0)
  const questionIndex = useRef(0)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedQuestionArray, setSelectedQuestionArray] = useState<any[]>([...age3TO4])
  const [selectedQuestion, setSelectQuestion] = useState(
    selectedQuestionArray[questionIndex.current],
  )
  const [submitedAnswersArray, setsubmitedAnswersArray] = useState<any[]>([])
  const [isRight, setIsRight] = useState<boolean>(false)

  const [isLeft, setIsLeft] = useState<boolean>(false)
  const { toastShow } = useLoginContext()
  const toast = useToast()
  const [changesButton, setChangeButton] = useState(false)

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
      if (selectedQuestionArray.length - 1 === questionIndex.current) {
        setChangeButton(true)
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
    setIsLeft(false)
    setIsRight(false)
  }
  /**
   *
   * @param data for set
   */
  const setExistingData = (data: any) => {
    const existdata = submitedAnswersArray.find((item) => item?.question === data?.id)
    if (existdata) {
      if (existdata.answer == 0) {
        setIsLeft(true)
        setIsRight(false)
      } else {
        setIsLeft(false)
        setIsRight(true)
      }
    }
  }

  /**
   * @click to the next question
   */
  const nextQuestion = () => {
    if (selectedQuestionArray.length > questionIndex.current) {
      !(selectedQuestionArray.length - 1 === questionIndex.current) && clearButton()
      const existIndex = submitedAnswersArray.findIndex(
        (question) => question?.question === selectedQuestion?.id,
      )

      if (existIndex === -1) {
        if (isLeft === isRight) {
          toastShow(toast, "कृपया तुम्ही तुमचे उत्तर निवडा!!!", "top", "#fab4b4")
        } else {
          const questionObj = {
            question: selectedQuestion?.id,
            answer: isLeft ? 0 : 1,
          }
          incrementAndSetData([...submitedAnswersArray, questionObj])
          setExistingData(selectedQuestionArray[questionIndex.current])
        }
      } else {
        const questionObj = {
          question: selectedQuestion?.id,
          answer: isLeft ? 0 : 1,
        }
        const arrayData = [...submitedAnswersArray]
        arrayData.splice(existIndex, 1, questionObj)
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
        if (isLeft === isRight) {
          toastShow(toast, "कृपया तुम्ही तुमचे उत्तर निवडा!!!", "top")
        } else {
          const questionObj = {
            question: selectedQuestion?.id,
            answer: isLeft ? 0 : 1,
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
          answer: isLeft ? 0 : 1,
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
  }
  const leftButton = () => {
    setIsRight(false)
    setIsLeft(true)
  }

  const value: QuestionContextInterface = {
    selectedQuestionArray,
    setSelectedQuestionArray,
    currentQuestion,
    setCurrentQuestion,
    nextQuestion,
    previousQuestion,
    selectedQuestion,
    isRight,
    isLeft,
    rightButton,
    leftButton,
    changesButton,
    questionIndex,
    setSelectQuestion,
    setsubmitedAnswersArray,
    submitedAnswersArray,
    setChangeButton,
  }
  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export const useQuestionContext = () => {
  const context = useContext(QuestionContext)
  if (!context) throw new Error("use question context use in question context provider")
  return context
}
