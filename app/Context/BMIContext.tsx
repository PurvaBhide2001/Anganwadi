import { useToast } from "native-base"
import { createContext, useContext, useRef, useState } from "react"
import { useCalculationContext } from "./CalculationContext"
import { useLoginContext } from "./LoginContext"

interface BMIInterface {
  BMI: any[]
  calculateBMI: Function
}
const BMIContext = createContext<null | BMIInterface>(null)
type BMIProps = { children: React.ReactNode }

export const BMIContextProvider = ({ children }: BMIProps) => {
  const [bmiValue, setBmiValue] = useState<number>(0)
  const [BMI] = useState<any[]>([
    {
      id: 1,
      title: "वाढ",
      description: "वयानुसार अपेक्षित उंची",
      bgColor: "#d3f7d7",
      borderColor: "#40A48B",
      name: "योग्य",
      icon: require("../../assets/surveyimages/BMIScreen/overweight.png"),
    },
  ])
  const boy = require("../../assets/surveyimages/BMIScreen/B1.png")
  const girl = require("../../assets/surveyimages/BMIScreen/G1.png")
  const icon = require("../../assets/surveyimages/BMIScreen/G1.png")
  const [isBoy, setIsBoy] = useState(false)
  const images = [
    require("../../assets/surveyimages/BMIScreen/F.png"),
    require("../../assets/surveyimages/BMIScreen/T.png"),
    require("../../assets/surveyimages/BMIScreen/N.png"),
  ]
  const colors = ["#e05754", "#f1b824", "#61cb3e"]
  const bgColor = ["#f28c8a", "#f7cf68", "#99f57a"]
  const [bmiConclusionImage, setBmiConclusionImage] = useState<any>("")
  const [color, setColor] = useState<string>("")
  const [bg, setBg] = useState<string>("")
  const ref = useRef(girl)
  const { toastShow } = useLoginContext()
  const toast = useToast()
  const [isShowResult, setIsShowResult] = useState(false)

  const { height, setHeight, setWeight, weight, onCalculateBMI } = useCalculationContext()
  const [bmi, setBmi] = useState<string>("")
  const [bmiLabel, setBmiLabel] = useState<string>("")
  const [imageUrl, setImageUrl] = useState(girl)

  const calculateBMI = () => {
    var bmiValue
    // convert height from centimeters to meters
    if (height == 0 || weight == 0 || bmiValue == 0) {
      toastShow(toast, "कृपया सर्व फील्ड प्रविष्ट करा.", "top", "#fab4b4")
      console.log("====================================")
      console.log(height, weight)
      console.log("====================================")
      return
    } else {
      var heightMeters = height / 100

      // calculate BMI using formula: weight (kg) / height^2 (m^2)
      bmiValue = weight / (heightMeters * heightMeters)

      // define conclusion based on BMI value
      var bmiConclusion

      if (bmiValue < 16) {
        bmiConclusion = "तीव्र कमी वजन"
        setBmiConclusionImage(images[1])
        setColor(colors[1])
        setBg(bgColor[1])
      } else if (bmiValue >= 16 && bmiValue < 17) {
        bmiConclusion = "मध्यम कमी वजन "
        setBmiConclusionImage(images[1])
        setColor(colors[1])
        setBg(bgColor[1])
      } else if (bmiValue >= 17 && bmiValue < 18.5) {
        bmiConclusion = "कमी वजन"
        setBmiConclusionImage(images[1])
        setColor(colors[1])
        setBg(bgColor[1])
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        bmiConclusion = "सामान्य"
        setBmiConclusionImage(images[2])
        setColor(colors[2])
        setBg(bgColor[2])
      } else if (bmiValue >= 25 && bmiValue < 30) {
        bmiConclusion = "जास्त वजन"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      } else if (bmiValue >= 30 && bmiValue < 35) {
        bmiConclusion = "मध्यम जास्त वजन"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      } else if (bmiValue >= 35 && bmiValue < 40) {
        bmiConclusion = "तीव्र जास्त वजन"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      } else {
        bmiConclusion = "लठ्ठ वर्ग"
        setBmiConclusionImage(images[0])
        setColor(colors[0])
        setBg(bgColor[0])
      }

      // update state with BMI value and label

      setBmi(bmiValue.toFixed(2))
      setBmiLabel(bmiConclusion)
      console.log(bmiConclusion)
      setIsShowResult(true)
    }
  }
  const value: BMIInterface = {
    BMI,
    calculateBMI,
  }
  return <BMIContext.Provider value={value}>{children}</BMIContext.Provider>
}

export const useBMIContext = () => {
  const context = useContext(BMIContext)
  if (!context)
    throw Error("overall feedback context provider wrapp in overall feedback context provider")
  return context
}
