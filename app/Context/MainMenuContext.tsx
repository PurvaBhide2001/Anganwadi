import { Box, Text, useToast } from "native-base"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { ListAllApi } from "../api/ListAllApi"
import { StudentApi } from "../api/StudentApi"
import { UserApi } from "../api/UserApi"
import { navigate } from "../navigators"
import { useLoginContext } from "./LoginContext"

interface MainMenuContextInterface {
  menuSMList: any[]
  menuXLList: any[]
  menuMDList: any[]
  govermentPlanList: any[]
  ImportantLinksList: any[]
  UpdatesList: any[]
  onRefresh: Function
  refereshing: boolean
  getImportantLinks: Function
}
const MainMenuContext = createContext<null | MainMenuContextInterface>(null)

type MainMenuContextProps = { children: React.ReactNode }

export const MainMenuContextProvider = ({ children }: MainMenuContextProps) => {
  const [UpdatesList, setUpdatesList] = useState<any[]>([])
  const [menuSMList] = useState<any[]>([
    {
      id: 120,
      title: "बी एम आय",
      bgColor: "#caf3e1",
      icon: require("../../assets/surveyimages/MainMenu/body-mass-index1.png"),
      borderColor: "#51a79b",
      navigation: () => navigate("BMI"),
    },
    {
      id: 122,
      title: "मूल्यमापन करा",
      bgColor: "#ffedbd",
      icon: require("../../assets/surveyimages/MainMenu/checklist-1.png"),
      borderColor: "#ffc62e",
      navigation: () => navigate("ChooseStudent"),
    },
    {
      id: 123,
      title: "लसीकरण",
      bgColor: "#f1cef8",
      icon: require("../../assets/surveyimages/MainMenu/image1.png"),
      borderColor: "#ea91fe",
      navigation: () => navigate("Vaccination"),
    },
    {
      id: 124,
      title: "एचबी ॲनिमिया",
      bgColor: "#d3e1fe",
      icon: require("../../assets/surveyimages/MainMenu/image3.png"),
      borderColor: "#93acdd",
      navigation: () => navigate("HBAnemia"),
    },
  ])
  const [menuXLList] = useState<any[]>([
    {
      id: 231,
      title: "पूर्व प्राथमिक शिक्षण",
      icon: require("../../assets/surveyimages/MainMenu/book.png"),
      bgcolor: "#dde8fa",
      itemList: ["• निपुण भारत", "• आरंभ", "• आकार"],
      bottomBorderColor: "#94e7a0",
      count: "",
      event: () => navigate("PurvPrathmik"),
    },
    {
      id: 232,
      title: "कॅल्क्युलेटर / वेळापत्रक",
      icon: require("../../assets/surveyimages/MainMenu/वेळापत्रक.png"),
      bgcolor: "#fdf7e7",
      itemList: ["• बी एम आय", "• जन्मदर", "• एचबी ॲनिमिया"],
      bottomBorderColor: "#f8d1ae",
      count: "+3",
      event: () => navigate("CalculatorAndTimetable"),
    },
    {
      id: 233,
      title: "विशेष पोषण आहार",
      icon: require("../../assets/surveyimages/MainMenu/image11.png"),
      bgcolor: "#fdf3f2",
      itemList: ["• दत्तक पालक योजना", "• सॅम", "• मुठभर धान्य"],
      bottomBorderColor: "#fae490",
      // count: "+3",

      event: () => navigate("PurakPoshanAhar"),
    },
    {
      id: 234,
      title: "पायाभूत सुविधा",
      icon: require("../../assets/surveyimages/MainMenu/Infrastructure.png"),
      bgcolor: "#f5f3ff",
      itemList: ["• इमारत", "• शौचालय", "• पाणी व्यवस्था"],
      bottomBorderColor: "#a89aff",
      count: "+3",
      event: () => navigate("SuvidhaAddAndDisplayMain"),
    },
  ])
  const [ImportantLinksList] = useState<any[]>([
    {
      id: 451,
      title: "संवाद",
      bgColor: "#caf3e1",
      icon: require("../../assets/surveyimages/MainMenu/meeting.png"),
      borderColor: "#51a79b",
      navigation: () => navigate("Meeting"),
    },
    {
      id: 452,
      title: "सूचना फलक",
      bgColor: "#caf3e1",
      icon: require("../../assets/surveyimages/MainMenu/Suchna.png"),
      borderColor: "#51a79b",
      navigation: () => navigate("Suchana"),
    },
    {
      id: 453,
      title: "संसाधन केंद्र",
      bgColor: "#caf3e1",
      icon: require("../../assets/surveyimages/MainMenu/SadhanKendra.png"),
      borderColor: "#51a79b",
      navigation: () => navigate("ToolCenter"),
    },
    {
      id: 454,
      title: "पोषण अभियान",
      bgColor: "#caf3e1",
      icon: require("../../assets/surveyimages/MainMenu/nutrition.png"),
      borderColor: "#51a79b",
      navigation: () => navigate("NutritionCampaign"),
    },
  ])
  const [menuMDList] = useState<any[]>([
    {
      id: 564,
      title: "तातडीचा अहवाल",
      icon: require("../../assets/surveyimages/MainMenu/document1.png"),
      bgColor: "#fdf6de",
      borderColor: "#faebb3",
      navigation: () => navigate("Imediate"),
    },
    {
      id: 565,
      title: "मासिक अहवाल",
      icon: require("../../assets/surveyimages/MainMenu/monthly.png"),
      bgColor: "#fdf6de",
      borderColor: "#faebb3",
      navigation: () => navigate("MonthlyReport"),
    },
    {
      id: 566,
      title: "साप्ताहिक अहवाल",
      icon: require("../../assets/surveyimages/MainMenu/weekly.png"),
      bgColor: "#ecfdeb",
      borderColor: "#bafdb8",
      navigation: () => navigate("WeeklyReport"),
    },

    {
      id: 567,
      title: "वार्षिक अहवाल",
      icon: require("../../assets/surveyimages/MainMenu/yearly.png"),
      bgColor: "#e0f7f4",
      borderColor: "#b3e8fd",
      navigation: () => navigate("YearlyReport"),
    },
    {
      id: 568,
      title: "व्ही सी डी सी",
      icon: require("../../assets/surveyimages/MainMenu/VCDC.png"),
      bgColor: "#ecfdeb",
      borderColor: "#bafdb8",
      navigation: () => navigate("VDCC"),
    },
    {
      id: 569,
      title: "सानुकूलित अहवाल",
      icon: require("../../assets/surveyimages/MainMenu/SanukulitReport.png"),
      bgColor: "#fdf6de",
      borderColor: "#faebb3",
      navigation: () => navigate("CustomisedReport"),
    },

    {
      id: 570,
      title: "आरोग्य तपासणी",
      icon: require("../../assets/surveyimages/MainMenu/HealthCheckup.png"),
      bgColor: "#fdf6de",
      borderColor: "#faebb3",
      navigation: () => navigate("HealthCheckup"),
    },
    // {
    //   id: 12,
    //   title: "संसाधने ",
    //   icon: require("../../assets/surveyimages/MainMenu/HealthCheckup.png"),
    //   bgColor: "#ecfdeb",
    //   borderColor: "#bafdb8",
    //   navigation: () => navigate("Sansadhane"),
    // },
    {
      id: 571,
      title: "पर्यवेक्षण",
      icon: require("../../assets/surveyimages/MainMenu/inspection.png"),
      bgColor: "#e0f7f4",
      borderColor: "#b3e8fd",
      navigation: () => navigate("Paryavekshan"),
    },
  ])
  // const [UpdatesList] = useState([
  //   {
  //     id: 911,
  //     title: "महाराष्ट्र सरकार",
  //     link: `https://www.maharashtra.gov.in/1125/Home`,
  //     icon: require("../../assets/impLinksicon/Logo.png"),
  //     // bgColor: "#e0f7f4",
  //     // borderColor: "#b3e8fd",
  //     // navigation: () => navigate("https://www.maharashtra.gov.in/1125/Home"),
  //   },
  //   {
  //     id: 912,
  //     title: "एकात्मिक बाल विकास सेवा",
  //     link: "http://icds-wcd.nic.in/",
  //     icon: require("../../assets/surveyimages/MainMenu/Footer/logoicds.jpg"),
  //   },
  //   {
  //     id: 913,
  //     title: "महिला एवं बाल विकास मंत्रालय",
  //     link: "https://wcd.nic.in/",
  //     icon: require("../../assets/impLinksicon/mahilaVlogo.png"),
  //   },
  //   {
  //     id: 914,
  //     title: "केंद्रीय दत्तक संसाधन प्राधिकरण",
  //     link: "https://cara.nic.in/",
  //     icon: require("../../assets/impLinksicon/cara1.png"),
  //   },
  //   {
  //     id: 915,
  //     title: "केंद्रीय समाज कल्याण बोर्ड",
  //     link: "https://www.cswb.gov.in/",
  //     icon: require("../../assets/impLinksicon/cswb.png"),
  //   },
  //   {
  //     id: 916,
  //     title: "राष्ट्रीय महिला कोष",
  //     link: "https://rmk.nic.in",
  //     icon: require("../../assets/impLinksicon/mahila.png"),
  //   },
  //   {
  //     id: 917,
  //     title: "राष्ट्रीय बाल अधिकार संरक्षण आयोग",
  //     link: "http://ncpcr.gov.in/",
  //     icon: require("../../assets/impLinksicon/ncpcr.png"),
  //   },
  // ])
  const getImportantLinks = useCallback(async () => {
    const { result: { data: { data = [], status = 204 } = {} } = {} } =
      await ListAllApi.getImportantLinkList()
    console.log("Important Updates result", data)
    status == 200 && setUpdatesList(data)
  }, [])

  useEffect(() => {
    ;(async () => {
      await getImportantLinks()
    })()
  }, [])

  const [govermentPlanList] = useState([
    {
      id: 1,
      title: "माझी कन्या भाग्यश्री",
      icon: require("../../assets/surveyimages/MainMenu/1.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/bn.png"),
      bgcolor: "#e1efe3",
      bottomBorderColor: "#94e7a0",
      govIcon: "",
      event: () => navigate("ShowProfile"),
    },
    {
      id: 2,
      title: "बेटी बचाओ बेटी पढाओ",
      icon: require("../../assets/surveyimages/MainMenu/2.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/ban2.png"),
      bgcolor: "#fdf3ea",
      bottomBorderColor: "#f8d1ae",
      govIcon: "",
      event: () => navigate("OverallFeedBack"),
    },
    {
      id: 3,
      title: "बेबी केअर किट",
      icon: require("../../assets/surveyimages/MainMenu/3.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/bkkit.png"),
      bgcolor: "#f9f4e0",
      bottomBorderColor: "#fae490",
      event: () => navigate("EditProfile"),
    },
    {
      id: 4,
      title: "तरंग सुपोषित महाराष्ट्र",
      icon: require("../../assets/surveyimages/MainMenu/4.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/tsm.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      govIcon: "",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 5,
      title: "स्थलांतरित बालके",
      icon: require("../../assets/surveyimages/MainMenu/6.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/sb.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      govIcon: "",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 6,
      title: "मिशन वात्सल्य",
      icon: require("../../assets/surveyimages/MainMenu/7.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/mv.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      govIcon: "",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 7,
      title: "चाइल्डलाइन",
      icon: require("../../assets/surveyimages/MainMenu/Childline.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/img4.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      govIcon: "",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 8,
      title: "ग्राम बाळ संरक्षण समिती",
      icon: require("../../assets/surveyimages/MainMenu/8.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/gbsm.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      govIcon: "",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 9,
      title: "बालविवाह निर्मूलन",
      icon: require("../../assets/surveyimages/MainMenu/9.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/bn.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      govIcon: "",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 10,
      title: "बाल आधार नोंदणी",
      icon: require("../../assets/surveyimages/MainMenu/10.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/img3.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      govIcon: "",
      event: () => navigate("ChooseStudent"),
    },
    {
      id: 11,
      title: "डॉ. अब्दुल कलाम अमृत आहार योजना",
      icon: require("../../assets/surveyimages/MainMenu/DrAPJKalam.png"),
      backGroundImage: require("../../assets/surveyimages/yojna/mv.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      event: () => navigate("ChooseStudent"),
    },
  ])
  const [refereshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(async () => {
    // await getSchemeList()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const value: MainMenuContextInterface = {
    menuSMList,
    menuMDList,
    menuXLList,
    govermentPlanList,
    ImportantLinksList,
    UpdatesList,
    onRefresh,
    refereshing,
    getImportantLinks,
  }
  return <MainMenuContext.Provider value={value}>{children}</MainMenuContext.Provider>
}

export const useMainMenuContext = () => {
  const context = useContext(MainMenuContext)
  if (!context) throw new Error("use Main Menu context use in login context provider")
  return context
}
