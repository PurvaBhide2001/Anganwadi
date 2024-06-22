import { createContext, useContext, useState } from "react"
import { StudentApi } from "../api/StudentApi"
import { calculateAge } from "../filter/calculateFormule"
import { navigate } from "../navigators"
import QuestionsAndSurveyDetailItem from "../screens/OverallFeedBack/QuestionsAndSurveyDetailItem"
import { removeDuplicate } from "../filter/requireFunction"
import { useTabBarContextContext } from "./TabBarContext"

interface PurvPrathmikContextInterface {
  CalculatorAndTimetableData: any[]
  purvPrathmikData: any[]
  onChangeToGetListResult: Function
  studentID: string | number
  profileData: any
  questionAndSurveyDataArray: any
  requiredSurveyDataKey: any
  profilesTitle: any
  requiresurveyProfileDataKey: any
  purvPrathmikDataAnother: any[]
  typesOfPurvPrathmik: any
  profile: any
  survey: any
  nipunBharatList: any
  studentList: any
  setTabBarIndex: Function
  tabBarIndex: number
  onClickToViewTab: Function
  akarMonth: any
  akarWeekleDetails: any
  gender: any[]
}
const PurvPrathmikContextContext = createContext<null | PurvPrathmikContextInterface>(null)
type PurvPrathmikContextProps = { children: React.ReactNode }

export const PurvPrathmikContextContextProvider = ({ children }: PurvPrathmikContextProps) => {
  const [studentID, setStudentID] = useState<string | number>(-1)
  const [profileData, setProfileData] = useState<any>({})
  const [profile, setProfile] = useState<any>({})
  const [survey, setSurvey] = useState<any>({})
  const [questionAndSurveyDataArray, setQuestionAndSurveyDataArray] = useState<any[]>([])
  const [tabBarIndex, setTabBarIndex] = useState<number>(0)
  const { setSceneData, setRoutes } = useTabBarContextContext()

  const [requiresurveyProfileDataKey] = useState<any>({
    created_at: "मूल्यमापन दिनांक",
    bmi: "बी एम आय",
    height: "उंची",
    weight: "वजन",
    age_category: "वयोगट",
  })
  const [requiredSurveyDataKey] = useState<any>({
    created_at: "created_at",
    bmi: "bmi",
    height: "height",
    weight: "weight",
    age_category: "age_category",
    evaluation_title: "evaluation_title",
  })
  console.log("njh", requiredSurveyDataKey.created_at)

  const [gender, setgender] = useState<any[]>([
    {
      value: "मुलगा ",
      id: 1,
    },
    {
      value: "मुलगी",
      id: 2,
    },
  ])
  const [typesOfPurvPrathmik] = useState<any>({
    pbsmsp: {
      title: "बाल्यावस्था संगोपन मूल्यमापन व शिक्षण पत्रक",
      icon: require("../../assets/surveyimages/icon/right-arrow.png"),
    },
    student: {
      title: "लाभार्थी",
      icon: require("../../assets/surveyimages/icon/right-arrow.png"),
    },
    nipunBharat: {
      title: "निपुण भारत",
      icon: require("../../assets/surveyimages/icon/right-arrow.png"),
    },
    arambh: {
      title: "निपुण भारत",
      icon: require("../../assets/surveyimages/icon/right-arrow.png"),
    },
    akar: {
      title: "निपुण भारत",
      icon: require("../../assets/surveyimages/icon/right-arrow.png"),
    },
  })

  const [nipunBharatList] = useState<any[]>([
    {
      id: 3,
      title: "चाचणी करा",
      icon: require("../../assets/nipunBharatIcons/chachani-kara.png"),
      bgcolor: "#fdf7e7",
      itemList: [],
      bottomBorderColor: "#f8d1ae",
      event: () => navigate("ChooseNipunBharatStudent"),
    },
    {
      id: 4,
      title: "चाचणी बघा",
      icon: require("../../assets/nipunBharatIcons/chachani-bagha.png"),
      bgcolor: "#dde8fa",
      itemList: [],
      bottomBorderColor: "#88b2f7",
      event: () => navigate("ChooseNipunBharatStudentForShowResult"),
    },
  ])
  const [studentList] = useState<any[]>([
    {
      id: 5,
      title: "लाभार्थी समाविष्ट करा",
      icon: require("../../assets/nipunBharatIcons/chachani-kara.png"),

      bgcolor: "#fdf7e7",
      itemList: [],
      bottomBorderColor: "#f8d1ae",
      event: () => navigate("AddStudent"),
    },
    {
      id: 6,
      title: "लाभार्थी बघा",

      icon: require("../../assets/nipunBharatIcons/chachani-bagha.png"),
      bgcolor: "#dde8fa",
      itemList: [],
      bottomBorderColor: "#88b2f7",
      event: () => navigate("ShowStudent"),
    },
  ])
  const [purvPrathmikData] = useState<any[]>([
    {
      id: 8,
      title: "मूल्यमापन करा",
      icon: require("../../assets/nipunBharatIcons/mulyamapan-kara.png"),
      bgcolor: "#fdf7e7",
      itemList: [],
      bottomBorderColor: "#f8d1ae",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 7,
      title: "मूल्यमापन बघा",
      icon: require("../../assets/nipunBharatIcons/mulyamapan-bagha.png"),
      bgcolor: "#dde8fa",
      itemList: [],
      bottomBorderColor: "#88b2f7",
      event: () => navigate("SelectStudentShowAllFeedBack"),
    },
  ])
  const [purvPrathmikDataAnother] = useState<any[]>([
    {
      id: 9,
      title: "आकार",
      icon: require("../../assets/nipunBharatIcons/aakar.png"),
      bgcolor: "#f7ffe0",
      itemList: [],
      bottomBorderColor: "#d5f57a",
      event: () => navigate("Aakar"),
    },
    {
      id: 10,
      title: "आरंभ",
      icon: require("../../assets/nipunBharatIcons/aarambh.png"),
      bgcolor: "#dde8fa",
      itemList: [],
      bottomBorderColor: "#88b2f7",
      event: () => navigate("Aarambha"),
    },
  ])

  const [akarMonth] = useState<any[]>([
    {
      id: 11,
      title: "जानेवारी",
      bgColor: "#e1c9e0",
    },
    {
      id: 12,
      title: "फेब्रुवारी",
      bgColor: "#9af09c",
    },
    {
      id: 13,
      title: "मार्च",
      bgColor: "#ffbad3",
    },
    {
      id: 14,
      title: "एप्रिल",
      bgColor: "#e9c7d4",
    },
  ])

  const [akarWeekleDetails] = useState<any[]>([
    {
      id: 25,
      title: "सोमवार",
      khel: "१)खेळघर कोपरा (बाहुलीघर/गोठा/भाजीचे दुकान/शिंप्याचे दुकान ), २)हस्तकाम कोपरा (परिसरातील साहित्य वापरून रचना/रंगकाम/फाडकाम), ३)बोधात्मक कोपरा (पझल/मनोरे/जोडतोड खेळणी), ४)वाचन कोपरा (गोष्टींची पुस्तके/फ्लॅशकार्डस/चित्रांची पुस्तके *दर महिन्याला वेगळी पुस्तके ठेवावीत)",
      paripath: "प्रार्थना, हवामान तक्ता, चेतना व्यायाम",
      VLG: "एकास एक संगती ",
      ss: "उपयोग सांगा -झाडे,नदी,टीव्ही मोबाइल इ.",
      pt: "लहान गट: सरळ रेषेत चालणे. मोठा गट - डोक्यावर पुस्तक घेऊन चालणे.",
      sv: "परिसरातील झाडांची गळलेली पान,फुलं,काड्या  वापरुन रचना करणे",
      gg: "गोष्ट",
    },
    {
      id: 26,
      title: "मंगळवार",
      khel: "१)खेळघर कोपरा (बाहुलीघर/गोठा/भाजीचे दुकान/शिंप्याचे दुकान ), २)हस्तकाम कोपरा (परिसरातील साहित्य वापरून रचना/रंगकाम/फाडकाम), ३)बोधात्मक कोपरा (पझल/मनोरे/जोडतोड खेळणी), ४)वाचन कोपरा (गोष्टींची पुस्तके/फ्लॅशकार्डस/चित्रांची पुस्तके *दर महिन्याला वेगळी पुस्तके ठेवावीत)",
      paripath: "प्रार्थना, हवामान तक्ता, चेतना व्यायाम",
      VLG: "मापन – हाताने खिडकी, पिशवी, टेबल मोजणे",
      ss: "तरंगणे बुडणे",
      pt: "खेळ- ऊंच झाडे, बुटकी झाडे ( ऊंच झाडे म्हटले की मुलांनी उभे राहायचे आणि बुटकी झाडे म्हटले की कमरेत वाकायचे ,तळ्यात मळ्यात खेळतो तसे खेळणे )",
      sv: "पानांचे ठसेकाम",
      gg: "गाणी",
    },
    {
      id: 27,
      title: "बुधवार",
      khel: "१)खेळघर कोपरा (बाहुलीघर/गोठा/भाजीचे दुकान/शिंप्याचे दुकान ), २)हस्तकाम कोपरा (परिसरातील साहित्य वापरून रचना/रंगकाम/फाडकाम), ३)बोधात्मक कोपरा (पझल/मनोरे/जोडतोड खेळणी), ४)वाचन कोपरा (गोष्टींची पुस्तके/फ्लॅशकार्डस/चित्रांची पुस्तके *दर महिन्याला वेगळी पुस्तके ठेवावीत)",
      paripath: "प्रार्थना, हवामान तक्ता, चेतना व्यायाम",
      VLG: "एकास एक संगतीवरून पेक्षा कमी पेक्षा जास्त हे शब्द वापरणे",
      ss: "गंध संवेदना - फुलांचा वास (वेगवेगळी फुले आणून मुलांना त्याचे वास द्यावेत, नाव सांगावे ,डोळे मिटून पुन्हा एकेक फुलाचा वास द्यावा आणि ओळखायला लावावे.)",
      pt: "कागदाचे चेंडू करणे आणि त्यासोबत खेळणे. (अंकुर- चेंडू करा, फेका, झेला)",
      sv: "फुलांची रांगोळी",
      gg: "गोष्ट",
    },
    {
      id: 28,
      title: "गुरुवार",
      khel: "१)खेळघर कोपरा (बाहुलीघर/गोठा/भाजीचे दुकान/शिंप्याचे दुकान ), २)हस्तकाम कोपरा (परिसरातील साहित्य वापरून रचना/रंगकाम/फाडकाम), ३)बोधात्मक कोपरा (पझल/मनोरे/जोडतोड खेळणी), ४)वाचन कोपरा (गोष्टींची पुस्तके/फ्लॅशकार्डस/चित्रांची पुस्तके *दर महिन्याला वेगळी पुस्तके ठेवावीत)",
      paripath: "प्रार्थना, हवामान तक्ता, चेतना व्यायाम",
      VLG: "वर्गीकरण (रंगावरून)",
      ss: "बी पासून झाड कसे उगवते. - माहिती देणे",
      pt: "लहान गट - नुसत्या उड्या मारणे मोठा गट - अंकांवर  उड्या मारणे",
      sv: "विविध उपलब्ध वस्तूंचे आवाजातून ताल निर्मिती (पट्टी, चमचे, ताटल्या, फरशीचे लहान तुकडे इ. वापरुन)",
      gg: "गाणी",
    },
    {
      id: 29,
      title: "शुक्रवार",
      khel: "१)खेळघर कोपरा (बाहुलीघर/गोठा/भाजीचे दुकान/शिंप्याचे दुकान ), २)हस्तकाम कोपरा (परिसरातील साहित्य वापरून रचना/रंगकाम/फाडकाम), ३)बोधात्मक कोपरा (पझल/मनोरे/जोडतोड खेळणी), ४)वाचन कोपरा (गोष्टींची पुस्तके/फ्लॅशकार्डस/चित्रांची पुस्तके *दर महिन्याला वेगळी पुस्तके ठेवावीत)",
      paripath: "प्रार्थना, हवामान तक्ता, चेतना व्यायाम",
      VLG: "अंकचिन्ह ओळख – 6 ते 10",
      ss: "तळणे, परतणे, भाजणे, भिजवणे,चालणे, किसणे, पाखडणे या क्रियांबद्दल माहिती देणे.",
      pt: "खेळ- शिवणापाणी /लंगडी",
      sv: "हार किंवा गजरा तयार करणे (कागदाच्या पट्टयावर फुले चिकटवून)",
      gg: "गोष्ट",
    },
    {
      id: 30,
      title: "शनिवार",
      khel: "१)खेळघर कोपरा (बाहुलीघर/गोठा/भाजीचे दुकान/शिंप्याचे दुकान ), २)हस्तकाम कोपरा (परिसरातील साहित्य वापरून रचना/रंगकाम/फाडकाम), ३)बोधात्मक कोपरा (पझल/मनोरे/जोडतोड खेळणी), ४)वाचन कोपरा (गोष्टींची पुस्तके/फ्लॅशकार्डस/चित्रांची पुस्तके *दर महिन्याला वेगळी पुस्तके ठेवावीत)",
      paripath: "प्रार्थना, हवामान तक्ता, चेतना व्यायाम",
      VLG: "गप्पा-घरची बाग",
      ss: "खेळ- सांगा सांगा नावे सांगा .. तुम्ही पाहिलेल्या झाडांची नावे सांगा",
      pt: "वादळ सुटल वारा  आला. एकेका बोटीत.. (पाच पर्यन्त घ्यावे)  हा खेळ घ्यावा.",
      sv: "अंगणवाडी स्वच्छता",
      gg: "गाणी",
    },
  ])
  const [CalculatorAndTimetableData] = useState<any[]>([
    {
      id: 31,
      title: "बी एम आय",
      icon: require("../../assets/surveyimages/MainMenu/body-mass-index1.png"),
      bgcolor: "#dde8fa",
      itemList: [],
      bottomBorderColor: "#90b7f5",
      event: () => navigate("BMI"),
    },
    {
      id: 32,
      title: "जन्मदर",
      icon: require("../../assets/surveyimages/MenuXL/birthRate.png"),
      bgcolor: "#f0e6fc",
      itemList: [],
      bottomBorderColor: "#d5b3fc",
      event: () => navigate("BirthRateCalculator"),
    },
    {
      id: 33,

      title: "लसीकरण वेळापत्रक",
      icon: require("../../assets/surveyimages/MenuXL/Vaccine_Schedual.png"),
      bgcolor: "#fcebfc",
      itemList: [],
      bottomBorderColor: "#f0b9f0",
      event: () => navigate("Vaccination"),
    },
    {
      id: 34,
      title: "इ डी डी",
      icon: require("../../assets/surveyimages/MenuXL/EDD.png"),
      bgcolor: "#fdf7e7",
      itemList: [],
      bottomBorderColor: "#f8d1ae",
      event: () => navigate("EDD"),
    },
    {
      id: 35,

      title: "एचबी अनेमिया",
      icon: require("../../assets/surveyimages/MenuXL/HB_Anaemia.png"),
      bgcolor: "#e8fcef",
      itemList: [],
      bottomBorderColor: "#9ee8b8",

      event: () => navigate("HBAnemia"),
    },
    {
      id: 36,
      title: "सॅम । मॅम | नॉर्मल",
      icon: require("../../assets/surveyimages/MenuXL/SAM_MAM.png"),
      bgcolor: "#f0e6fc",
      itemList: [],
      bottomBorderColor: "#d5b3fc",
      event: () => navigate("SamMam"),
    },
    {
      id: 37,
      title: "एस यू डब्लू । एम यू डब्लू | नॉर्मल",
      icon: require("../../assets/surveyimages/MainMenu/do_survey.png"),
      bgcolor: "#f6fce6",
      itemList: [],
      bottomBorderColor: "#ddf797",
      event: () => navigate("SuwMuw"),
    },
  ])
  const profilesTitle = {
    fullName: "विद्यार्थ्याचे नाव",
    mother_name: "आईचे नाव",
    father_name: "वडिलांचे नाव",
    dob: "वय",
    gender: "लिंग",
  }

  const createScene = (surveyData: any) => {
    const routesArray = removeDuplicate(surveyData, "eval_type").map((item: any, i: number) => ({
      key: String(i),
      title: item?.evaluation_title,
    }))

    const sceneObject = {}
    removeDuplicate(surveyData, "eval_type").forEach((item: any, i: number) => {
      sceneObject[i] = () => (
        <QuestionsAndSurveyDetailItem
          item={item}
          requiresurveyProfileDataKey={requiresurveyProfileDataKey}
          key={i}
        />
      )
    })
    console.log("sceneObject", sceneObject, routesArray)
    setRoutes(routesArray)
    setSceneData(sceneObject)
  }
  const getParticularStudentEvalutionData = async (studentID: string | number) => {
    const {
      result: {
        data: {
          data: { profile, surveys },
        },
      },
    } = await StudentApi.getOverAllSurvey(studentID)
    setProfile(profile)
    setSurvey(surveys)
    console.log("profiledata==========", profile)
    console.log("surveysurveysurvey==========", surveys)
    setProfileData({
      fullName: `${profile?.f_name} ${profile?.m_name} ${profile?.l_name}`,
      mother_name: profile.mother_name,
      father_name: profile?.father_name,
      dob: calculateAge(profile?.dob),
      gender: profile?.gender,
    })
    console.log("aaaaaaa==========", profile)
    createScene(surveys)
    setQuestionAndSurveyDataArray(surveys)
  }

  const onChangeToGetListResult = async (studentID: string | number) => {
    setStudentID(studentID)
    await getParticularStudentEvalutionData(studentID)
  }

  const onClickToViewTab = (index: number) => {
    setTabBarIndex(index)
  }
  const value: PurvPrathmikContextInterface = {
    CalculatorAndTimetableData,
    purvPrathmikData,
    onChangeToGetListResult,
    studentID,
    profileData,
    questionAndSurveyDataArray,
    requiredSurveyDataKey,
    profilesTitle,
    requiresurveyProfileDataKey,
    // nipunBharatData,
    purvPrathmikDataAnother,
    typesOfPurvPrathmik,
    profile,
    survey,
    nipunBharatList,

    setTabBarIndex,
    tabBarIndex,
    onClickToViewTab,
    akarMonth,
    akarWeekleDetails,
    studentList,
    gender,
  }

  return (
    <PurvPrathmikContextContext.Provider value={value}>
      {children}
    </PurvPrathmikContextContext.Provider>
  )
}

export const usePurvPrathmikContextContext = () => {
  const context = useContext(PurvPrathmikContextContext)
  if (!context)
    throw Error(
      "overall PurvPrathmik context provider wrapp in overall PurvPrathmik context provider",
    )
  return context
}
