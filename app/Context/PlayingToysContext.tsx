import { useToast } from "native-base"
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

import { Platform } from "react-native"
import { AnganwadiApi } from "../api/AnganwadiApi"

import { useCommanContextContext } from "./CommanContext"
import { useLoginContext } from "./LoginContext"

interface PlayingToysContextInterface {
  addedPlayingToysArray: any[]
  isOpenPlayModal: boolean
  openToPlayModal: Function
  closeToPlayModal: Function
  // onChangeImageFile: Function
  // onChangeImage: Function
  imageName: string
  setToyName: Function
  toyName: string
  onAddToToy: Function
  isLodingImage: boolean
  isLodingStudentImage: boolean
  onUpdateToy: Function
  isUpdate: boolean
  onUpdatedToy: Function
  deleteMessage: string
  deleteBtnName: string
  cancelBtnName: string
  closeWarningModal: Function
  deleteToyItem: Function
  yesToDeleteToyItem: Function
  isWarningModalOpen: boolean
  setAnotherOneImage: Function
  setIconImage: Function
  imageName2: string
  executeLoaderIcon: Function
  exectuteLoaderImage: Function
  isLodingImage2: boolean
  setIsLodingImage: Function
  setIsLodingStudentImage: Function
  setIsLodingImage2: Function
}
const PlayingToysContext = createContext<null | PlayingToysContextInterface>(null)

type PlayingToysContextProps = { children: React.ReactNode }

export const PlayingToysContextProvider = ({ children }: PlayingToysContextProps) => {
  const [isOpenPlayModal, setIsOpenPlayModal] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>("")
  const {
    selectFile,
    onSelectDocument,
    launchToTheCamera,
    imageObj,
    launchToTheCameraVersion2,
    selectFileVersion2,
    openAlertModal,
    getResponseToTheUploadedFile,
  } = useCommanContextContext()

  const [toyName, setToyName] = useState<string>("")
  const [imageURL, setImageURL] = useState<string>("")
  const [imageURL2, setImageURL2] = useState<string>()
  const [imageName2, setImageName2] = useState<string>("")
  const { toastShow, useData, addedPlayingToysArray } = useLoginContext()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [selectedPlayingToyID, setSelectedPlayingToyID] = useState<string | number>("")
  const [isLodingImage, setIsLodingImage] = useState<boolean>(false)
  const [isLodingStudentImage, setIsLodingStudentImage] = useState<boolean>(false)
  const [isLodingImage2, setIsLodingImage2] = useState<boolean>(false)
  const [deleteMessage, setDeleteMessage] = useState<any>("तुम्हाला खेळणी नक्की हटवायची आहे का??")
  const [deleteBtnName] = useState<string>("हटवा")
  const [cancelBtnName] = useState<string>("रद्द करा")
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)

  const toast = useToast()
  const { getPlayingToys } = useLoginContext()

  const resetDataAndCallGetPlayingList = (anganwadi_id: number | string) => {
    getPlayingToys(anganwadi_id)
    setImageName("")
    setToyName("")
    setSelectedPlayingToyID("")
    setImageName2("")
    setIsUpdate(false)
  }
  const findToy = (id: number | string) => {
    return addedPlayingToysArray.find((item: any) => item?.id == id)
  }

  const openToPlayModal = () => {
    setIsOpenPlayModal(true)
  }
  const closeToPlayModal = () => {
    setTimeout(() => {
      setIsOpenPlayModal(false)
      resetDataAndCallGetPlayingList(useData?.anganwadi_id)
    }, 600)
  }
  const openWarningModal = () => {
    setIsWarningModalOpen(true)
  }

  const closeWarningModal = () => {
    setIsWarningModalOpen(false)
  }

  const yesToDeleteToyItem = async () => {
    const {
      result: { data: { data = {}, status = 204 } = {} },
    } = await AnganwadiApi.deletePlayingToy(selectedPlayingToyID)
    console.log("data deleted", data, status)
    resetDataAndCallGetPlayingList(useData?.anganwadi_id)
    closeWarningModal()
  }
  const deleteToyItem = (id: number | string) => {
    setSelectedPlayingToyID(id)
    openWarningModal()
  }

  // const getResponseToTheUploadedFile = async (
  //   res: any,
  //   setFunction: Function,
  //   callBackFunctionLoader: Function,
  // ) => {
  //   const {
  //     assets: [imageobject],
  //   } = await res
  //   if (!imageobject) {
  //     return
  //   }
  //   console.log("====================================")
  //   setFunction && console.log("setFunction", setFunction)
  //   console.log("====================================")
  //   const uploadImageJson = {
  //     uri: Platform.OS === "android" ? imageobject.uri : "",
  //     type: imageobject.type,
  //     name: imageobject.fileName,
  //   }
  //   const {
  //     result: { data: response, status },
  //   } = await AnganwadiApi.upload(uploadImageJson)

  //   console.log("response for image", response, status)

  //   setTimeout(() => {
  //     callBackFunctionLoader()
  //   }, 500)
  //   // openAlertModal("तुम्ही घेतलेली इमेज किंवा फोटो अपलोड केला गेला आहे !!!", 500)
  //   // toastShow(toast, "तुम्ही घेतलेली इमेज किंवा फोटो अपलोड केला गेला आहे", "top", "green.200")
  //   // setImageName(response.url.replace("file://", ""))
  //   // setImageURL(response)
  //   setFunction(response.url.replace("file://", ""))
  // }
  const setIconImage = useCallback((response: any) => {
    setImageName(response)
  }, [])
  const setAnotherOneImage = useCallback((response: any) => {
    console.log("====================================")
    console.log("setAnotherOneImage", response)
    console.log("====================================")
    setImageName2(response)
  }, [])

  const executeLoaderIcon = useCallback(() => {
    setIsLodingImage(false)
  }, [])
  const exectuteLoaderImage = useCallback(() => {
    setIsLodingImage2(false)
  }, [])

  /**
   *
   * @param callBackFunction for set image for icon,another image in select image in gallary
   */
  // const onChangeImageFile = async (
  //   getResponseToTheUploadedFile: Function,
  //   callBackFunctionForSetImage: Function,
  //   callBackFunctionLoader: Function,
  // ) => {
  //   launchToTheCameraVersion2(
  //     getResponseToTheUploadedFile,
  //     callBackFunctionForSetImage,
  //     callBackFunctionLoader,
  //   )
  // }

  /**
   *
   * @param callBackFunction for set image for icon ,image in capture image in camera
   */
  // const onChangeImage = async (
  //   getResponseToTheUploadedFile: Function,
  //   callBackFunctionForSetImage: Function,
  //   callBackFunctionLoader: Function,
  // ) => {
  //   await selectFileVersion2(
  //     getResponseToTheUploadedFile,
  //     callBackFunctionForSetImage,
  //     callBackFunctionLoader,
  //   )
  // }
  /**
   * update to the toy
   */
  const onUpdateToy = (id: number | string) => {
    console.log("id", id, findToy(id))
    const data = findToy(id)
    console.log("====================================")
    console.log("updating data", data)
    console.log("====================================")
    setSelectedPlayingToyID(id)
    setImageName(data?.icon)
    setToyName(data?.title)
    setImageName2(data?.image)
    setIsUpdate(true)
    openToPlayModal()
  }

  /**
   * updated playing toy
   */
  const onUpdatedToy = async () => {
    const jsonData = {
      title: toyName,
      icon: imageName,
      image: imageName2,
    }
    const {
      result: { data: { data = {}, status = 204 } = {} },
    } = await AnganwadiApi.updatePlayingToy(selectedPlayingToyID, jsonData)

    if (status == 200) {
      openAlertModal("तुम्ही भरलेला डेटा अपडेट  केला गेला आहे !!!", 500)
      resetDataAndCallGetPlayingList(useData?.anganwadi_id)
      closeToPlayModal()
    }
  }

  /***
   * add to the toy
   */
  const onAddToToy = async () => {
    console.log("imageName, toyName", imageName, toyName, useData?.anganwadi_id)
    const jsonData = {
      title: toyName,
      icon: imageName,
      image: imageName2,
      anganwadi_id: useData?.anganwadi_id,
    }
    if (toyName !== "" && imageName !== "" && imageName2 !== "") {
      const {
        result: { data: { data = {}, status = 204 } = {} },
      } = await AnganwadiApi.createPlayingToy(jsonData)
      console.log("data", data, "jsonData", jsonData, status)
      if (status == 200) {
        openAlertModal("तुम्ही भरलेला डेटा अपलोड केला गेला आहे ", 500)
        resetDataAndCallGetPlayingList(useData?.anganwadi_id)
        closeToPlayModal()
      }
      // clearToData()
    } else {
      openAlertModal("कृपया तुम्ही सर्व फील्ड फील करा !!!", 500)
      // toastShow(toast, "कृपया तुम्ही सर्व फील्ड फील करा !!!", "top", "red.200")
    }
  }
  const value: PlayingToysContextInterface = {
    addedPlayingToysArray,
    isOpenPlayModal,
    openToPlayModal,
    closeToPlayModal,
    // onChangeImageFile,
    // onChangeImage,
    imageName,
    setToyName,
    toyName,
    onAddToToy,
    isLodingImage,
    onUpdateToy,
    isUpdate,
    onUpdatedToy,
    deleteMessage,
    deleteBtnName,
    cancelBtnName,
    closeWarningModal,
    deleteToyItem,
    yesToDeleteToyItem,
    isWarningModalOpen,
    setAnotherOneImage,
    setIconImage,
    imageName2,
    executeLoaderIcon,
    exectuteLoaderImage,
    isLodingImage2,
    setIsLodingImage,
    setIsLodingImage2,
    isLodingStudentImage,
    setIsLodingStudentImage,
  }
  return <PlayingToysContext.Provider value={value}>{children}</PlayingToysContext.Provider>
}

export const usePlayingToysContext = () => {
  const context = useContext(PlayingToysContext)
  if (!context) throw new Error("use PlayingToys context use in PlayingToys context provider")
  return context
}
