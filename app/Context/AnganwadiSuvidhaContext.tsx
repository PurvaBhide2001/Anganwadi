import { useToast } from "native-base"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { Platform } from "react-native"
import { AngamwadiProfileApi, AnganwadiApi } from "../api/AnganwadiApi"
import { monthDateFormat } from "../filter/dateAndTimeFormat"
import { navigate } from "../navigators"
import { useCommanContextContext } from "./CommanContext"
import { useLoginContext } from "./LoginContext"

interface AnganwadiSuvidhaContextInterface {
  isOpenModal: boolean
  openModal: Function
  closeModal: Function
  cancelButton: Function
  submitData: Function
  setIDofSuvidha: Function
  btnOne: boolean
  setBtnOne: Function
  btnTwo: boolean
  setBtnTwo: Function
  btnThree: boolean
  setBtnThree: Function
  onChangeImage: Function
  imageName: string
  onChangeImageFile: Function
  isExist: boolean
  subTypesList: any[]
  isFour: boolean
  onPressToViewTypeList: Function
  Anganwadi: any[]
  MonthlyReport: any[]
  onPressViewParticularSuvidha: Function
  particularSuvidha: any
  setBtnFour: Function
  btnFour: boolean
  isAlreadyFill: boolean
  onClickAnganwadiSuvidhaQuestionOpen: Function
  onClickAnganwadiSuvidhaQuestionClose: Function
  onSubmitQuestionSmartStatus: Function
  isOpenQuestionModal: boolean
  setSmartAnganwadiAns: Function
  smartAnganwadiAns: string
  ShowAllSuvidha: any[]
  isSuvidhList: boolean
  setIsSuvidhaList: Function
  suvidhaMain: any[]
  isLoadingImage: boolean
  exectuteLoaderImage: Function
  executeSetImage: Function
  setIsImageLoading: Function
  mainTypeOfID: string | number
}
const AnganwadiSuvidhaContext = createContext<null | AnganwadiSuvidhaContextInterface>(null)

type AnganwadiSuvidhaContextProps = { children: React.ReactNode }

export const AnganwadiSuvidhaContextProvider = ({ children }: AnganwadiSuvidhaContextProps) => {
  const [selectedSuvidhaID, setSelectedSuvidhaID] = useState<number>(0)
  const [isSuvidhList, setIsSuvidhaList] = useState<boolean>(false)
  const [mainTypeOfID, setMainTypeOfID] = useState<number | string>("")

  const suvidhaMain = [
    {
      id: 1,
      title: " माहिती भरा",
      bgColor: "#fadefa",
      navigation: () => navigate("AnganwadiSuvidhaTypes"),
      image: require("../../assets/surveyimages/MainMenu/Mahiti_bhara.png"),
      bordercolor: "#f0a8f0",
    },
    {
      id: 2,
      title: " माहिती बघा",
      bgColor: "#fadce7",
      navigation: () => navigate("ShowAllSuvidhaAndAdd"),
      image: require("../../assets/surveyimages/MainMenu/Mahiti_bagha.png"),
      bordercolor: "#f7b7ce",
    },
  ]
  const Anganwadi = [
    {
      id: 111,
      icon: require("../../assets/surveyimages/anganwadiProfile/smartAnganwadi.png"),
      title: "अंगणवाडी स्मार्ट स्टेटस",
      navigation: () => {
        navigate("AnganwadiSmartStatus")
      },
    },

    {
      id: 1,
      icon: require("../../assets/surveyimages/anganwadiProfile/1.png"),
      title: "अंगणवाडी माहिती",
      navigation: () => navigate("AboutAnganwadi"),
    },

    {
      id: 2,
      icon: require("../../assets/surveyimages/anganwadiProfile/2.png"),
      title: "स्थान",
      navigation: () => navigate("Location"),
    },

    {
      id: 3,
      icon: require("../../assets/surveyimages/anganwadiProfile/3.png"),
      title: "अंगणवाडी प्रकार",
      navigation: () => navigate("AWCType"),
    },

    {
      id: 4,
      icon: require("../../assets/surveyimages/anganwadiProfile/4.png"),
      title: "कार्यरत अंगणवाडी सेविका आणि मदतनीस",
      navigation: () => navigate("AWWWorkingHelpers"),
    },
  ]

  const MonthlyReport = [
    {
      id: 111,
      icon: require("../../assets/surveyimages/report/final-gradadion.png"),
      title: "पोषणस्थिती 0 ते ६ वर्ष श्रेणी अहवाल",
      navigation: () => {
        navigate("FinalGradation")
      },
    },

    {
      id: 1,
      icon: require("../../assets/surveyimages/report/pse.png"),
      title: "अंगणवाडी केंद्रात पुर्व शालेय शि.घेत असलेल्या लाभार्थ्यांची वयोगटनिहाय संख्या",
      navigation: () => navigate("PSE"),
    },

    {
      id: 2,
      icon: require("../../assets/surveyimages/report/sam-mam.png"),
      title: "सॅम मॅम रिपोर्ट",
      navigation: () => navigate("SamMamReport"),
    },

    {
      id: 3,
      icon: require("../../assets/surveyimages/report/suw-muw.png"),
      title: "SUW MUW सुधारणा",
      navigation: () => navigate("SuwMuwSudharna"),
    },

    {
      id: 4,
      icon: require("../../assets/surveyimages/report/vcdc.png"),
      title: "VCDC रिपोर्ट",
      navigation: () => navigate("VCDCReport"),
    },
    {
      id: 5,
      icon: require("../../assets/surveyimages/report/LBW-REPORT.png"),
      title: "LBW रिपोर्ट",
      navigation: () => navigate("LBWReport"),
    },
    {
      id: 6,
      icon: require("../../assets/surveyimages/report/bala-report.png"),
      title: "BALA रिपोर्ट",
      navigation: () => navigate("BALAawc"),
    },
    {
      id: 7,
      icon: require("../../assets/surveyimages/report/शौचालय-माहिती.png"),
      title: "शौचालय बांधकाम व दुरुस्ती",
      navigation: () => navigate("WashroomInfo"),
    },
    {
      id: 8,
      icon: require("../../assets/surveyimages/report/0to6-HB-pregnant.png"),
      title: "गरोदर व बालके HB /BMI",
      navigation: () => navigate("WomenHBBMI"),
    },
    {
      id: 9,
      icon: require("../../assets/surveyimages/report/KISHORI-HB-BMI.png"),
      title: "किशोरी HB /BMI",
      navigation: () => navigate("KishoriHBBMI"),
    },
    {
      id: 10,
      icon: require("../../assets/surveyimages/report/Birth-Rate.png"),
      title: "जन्मदर",
      navigation: () => navigate("BirthRate"),
    },
    {
      id: 11,
      icon: require("../../assets/surveyimages/report/FINAL-HEALTH-CHECKUP.png"),
      title: "आरोग्य तपासणी",
      navigation: () => navigate("FinalHealthCheckup"),
    },
    {
      id: 12,
      icon: require("../../assets/surveyimages/report/FINAL-AADHAR.png"),
      title: "बाल आधार नोंदणी",
      navigation: () => navigate("BalAdharNondani"),
    },
  ]

  const ShowAllSuvidha = [
    {
      id: 1,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "31 Jan",
      bgColor: "#e1c9e0",
      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 2,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "28 Feb",
      bgColor: "#9af09c",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 3,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "31 Mar",
      bgColor: "#ffbad3",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 4,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "30 Apr",
      bgColor: "#e9c7d4",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 5,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "31 May",
      bgColor: "#c1b7fe",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 6,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "30 June",
      bgColor: "#94d8fe",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 7,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "31 July",
      bgColor: "#f5b0b0",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 8,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "31 Aug",
      bgColor: "#fcd274",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 9,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "30 Sept",
      bgColor: "#93fcd8",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 10,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "31 Oct",
      bgColor: "#f7da94",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 11,
      avatarName: monthDateFormat("MMMM", new Date()),
      title: "30 Nov",
      bgColor: "#f1b393",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
    {
      id: 12,
      avatarName: monthDateFormat("MMM", new Date()),
      title: "31 Dec",
      bgColor: "#ee93db",

      navigation: () => navigate("MahitiBaghaDetailList"),
    },
  ]

  const [IDofSuvidha, setIDofSuvidha] = useState<number>(-1)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenQuestionModal, setIsOpenQuestionModal] = useState<boolean>(false)
  const [btnOne, setBtnOne] = useState<boolean>(false)
  const [btnTwo, setBtnTwo] = useState<boolean>(false)
  const [btnThree, setBtnThree] = useState<boolean>(false)
  const [btnFour, setBtnFour] = useState<boolean>(false)
  const [imageURL, seImageURL] = useState<any>(null)

  const { selectFile, onSelectDocument, launchToTheCamera, imageObj, openAlertModal } =
    useCommanContextContext()
  const {
    useData,
    toastShow,
    setIsExistSmartAnganwadi,
    isExistSmartAnganwadi,
    addedPlayingToysArray,
    anganwadSmartSatus,
    getListServiceIssuesByMonth,
  } = useLoginContext()
  const toast = useToast()
  const [smartAnganwadiAns, setSmartAnganwadiAns] = useState<any>("0")
  // const [smartAnganwadiAns, setSmartAnganwadiAns] = useState<string>("")
  const [isAlreadyFill, setIsAlreadyFill] = useState(false)
  const [subTypesList, setSubTypesList] = useState<any[]>([])
  const [imageName, setImageName] = useState<string>("")
  const [particularSuvidha, setParticularSuvidha] = useState<any>(null)
  const [isExist, setExist] = useState<boolean>(false)
  const [isFour, setIsFour] = useState<boolean>(false)
  const [isLoadingImage, setIsImageLoading] = useState<boolean>(false)
  const [iSchangeBtnName, setIsChangeBtnName] = useState<boolean>(false)
  const [isCreate, setIsCreate] = useState<boolean>(false)
  const modalData = ["वापरास योग्य", "तात्काळ दुरुस्तीची गरज", "वापरास अयोग्य", "उपलब्ध नाही"]

  const resetData = () => {
    setBtnOne(false)
    setBtnTwo(false)
    setBtnThree(false)
    setBtnFour(false)
    setExist(false)
    seImageURL(null)
    setImageName("")
  }
  const onClickAnganwadiSuvidhaQuestionOpen = () => {
    setIsOpenQuestionModal(true)
  }
  const onClickAnganwadiSuvidhaQuestionClose = () => {
    setIsOpenQuestionModal(false)
  }

  const createQuestionSmartStatus = async () => {
    if (!isExistSmartAnganwadi) {
      const { result: { data: { data = {}, status = 204 } = {} } = {} } =
        await AnganwadiApi.createAnganwadiSmartStatus({
          anganwadi_id: useData?.anganwadi_id,
          status: anganwadSmartSatus,
        })
      status == 200 && setIsExistSmartAnganwadi(true)
    } else {
      const jsonData = {
        status: anganwadSmartSatus,
      }
      const {
        result: { data },
      } = await AngamwadiProfileApi.updateSmartAnganwadi(useData?.anganwadi_id, jsonData)
    }
  }

  const exectuteLoaderImage = useCallback(() => {
    setIsImageLoading(false)
  }, [])

  const executeSetImage = (imgUrl: string) => {
    setImageName(imgUrl)
  }
  const onSubmitQuestionSmartStatus = async () => {
    if (smartAnganwadiAns !== "") {
      onClickAnganwadiSuvidhaQuestionClose()
      await createQuestionSmartStatus()
    } else {
      toastShow(toast, "कृपया प्रश्नाचे उत्तर द्या?", "top", "#fab4b4")
    }
  }
  const getAnganwadiSuvidha = async (id: number | string) => {
    let res: any, statusExisting: number | string

    if (mainTypeOfID == 3) {
      const { result: { data: { data = {}, status = 204 } = {} } = {} } =
        await AnganwadiApi.getAnganwadiPlayingToyExist(useData?.anganwadi_id, id)
      console.log("====================================")
      console.log("kelani", data, status, mainTypeOfID)
      console.log("====================================")
      statusExisting = status
    } else {
      const { result: { data: { data = {}, status = 204 } = {} } = {} } =
        await AnganwadiApi.getAnganwadiSuvidha(useData?.anganwadi_id, id)
      res = data
      statusExisting = status
    }

    if (statusExisting == 200) {
      setIsAlreadyFill(true)
    } else {
      setIsAlreadyFill(false)
    }
  }

  const openModal = async (id: number) => {
    setExist(false)
    setIDofSuvidha(id)
    const { result: { data: { data = {} } = {}, status = 204 } = {} } =
      await AnganwadiApi.getService(useData?.anganwadi_id, id)
    if (data !== "No Records Found") {
      const { issue, file } = data
      setExist(true)
      setImageName(file)
      if (issue == modalData[0]) {
        setBtnOne(true)
      }
      if (issue == modalData[1]) {
        setBtnTwo(true)
      }
      if (issue == modalData[2]) {
        setBtnThree(true)
      }
      if (issue == modalData[3]) {
        setBtnFour(true)
      }
    }
    setIsOpenModal(true)
  }
  const closeModal = () => {
    setTimeout(() => {
      setIsOpenModal(false)
      resetData()
    }, 600)
  }

  const cancelButton = () => {
    setIsOpenModal(false)
    resetData()
  }
  const getResponseToTheUploadedFile = async (res: any) => {
    const {
      assets: [imageobject],
    } = await res
    if (!imageobject) {
      return
    }
    const uploadImageJson = {
      uri: Platform.OS === "android" ? imageobject.uri : "",
      type: imageobject.type,
      name: imageobject.fileName,
    }
    setTimeout(() => {
      setIsImageLoading(false)
    }, 900)
    const {
      result: { data: response },
    } = await AnganwadiApi.upload(uploadImageJson)
    toastShow(toast, "तुम्ही घेतलेली इमेज किंवा फोटो अपलोड केला गेला आहे", "top", "#bdfcbd")
    setImageName(response.url.replace("file://", ""))
    seImageURL(response)
  }
  const onChangeImageFile = async () => {
    setIsImageLoading(true)
    await launchToTheCamera(getResponseToTheUploadedFile)
  }
  const onChangeImage = async () => {
    setIsImageLoading(true)
    await selectFile(getResponseToTheUploadedFile)
  }
  const onPressToSingleSuvidha = (item: any) => {
    ;(async () => {
      await getAnganwadiSuvidha(item?.id)
    })()

    setParticularSuvidha(item)
    navigate("ShowParticularSuvidha")
  }
  const onPressViewParticularSuvidha = (id: number | string) => {
    ;(async () => {
      await getAnganwadiSuvidha(id)
    })()

    const data = subTypesList.find((item) => item.id == id)
    setParticularSuvidha(data)
    navigate("ShowParticularSuvidha")
  }

  /**
   *
   * @param id api call for sub type of suvidha call api
   */
  const getSubTypes = async (id: number | string) => {
    if (id == 3) {
      setMainTypeOfID(id)
      setSubTypesList(addedPlayingToysArray)
      navigate("SuvidhaSubType")
    } else {
      setMainTypeOfID(id)
      const {
        result: {
          data: { data },
        },
      } = await AnganwadiApi.getSubTypeSuvidha(id)
      setSubTypesList(data)
      if (data.length > 1) {
        navigate("SuvidhaSubType")
      } else {
        onPressToSingleSuvidha(data[0])
      }
    }

    //
  }

  /**
   *
   * @param id for type of suvidha
   */
  const onPressToViewTypeList = async (id: number | string) => {
    await getSubTypes(id)
  }

  const callCommanThing = () => {
    resetData()
    setIDofSuvidha(-1)
    setIsOpenModal(false)
    toastShow(toast, "तुमची माहिती पाठवली गेली आहे !!", "top", "#bdfcbd")
  }
  const submitData = async () => {
    const issue = btnOne
      ? modalData[0]
      : btnTwo
      ? modalData[1]
      : btnThree
      ? modalData[2]
      : btnFour
      ? modalData[3]
      : ""

    if (IDofSuvidha !== -1) {
      const isBtnCondition = btnFour ? issue !== "" : issue !== "" && imageName !== ""
      if (isBtnCondition) {
        if (mainTypeOfID == 3) {
          const jsonData = {
            khelani_subservice_id: IDofSuvidha,
            issue: issue,
            file: btnFour ? "" : imageName,
            anganwadi_id: useData?.anganwadi_id,
          }

          const { result: { data: response = {}, status = 204 } = {} } =
            await AnganwadiApi.createPlayingToyService(jsonData)
          getAnganwadiSuvidha(IDofSuvidha)
          callCommanThing()
          await getListServiceIssuesByMonth(useData?.anganwadi_id)
        } else {
          const jsonData = {
            service: IDofSuvidha,
            issue: issue,
            file: btnFour ? "" : imageName,
            anganwadi_id: useData?.anganwadi_id,
          }
          const { result: { data: response = {} } = {} } = await AnganwadiApi.createService(
            jsonData,
          )
          getAnganwadiSuvidha(IDofSuvidha)
          await getListServiceIssuesByMonth(useData?.anganwadi_id)
          setIDofSuvidha(-1)
          closeModal()
          // toastShow(toast, "तुमची माहिती पाठवली गेली आहे !!", "top", "green.200")
          openAlertModal("तुमची माहिती पाठवली गेली आहे !!", 500)
        }
      } else {
        openAlertModal("कृपया तुम्ही पूर्ण माहिती भरा !!!!!", 500)
        // toastShow(toast, "कृपया तुम्ही पूर्ण माहिती भरा !!!!!", "top", "#fab4b4")
        // setIsOpenModal(false)
      }
    }
  }

  const value: AnganwadiSuvidhaContextInterface = {
    isOpenModal,
    openModal,
    closeModal,
    cancelButton,
    submitData,
    setIDofSuvidha,
    btnOne,
    setBtnOne,
    btnTwo,
    setBtnTwo,
    btnThree,
    setBtnThree,
    onChangeImage,
    imageName,
    onChangeImageFile,
    isExist,
    subTypesList,
    isFour,
    onPressToViewTypeList,
    onPressViewParticularSuvidha,
    particularSuvidha,
    Anganwadi,
    setBtnFour,
    btnFour,
    isAlreadyFill,
    onClickAnganwadiSuvidhaQuestionOpen,
    onClickAnganwadiSuvidhaQuestionClose,
    onSubmitQuestionSmartStatus,
    isOpenQuestionModal,
    setSmartAnganwadiAns,
    smartAnganwadiAns,
    ShowAllSuvidha,
    isSuvidhList,
    setIsSuvidhaList,
    suvidhaMain,
    isLoadingImage,
    exectuteLoaderImage,
    executeSetImage,
    setIsImageLoading,
    MonthlyReport,
    mainTypeOfID,
  }
  return (
    <AnganwadiSuvidhaContext.Provider value={value}>{children}</AnganwadiSuvidhaContext.Provider>
  )
}

export const useAnganwadiSuvidhaContext = () => {
  const context = useContext(AnganwadiSuvidhaContext)
  if (!context)
    throw new Error("use AnganwadiSuvidha context use in AnganwadiSuvidha context provider")
  return context
}
