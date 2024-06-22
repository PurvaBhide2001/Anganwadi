import { useToast } from "native-base"
import React, { createContext, useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Platform } from "react-native"
import { AnganwadiApi } from "../api/AnganwadiApi"
import { navigate } from "../navigators"
import { useCommanContextContext } from "./CommanContext"
import { useLoginContext } from "./LoginContext"

interface ImdediateInfoContextInterface {
  suvidha: any[]
  getImediateInfoReport: Function
  imediateInfoObj: any[]
  valueOfSelectedRadioButton: any
  setValueOfSelectedRadioButton: Function
  openModal: Function
  isShowModal: boolean
  closeModal: Function
  cancelButton: Function
  onSubmit: Function
  title: string
  onChangeImage: Function
  imageName: string
  onChangeImageFile: Function
  description: string
  setDescription: Function
  isExist: boolean
  exectuteLoaderImage: Function
  executeSetImage: Function
  isLoadingImage: boolean
  setIsLoadingImage: Function
}
const ImdediateInfoContext = createContext<null | ImdediateInfoContextInterface>(null)

type ImdediateInfoContextProps = { children: React.ReactNode }

export const ImdediateInfoContextProvider = ({ children }: ImdediateInfoContextProps) => {
  const [imediateInfoObj, setImediateInfoObj] = useState<any[]>([])
  const { useData, toastShow } = useLoginContext()
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [completeTitle, setCompleteTitle] = useState<string>("")
  const [imageName, setImageName] = useState<string>("")
  const [imageURL, seImageURL] = useState<any>(null)
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const [isExist, setIsExist] = useState<boolean>(false)
  const {
    selectFile,
    onSelectDocument,
    launchToTheCamera,
    openAlertModal,
    launchToTheCameraVersion2,
    selectFileVersion2,
  } = useCommanContextContext()
  const toast = useToast()

  /**
   * when select image to execute image loader
   */
  const exectuteLoaderImage = useCallback(() => {
    setIsLoadingImage(false)
  }, [])

  /**
   *when response is comming to set value
   */
  const executeSetImage = useCallback((response: any) => {
    setImageName(response)
  }, [])

  const [valueOfSelectedRadioButton, setValueOfSelectedRadioButton] = useState<any>("")
  const getImediateInfoReport = async () => {
    const {
      result: { data: { data: response = {} } = {} },
    } = await AnganwadiApi.getImediateReport(useData?.anganwadi_id)
    setImediateInfoObj(response)
    response.forEach((item: any) => {
      if (item.status === 1) {
        setValueOfSelectedRadioButton(item.id)
        setTitle(item.title)
      }
    })
  }
  const suvidha = [
    {
      title: "नवीन अंगणवाडी बांधकाम प्रगती",
      id: 1,
      icon: require("./../../assets/surveyimages/MainMenu/brickwall.png"),
      nav: () => {
        navigate("ImediateDetail")
      },
    },
  ]
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
  const onChangeImage = async () => {
    const response = await selectFile(getResponseToTheUploadedFile)
  }

  const onChangeImageFile = async (
    callBackFunctionForSetImage: Function,
    callBackFunctionLoader: Function,
  ) => {
    launchToTheCameraVersion2(
      getResponseToTheUploadedFile,
      callBackFunctionForSetImage,
      callBackFunctionLoader,
    )
  }

  // const onChangeImageFile = async () => {
  //   const response = await launchToTheCamera(getResponseToTheUploadedFile)
  // }

  const openModal = (item: any) => {
    console.log(item, "ITEMMMMM")

    setIsExist(false)

    if (item?.status == 2) {
      setImageName(item?.file)
      setDescription(item?.description)
      setTitle(item?.title)
      setIsExist(true)
    }
    if (item?.status == 1) {
      setImageName(item?.file)
      setDescription(item?.description)
      setTitle(item.title)
      setIsExist(false)
    }
    setIsShowModal(true)
  }
  const closeModal = () => {
    setIsShowModal(false)
  }
  const cancelButton = () => {
    setIsShowModal(false)
  }
  const onSubmit = async () => {
    console.log("this is on submit ", description, imageURL)
    if (description !== null && imageName !== "") {
      const jsonData = {
        anganwadi_id: useData?.anganwadi_id,
        work_status: valueOfSelectedRadioButton,
        description: description,
        file: imageName,
        status: "",
      }

      const { result: { data: { data = {} } = {}, status = 204 } = {} } =
        await AnganwadiApi.postImediateInfo(jsonData)
      setDescription("")
      setImageName("")
      await getImediateInfoReport()
      setIsShowModal(false)
      openAlertModal("तुमची माहिती पाठवली गेली आहे!!", 500)
      // toastShow(toast, "तुमची माहिती पाठवली गेली आहे!!", "top", "green.200")
    } else {
      openAlertModal("कृपया तुम्ही पूर्ण माहिती भरा!!!!!", 500)
      // toastShow(toast, "कृपया तुम्ही पूर्ण माहिती भरा!!!!!", "top", "#fab4b4")
    }
  }

  const value: ImdediateInfoContextInterface = {
    suvidha,
    getImediateInfoReport,
    imediateInfoObj,
    valueOfSelectedRadioButton,
    setValueOfSelectedRadioButton,
    isShowModal,
    openModal,
    closeModal,
    cancelButton,
    onSubmit,
    title,
    onChangeImage,
    imageName,
    onChangeImageFile,
    setDescription,
    description,
    isExist,
    exectuteLoaderImage,
    isLoadingImage,
    executeSetImage,
    setIsLoadingImage,
  }
  return <ImdediateInfoContext.Provider value={value}>{children}</ImdediateInfoContext.Provider>
}

export const useImdediateInfoContext = () => {
  const context = useContext(ImdediateInfoContext)
  if (!context)
    throw new Error("use AnganwadiSuvidha context use in AnganwadiSuvidha context provider")
  return context
}
