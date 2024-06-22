import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react"

import { Alert, PermissionsAndroid, Platform } from "react-native"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import DocumentPicker, { types } from "react-native-document-picker"
import { AnganwadiApi } from "../api/AnganwadiApi"
import ImageResizer from "@bam.tech/react-native-image-resizer"

import { Options } from "@bam.tech/react-native-image-resizer/lib/typescript/src/types"
interface CommanContextInterface {
  show: boolean
  showBirthDatePicker: boolean
  showPassDatePicker: boolean
  onChange: Function
  selectedDate: any
  showDatepicker: Function
  mode: any
  weight: number
  setWeight: Function
  height: number
  setHeight: Function
  selectFile: Function
  launchToTheCamera: Function
  imageObj: any
  setImageObj: Function
  onSelectDocument: Function
  launchToTheCameraVersion2: Function
  selectFileVersion2: Function
  openAlertModal: Function
  isAlertModalOpen: boolean
  alertMessage: string
  closeAlertModal: Function
  getResponseToTheUploadedFile: Function
  onChangeImageFile: Function
  onChangeImage: Function
  color: string
  showMonthAndYear: Function
  showMonth: boolean
  onChangeMonth: Function
  showMonthPicker: Function
  showDatePicker1: Function

  onChangeDate: Function
  onChangePassDate: Function
}
const CommanContext = createContext<null | CommanContextInterface>(null)

type CommanContextProps = { children: React.ReactNode }

export const CommanContextProvider = ({ children }: CommanContextProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [weight, setWeight] = useState<any>("")
  const [height, setHeight] = useState<any>("")
  const [color, setColor] = useState<string>("")
  const [alertMessage, setAlertMessage] = useState<string>("")

  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false)
  const [showPassDatePicker, setShowPassDatePicker] = useState(false)

  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)
  const [showMonth, setShowMonth] = useState<boolean>(false)

  const [imageObj, setImageObj] = useState<any>(null)
  const [documentObj, setDocumentObj] = useState<any>(null)
  const showMonthPicker = useCallback((value: boolean) => setShowMonth(value), [])
  const openAlertModal = (alertMessage: string, alertTimer: number, color?: string) => {
    setIsAlertModalOpen(true)
    setColor(color)
    setAlertMessage(alertMessage)
    setTimeout(() => {
      closeAlertModal()
    }, alertTimer)
  }

  const resizeImage = async (
    imgUri?: string,
    sizeTarget: number = 300,
    imageType: "JPEG" | "PNG" = "JPEG",
    quality: number = 100,
    rotation: number = 0,
    outputPath: string = undefined,
    keepmeta: boolean = false,
    option: Options = {
      mode: "contain",
      onlyScaleDown: true,
    },
  ) => {
    try {
      let result = await ImageResizer.createResizedImage(
        imgUri,
        sizeTarget,
        sizeTarget,
        imageType,
        quality,
        rotation,
        outputPath,
        keepmeta,
        option,
      )
      return result
    } catch (error) {
      Alert.alert("Unable to resize the photo")
      return error
    }
  }
  const imageUploadErrorAlert = (executeLoaderFunction: Function, message: string) => {
    executeLoaderFunction()
    openAlertModal(message, 500)
  }

  const closeAlertModal = () => {
    setIsAlertModalOpen(false)
  }

  const getResponseToTheUploadedFile = async (
    res: any,
    setFunction: Function,
    callBackFunctionLoader: Function,
  ) => {
    const {
      assets: [imageobject],
    } = await res
    if (!imageobject) {
      return
    }

    const resizeImageResponse = await resizeImage(imageobject.uri, 320)

    const uploadImageJson = {
      uri: Platform.OS === "android" ? resizeImageResponse.uri : "",
      type: imageobject.type,
      name: imageobject.fileName,
    }

    const { result: { data: response = {}, status = 500 } = {} } = await AnganwadiApi.upload(
      uploadImageJson,
    )
    status == 200 && callBackFunctionLoader()
    status == 500 &&
      imageUploadErrorAlert(
        callBackFunctionLoader,
        "तुम्ही घेतलेली इमेज किंवा फोटो अपलोड झालेली नाही!!!",
      )
    console.log("response for image", response, status)

    // openAlertModal("तुम्ही घेतलेली इमेज किंवा फोटो अपलोड केला गेला आहे !!!", 500)
    // toastShow(toast, "तुम्ही घेतलेली इमेज किंवा फोटो अपलोड केला गेला आहे", "top", "green.200")
    // setImageName(response.url.replace("file://", ""))
    // setImageURL(response)
    setFunction(response.url.replace("file://", ""))
  }
  const onChangeMonth = (event: any, date: any, setMonth: Function) => {
    console.log("date for month", date)

    const currentDate = date
    setShowMonth(Platform.OS === "ios")
    setMonth(currentDate)
    setShowMonth(false)
  }

  /**
   *
   * @param event date  picker functionality to set the date
   * @param date
   */
  const onChange = (
    event: DateTimePickerEvent,
    date?: Date,
    setDate?: Function,
    setShowAdmnValue?: Function,
  ) => {
    console.log("date on change", date)

    const currentDate = new Date(date) || selectedDate
    setShow(Platform.OS === "ios")
    // setSelectedDate(currentDate)
    setShowAdmnValue && setShowAdmnValue(Platform.OS === "ios")
    console.log("set date in comman context", date)

    setDate && setDate(currentDate)
  }

  const onChangeDate = (
    event: DateTimePickerEvent,
    date?: Date,
    setDate?: Function,
    setShowValue?: Function,
  ) => {
    const currentDate = new Date(date) || selectedDate
    setShow(Platform.OS === "ios")
    // setSelectedDate(currentDate)
    setDate(currentDate)
    setShowValue(false)
  }
  const onChangePassDate = (
    event: DateTimePickerEvent,
    date?: Date,
    setDate?: Function,
    setShowValue?: Function,
  ) => {
    const currentDate = new Date(date) || selectedDate
    setShow(Platform.OS === "ios")
    // setSelectedDate(currentDate)
    setDate(currentDate)
    setShowValue(false)
  }
  const showMode = (currentMode: any) => {
    setShow(true)
    setMode(currentMode)
  }

  const showMode1 = (currentMode: any, callBackShowMode: Function) => {
    callBackShowMode(true)
    setMode(currentMode)
  }

  const showDatePicker1 = (callBackSetShow: any) => {
    showMode1("date", callBackSetShow)
  }
  const showDatepicker = () => {
    showMode("date")
  }

  const showTimepicker = () => {
    showMode("time")
  }
  const showMonthAndYear = () => {
    showMode("month")
  }
  const onSelectDocument = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      })
      setDocumentObj(response)
    } catch (err) {
      console.warn(err)
    }
  }, [])

  /**
   * select to the image file        */
  const selectFile = async (getResponseToTheUploadedFile: Function) => {
    const options: any = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose file from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }
    launchImageLibrary(options, async (res: any) => {
      if (res.didCancel) {
      } else if (res.error) {
      } else if (res.customButton) {
        alert(res.customButton)
      } else {
        // const source = { uri: res.uri }
        /**
         * here selected image set here
         */
        setImageObj(res)
        return await getResponseToTheUploadedFile(res)
      }
    })
  }

  const selectFileVersion2 = async (
    getResponseToTheUploadedFile: Function,
    setFunction: Function,
    loaderFunction: Function,
  ) => {
    const options: any = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose file from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }
    launchImageLibrary(options, async (res: any) => {
      if (res.didCancel) {
        loaderFunction()
      } else if (res.error) {
      } else if (res.customButton) {
        alert(res.customButton)
      } else {
        // const source = { uri: res.uri }
        /**
         * here selected image set here
         */
        const {
          assets: [{ uri }],
        } = res
        console.log("res uri", uri)

        const response = await resizeImage(uri, 100)
        console.log("res ", res, "response ", response)

        setImageObj(res)
        return await getResponseToTheUploadedFile(res, setFunction, loaderFunction)
      }
    })
  }

  /**
   * camera launching function
   */
  const launchToTheCamera = async (getResponseToTheUploadedFile: Function) => {
    const options: any = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose file from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }
    try {
      /**
       * here is permission of device
       */
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, async (res: any) => {
          if (res.didCancel) {
          } else if (res.error) {
          } else if (res.customButton) {
            alert(res.customButton)
          } else {
            // const source = { uri: res.uri }
            /**
             * here capture image set
             */
            setImageObj(res)
            await getResponseToTheUploadedFile(res)
          }
        })
      } else {
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const launchToTheCameraVersion2 = async (
    getResponseToTheUploadedFile: Function,
    setImage: Function,
    loaderFunction: Function,
  ) => {
    const options: any = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose file from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }
    try {
      /**
       * here is permission of device
       */
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      })
      console.log("====================================")
      console.log("setImage", setImage)
      console.log("====================================")
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, async (res: any) => {
          if (res.didCancel) {
            loaderFunction()
          } else if (res.error) {
          } else if (res.customButton) {
            alert(res.customButton)
          } else {
            // const source = { uri: res.uri }
            /**
             * here capture image set
             */
            setImageObj(res)

            await getResponseToTheUploadedFile(res, setImage, loaderFunction)
          }
        })
      } else {
      }
    } catch (err) {
      console.warn(err)
    }
  }
  /**
   *
   * @param callBackFunction for set image for icon,another image in select image in gallary
   */
  const onChangeImageFile = async (
    getResponseToTheUploadedFile: Function,
    callBackFunctionForSetImage: Function,
    callBackFunctionLoader: Function,
  ) => {
    launchToTheCameraVersion2(
      getResponseToTheUploadedFile,
      callBackFunctionForSetImage,
      callBackFunctionLoader,
    )
  }

  /**
   *
   * @param callBackFunction for set image for icon ,image in capture image in camera
   */
  const onChangeImage = async (
    getResponseToTheUploadedFile: Function,
    callBackFunctionForSetImage: Function,
    callBackFunctionLoader: Function,
  ) => {
    await selectFileVersion2(
      getResponseToTheUploadedFile,
      callBackFunctionForSetImage,
      callBackFunctionLoader,
    )
  }
  const value: CommanContextInterface = {
    onChange,
    show,
    selectedDate,
    showDatepicker,
    mode,
    weight,
    setWeight,
    height,
    setHeight,
    selectFile,
    launchToTheCamera,
    imageObj,
    setImageObj,
    onSelectDocument,
    launchToTheCameraVersion2,
    selectFileVersion2,
    openAlertModal,
    isAlertModalOpen,
    alertMessage,
    closeAlertModal,
    getResponseToTheUploadedFile,
    onChangeImageFile,
    onChangeImage,
    color,
    showMonthAndYear,
    showMonth,
    onChangeMonth,
    showMonthPicker,

    showBirthDatePicker,
    showDatePicker1,
    showPassDatePicker,
    onChangeDate,
    onChangePassDate,
  }
  return <CommanContext.Provider value={value}>{children}</CommanContext.Provider>
}

export const useCommanContextContext = () => {
  const context = useContext(CommanContext)
  if (!context) throw Error("use CommanContext in  CommanContext screen context provider!!")
  return context
}
