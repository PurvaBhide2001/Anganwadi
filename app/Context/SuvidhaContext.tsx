import { useToast } from "native-base"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Platform } from "react-native"
import { AnganwadiApi } from "../api/AnganwadiApi"
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
}
const AnganwadiSuvidhaContext = createContext<null | AnganwadiSuvidhaContextInterface>(null)

type AnganwadiSuvidhaContextProps = { children: React.ReactNode }

export const AnganwadiSuvidhaContextProvider = ({ children }: AnganwadiSuvidhaContextProps) => {
  const [selectedSuvidhaID, setSelectedSuvidhaID] = useState<number>(0)

  const Anganwadi = [
    {
      id: 1,
      icon: require("../../assets/surveyimages/anganwadiProfile/1.png"),
      title: "अंगणवाडी बद्दल",
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
      title: "AWC प्रकार",
      navigation: () => navigate("AWCType"),
    },

    {
      id: 4,
      icon: require("../../assets/surveyimages/anganwadiProfile/4.png"),
      title: "AWW कार्यरत आणि मदतनीस",
      navigation: () => navigate("AWWWorkingHelpers"),
    },

    {
      id: 5,
      icon: require("../../assets/surveyimages/anganwadiProfile/5.png"),
      title: "अंगणवाडी सर्वेक्षणानुसार एकूण सहभागी",
      navigation: () => navigate("TotalParticipants"),
    },

    {
      id: 6,
      icon: require("../../assets/surveyimages/anganwadiProfile/6.png"),
      title: "AWC चे कार्य वितरित सेवा तपशीलवार सहभागी",
      navigation: () => navigate("FunctionsAndServicesByAWC"),
    },

    {
      id: 7,
      icon: require("../../assets/surveyimages/anganwadiProfile/7.png"),
      title: "पौष्टिक स्थिती ",
      navigation: () => navigate("NutritionalStatus"),
    },

    // {
    //   icon: require("../../assets/surveyimages/anganwadiProfile/8.png"),
    //   title: "पायाभुत सुविधा",
    //   navigation: () => navigate("InfrastructureFacilities"),
    // },

    {
      id: 9,
      icon: require("../../assets/surveyimages/anganwadiProfile/9.png"),
      title: "(VHND) क्रियाकलाप सारांश",
      navigation: () => navigate("ActivitySummary"),
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

  const { selectFile, onSelectDocument, launchToTheCamera, imageObj } = useCommanContextContext()
  const { useData, toastShow, setIsExistSmartAnganwadi } = useLoginContext()
  const toast = useToast()
  const [smartAnganwadiAns, setSmartAnganwadiAns] = useState<string>("")
  const [isAlreadyFill, setIsAlreadyFill] = useState(false)
  const [subTypesList, setSubTypesList] = useState<any[]>([])
  const [imageName, setImageName] = useState<string>("")
  const [particularSuvidha, setParticularSuvidha] = useState<any>(null)
  const [isExist, setExist] = useState<boolean>(false)
  const [isFour, setIsFour] = useState<boolean>(false)

  const [iSchangeBtnName, setIsChangeBtnName] = useState<boolean>(false)
  const modalData = ["वापरास योग्य", "तात्काळ दुरुस्तीची गरज", "वापरास अयोग्य", "उपलब्ध नाही"]

  const title = "स्थिती"
  const photoUploadBtn = "फोटो अपलोड करा"

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
    setIsExistSmartAnganwadi(false)
    setIsOpenQuestionModal(false)
  }
  const createQuestionSmartStatus = async () => {
    const { result: { data: { data = {} } = {} } = {} } =
      await AnganwadiApi.createAnganwadiSmartStatus({
        anganwadi_id: useData?.anganwadi_id,
        status: smartAnganwadiAns,
      })
    console.log("====================================")
    console.log("datat", data)

    console.log("====================================")
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
    const { result: { data: { data = {} } = {} } = {} } = await AnganwadiApi.getAnganwadiSuvidha(
      useData?.anganwadi_id,
      id,
    )
    if (data === "No Records Found") {
      setIsAlreadyFill(false)
    } else {
      setIsAlreadyFill(true)
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
    setIsOpenModal(false)
    resetData()
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
    const {
      result: { data: response },
    } = await AnganwadiApi.upload(uploadImageJson)
    toastShow(toast, "तुम्ही घेतलेली इमेज किंवा फोटो अपलोड केला गेला आहे", "top", "#bdfcbd")
    setImageName(response.url.replace("file://", ""))
    seImageURL(response)
  }
  const onChangeImageFile = async () => {
    const response = await launchToTheCamera(getResponseToTheUploadedFile)
  }
  const onChangeImage = async () => {
    const response = await selectFile(getResponseToTheUploadedFile)
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
    console.log("data for subtype", data)
    setParticularSuvidha(data)
    navigate("ShowParticularSuvidha")
  }
  /**
   *
   * @param id api call for sub type of suvidha call api
   */
  const getSubTypes = async (id: number | string) => {
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

    //
  }

  /**
   *
   * @param id for type of suvidha
   */
  const onPressToViewTypeList = async (id: number | string) => {
    await getSubTypes(id)
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
      if (issue !== "" && imageName !== "") {
        const jsonData = {
          service: IDofSuvidha,
          issue: issue,
          file: imageURL.url.replace("file://", ""),
          anganwadi_id: useData?.anganwadi_id,
        }
        const { result: { data: response = {} } = {} } = await AnganwadiApi.createService(jsonData)
        resetData()
        setIDofSuvidha(-1)
        setIsOpenModal(false)
        toastShow(toast, "तुमची माहिती पाठवली गेली आहे !!", "top", "#bdfcbd")
      } else {
        toastShow(toast, "कृपया तुम्ही पूर्ण माहिती भरा !!!!!", "top", "#fab4b4")
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
