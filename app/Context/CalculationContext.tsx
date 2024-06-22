import { Box, Text, useToast } from "native-base"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { ListAllApi } from "../api/ListAllApi"
import { StudentApi } from "../api/StudentApi"
import { UserApi } from "../api/UserApi"
import { bmi, calculateAge } from "../filter/calculateFormule"
import { navigate } from "../navigators"
import { useCommanContextContext } from "./CommanContext"

interface CalculationContextInterface {
  height: number
  setHeight: Function
  weight: number
  setWeight: Function
  bmiValue: number
  age: number | string
  onCalculateBMI: Function
  setBmiLabel: Function
  bmiLabel: string
  vaccination: any[]
  vaccination1: any[]
  vaccination2: any[]
}
const CalculationContext = createContext<null | CalculationContextInterface>(null)

type CalculationContextProps = { children: React.ReactNode }

export const CalculationContextProvider = ({ children }: CalculationContextProps) => {
  const { selectedDate } = useCommanContextContext()
  const [height, setHeight] = useState<any>("")
  const [weight, setWeight] = useState<any>("")
  const [age, setAge] = useState<number | string>(0)
  const [bmiValue, setBmiValue] = useState<any>(0)
  const [bmiLabel, setBmiLabel] = useState("")

  const onCalculateBMI = () => {
    if (height !== 0 && weight !== 0 && selectedDate) {
      setAge(calculateAge(selectedDate))
      setBmiValue(bmi(height, weight))
    } else {
      alert("please fill all data")
    }
  }

  const vaccination = [
    {
      id: 1,
      title: "टी.टी-१",
      when: "गरोदरपणाच्‍या सुरुवातीला",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "दंडाच्‍या वरच्‍या बाजुला",
    },
    {
      id: 2,
      title: "टी.टी-2",
      when: "टी.टी. दिल्‍यानंतर ४ आठवडयांनी+",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "दंडाच्‍या वरच्‍या बाजुला",
    },
    {
      id: 3,
      title: "टी.टी-बूस्‍टर",
      when: "जर माता मागील टी.टी. दिल्‍यानंतर ३ वर्षाच्‍या आत गरोदर राहिल्‍यास",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "दंडाच्‍या वरच्‍या बाजुला",
    },
  ]
  const vaccination1 = [
    {
      id: 1,
      title: "बी.सी.जी.",
      when: "जन्‍मतः, शक्‍य तितक्‍या लवकर, एक वर्ष पुर्ण होण्‍याआधी",
      amount: "०.१ मि.ली.(एक महिना आंतील बालकांना ०.०५ मि.ली.)",
      way: "त्‍वचेमध्‍ये (अंतःत्‍वचा)",
      place: "डाव्‍या दंडाच्‍या वरच्‍या बाजुला",
    },
    {
      id: 2,
      title: "हिपॅटायटिस़्- बी जन्‍मतः",
      when: "जन्‍मल्‍यानंतर २४ तासाच्‍या आत",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "डाव्‍या मांडीच्‍या मध्‍यभागी बाहेरील बाजुला",
    },
    {
      id: 3,
      title: "ओ.पी.व्‍ही. झिरो मात्रा",
      when: "जन्‍मतः, शक्‍य तितक्‍या लवकर, १४ दिवसापर्यंत",
      amount: "२ थेंब",
      way: "तोंडावाटे",
      place: "तोंडावाटे",
    },
    {
      id: 4,
      title: "ओ.पी.व्‍ही. १,२ व ३",
      when: "जन्‍मल्‍यानंतर ६, १० व १४वा आठवडा पूर्ण झाल्‍यावर",
      amount: "२ थेंब",
      way: "तोंडावाटे",
      place: "तोंडावाटे",
    },
    {
      id: 5,
      title: "डी.पी.टी. १,२ व ३",
      when: "जन्‍मल्‍यानंतर ६, १० व १४वा आठवडा पूर्ण झाल्‍यावर",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "उजव्‍या मांडीच्‍या मध्‍यभागी बाहेरील बाजुला",
    },
    {
      id: 6,
      title: "हिपॅटायटिस़्- बी १,२ व ३",
      when: "जन्‍मल्‍यानंतर ६, १० व १४वा आठवडा पूर्ण झाल्‍यावर",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "डाव्‍या मांडीच्‍या मध्‍यभागी बाहेरील बाजुला",
    },
    {
      id: 7,
      title: "गोवर",
      when: "जन्‍मल्‍यानंतर ९ महिने पूर्ण झाल्‍यावर, १ वर्ष पूर्ण होण्‍याआधी",
      amount: "०.५ मि.ली.",
      way: "अधःत्‍वचेत",
      place: "उजव्‍या दंडाच्‍या वरच्‍या बाजुला",
    },
    {
      id: 8,
      title: "जीवनसत्‍व- अ- १",
      when: "जन्‍मल्‍यानंतर ९ महिने पूर्ण झाल्‍यावर, गोवर लसीबरोबर",
      amount: "१ मि.ली. (१ आय.यू.)",
      way: "तोंडावाटे",
      place: "तोंडावाटे",
    },
  ]
  const vaccination2 = [
    {
      id: 1,
      title: "डी.पी.टी. बूस्‍टर",
      when: "१६ ते २४ महिने",
      amount: "०.५ मि.ली.",
      way: "	अंतःस्‍नायुत",
      place: "उजव्‍या मांडीच्‍या मध्‍यभागी बाहेरील बाजुला",
    },
    {
      id: 2,
      title: "ओ.पी.व्‍ही. बूस्‍टर",
      when: "१६ ते २४ महिने",
      amount: "२ थेंब",
      way: "तोंडावाटे",
      place: "तोंडावाटे",
    },
    {
      id: 3,
      title: "गोवर बूस्‍टर",
      when: "१६ ते २४ महिने",
      amount: "	०.५ मि.ली.",
      way: "अधःत्‍वचेत",
      place: "उजव्‍या दंडाच्‍या वरच्‍या बाजुला",
    },
    {
      id: 4,
      title: "जे.ई.",
      when: "१६ ते २४ महिने++",
      amount: "	०.५ मि.ली.",
      way: "अधःत्‍वचेत",
      place: "डाव्‍या दंडाच्‍या वरच्‍या बाजुला",
    },
    {
      id: 5,
      title: "जीवनसत्‍व- अ- २ ते ९",
      when: "१६ महिने, व नंतर प्रत्‍येक सहा-सहा महिन्‍याने ५ वर्षे पूर्ण होईपर्यंत+++",
      amount: "२ मि.ली. (२ आय.यू.)",
      way: "तोंडावाटे",
      place: "तोंडावाटे",
    },
    {
      id: 6,
      title: "डी.पी.टी. बूस्‍टर",
      when: "५ ते ६ वर्षे",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "दंडाच्‍या वरच्‍या बाजुला",
    },
    {
      id: 7,
      title: "टी.टी.",
      when: "१० व १६ वर्षे",
      amount: "०.५ मि.ली.",
      way: "अंतःस्‍नायुत",
      place: "दंडाच्‍या वरच्‍या बाजुला",
    },
  ]

  const value: CalculationContextInterface = {
    height,
    setHeight,
    weight,
    setWeight,
    bmiValue,
    age,
    onCalculateBMI,
    setBmiLabel,
    bmiLabel,
    vaccination,
    vaccination1,
    vaccination2,
  }
  return <CalculationContext.Provider value={value}>{children}</CalculationContext.Provider>
}

export const useCalculationContext = () => {
  const context = useContext(CalculationContext)
  if (!context) throw new Error("use Calculation context use in Calculation context provider")
  return context
}
