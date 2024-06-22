import { createContext, useContext, useEffect, useState } from "react"
import { useLoginContext } from "./LoginContext"
import { useForm, useFieldArray, FieldValues } from "react-hook-form"
import { AngamwadiProfileApi } from "../api/AnganwadiApi"
import { navigate } from "../navigators"
import ToastShow from "../components/ToastShow"
import { useToast } from "native-base"

interface AnganwadiProfileInterface {
  AnganwadiProfile: any[]
  awcMiniType: any[]
  awcType: any[]
  // structureType: any[]
  buildingType: any[]
  AWCControl: any
  AWCHandleSubmit: Function
  WorkerControl: any
  LocationControl: any
  AboutControl: any
  WorkerhandleSubmit: Function
  LocationHandleSubmit: Function
  onUpdateAnganwadiBuildingType: Function
  onUpdateAnganwadiLocation: Function
  onUpdateAww: Function
  onUpdateAboutAnganwadi: Function
  AboutHandleSubmit: Function
  LocationHandleWatch: Function
  selectedRadioOption1: string
  setSelectedRadioOption1: Function
  selectedRadioOption2: string
  setSelectedRadioOption2: Function
  selectedRadioOption3: string
  setSelectedRadioOption3: Function
  selectedRadioOption4: string
  setSelectedRadioOption4: Function
  control: any
  awwHandleSubmit: Function
  fields: any
  append: Function
  remove: Function
  getValues: Function
  getFieldState: any
  shauchalay: any[]
  electricity: any[]
  awcErrors: any
  isSpinner: boolean
  locationsErrors: any
}
const AnganwadiProfileContext = createContext<null | AnganwadiProfileInterface>(null)
type AnganwadiProfileProps = { children: React.ReactNode }

export const AnganwadiProfileContextProvider = ({ children }: AnganwadiProfileProps) => {
  const toast = useToast()
  const [AnganwadiProfileValue, setAnganwadiProfileValue] = useState<number>(0)
  const [selectedRadioOption1, setSelectedRadioOption1] = useState<string>("")
  const [selectedRadioOption2, setSelectedRadioOption2] = useState<string>("")
  const [selectedRadioOption3, setSelectedRadioOption3] = useState<string>("")
  const [selectedRadioOption4, setSelectedRadioOption4] = useState<string>("")
  const [selectedPrakalpaID, setSelectedPrakalpaID] = useState<string>("")
  const [isSpinner, setIsSpinner] = useState<boolean>(false)
  const locationName = ["state", "district", "block", "village", "prakalpa_id", "bit_id"]
  type awwFormValues = {
    aww: {
      f_name: string
      m_name: string
      l_name: string
      contact_number: string
      email: string
      role: string
    }[]
  }

  const {
    control,
    handleSubmit: awwHandleSubmit,
    getValues,
    getFieldState,
  } = useForm<awwFormValues>()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<awwFormValues>({
    name: "aww",
    control,
  })
  /* Anganwadi Building Type */
  const {
    control: AWCControl,
    handleSubmit: AWCHandleSubmit,
    setValue: awcSetValue,
    formState: { errors: awcErrors, isValid },
  } = useForm()
  /**
   * when you set value
   */
  const awcTypeArray = ["awc", "drinking_water", "toilet", "electronic", "building_type"]
  const { useData, toastShow, usernewDataSet } = useLoginContext()

  useEffect(() => {
    ;(async () => {
      if (useData) {
        const {
          result: {
            data: { data, status },
          },
        } = await AngamwadiProfileApi.showAnganwadiProfile(useData?.anganwadi_id)
        awcTypeArray.forEach((key) => {
          awcSetValue(key, data[key])
        })
      }
    })()
  }, [useData])
  const onUpdateAnganwadiBuildingType = async (formData: any) => {
    setIsSpinner(true)
    const jsonData = {
      anganwadi_id: useData?.anganwadi_id,
      name: useData?.anganwadi_name,
      aganwadi_no: useData?.anganwadi_code,
      state: useData?.state,
      district: useData?.district,
      block: useData?.block,
      village: useData?.village,
      ...formData,
    }
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await AngamwadiProfileApi.updateAnganwadiType(useData?.anganwadi_id, jsonData)
    if (status == 200) {
      setIsSpinner(false)
      toastShow(toast, "अंगणवाडी प्रकार अपडेट केला आहे", "top", "#bdfcbd")
      navigate("AnganwadiProfile")
    }
  }
  /* Anganwadi Location */

  // const AnganwadiArray = ["state", "district", "block", "village"]
  // const getAnganwadi = async () => {
  //   const {
  //     result: { data: { data: [AnganwadiData] = [], status = 204 } = {} },
  //   } = await AngamwadiProfileApi.showSmartAnganwadi(useData?.anganwadi_id)
  //   // setPseStatus(status)
  //   // if (status == 200) {
  //   //   AnganwadiArray.forEach((element) => {
  //   //     AnganwadiSetValue(element, AnganwadiData[element])
  //   //   })
  //   //   setDateValue(AnganwadiData?.year_month)
  //   // }
  // }
  // useEffect(() => {
  //   if (!useData) return
  //   getAnganwadi()
  // }, [useData])

  const {
    control: LocationControl,
    handleSubmit: LocationHandleSubmit,
    watch: LocationHandleWatch,
    setValue: locationSetValue,
    formState: { errors: locationsErrors },
  } = useForm()
  const onUpdateAnganwadiLocation = async (formData: any) => {
    setIsSpinner(true)
    const jsonData = {
      anganwadi_id: useData?.anganwadi_id,
      aganwadi_no: useData?.anganwadi_code,
      name: useData?.anganwadi_name,
      ...formData,
    }
    console.log("Location", jsonData)

    const {
      result: {
        data: { data, status },
      },
    } = await AngamwadiProfileApi.updateAnganwadiType(useData?.anganwadi_id, jsonData)
    console.log("Location Updated DATAA======////", data, status)
    if (status == 200) {
      setIsSpinner(false)
      navigate("AnganwadiProfile")
      toastShow(toast, "अंगणवाडी अपडेट झाली आहे ", "top", "#bdfcbd")
    }
  }
  useEffect(() => {
    if (useData) {
      ;(async () => {
        const {
          result: {
            data: { data },
          },
        } = await AngamwadiProfileApi.showAnganwadiProfile(useData.anganwadi_id)
        console.log("datat  ", data)

        locationName.forEach((name: string) => {
          locationSetValue(name, data[name])
        })
      })()
    }
  }, [useData])

  /* Anganwadi Staff */
  const { control: WorkerControl, handleSubmit: WorkerhandleSubmit } = useForm()
  const onUpdateAww = async (formData: any) => {
    // const jsonData = {
    //   anganwadi_id: useData?.anganwadi_id,
    //   ...formData,
    // }
    // const {
    //   result: {
    //     data: { data },
    //   },
    // } = await AngamwadiProfileApi.updateAnganwadiSevikaWorkers(useData?.anganwadi_id, jsonData)
    // console.log("Workers", data)
  }
  /* About Anganwadi */
  const {
    control: AboutControl,
    handleSubmit: AboutHandleSubmit,
    setValue: aboutSetValue,
  } = useForm()

  useEffect(() => {
    if (useData) {
      aboutSetValue("anganwadi_name", useData?.anganwadi_name)
      aboutSetValue("anganwadi_code", useData?.anganwadi_code)
    }
  }, [useData])

  const onUpdateAboutAnganwadi = async (formData: any) => {
    const jsonData = {
      anganwadi_id: useData?.anganwadi_id,
      state: useData?.state,
      district: useData?.district,
      block: useData?.block,
      village: useData?.village,
      ...formData,
    }

    const { result: { data: { data = {} } = {} } = {} } =
      await AngamwadiProfileApi.updateAnganwadiType(useData?.anganwadi_id, jsonData)

    navigate("AnganwadiProfile")
  }

  const [awcMiniType, setawcMiniType] = useState<any[]>([
    {
      value: "रेग्युलर अंगणवाडी ",
      id: "1",
    },
    {
      value: " मिनी अंगणवाडी ",
      id: "2",
    },
  ])

  const [awcType, setawcType] = useState<any[]>([
    {
      value: "होय",
      id: "1",
    },
    {
      value: "नाही",
      id: "0",
    },
  ])
  const [shauchalay, setShauchalay] = useState<any[]>([
    {
      value: "होय",
      id: "1",
    },
    {
      value: "नाही",
      id: "0",
    },
  ])
  const [electricity, setElectricity] = useState<any[]>([
    {
      value: "होय",
      id: "1",
    },
    {
      value: "नाही",
      id: "0",
    },
  ])
  // const [structureType, setstructureType] = useState<any[]>([
  //   {
  //     value: "पक्के बांधकाम",
  //     id: 1,
  //   },
  //   {
  //     value: "कच्चे बांधकाम ",
  //     id: 1,
  //   },
  // ])
  const [buildingType] = useState<any[]>([
    {
      value: "अ. स्वतःची इमारत",
      id: "1",
    },
    {
      value: "अ. भाड्याची इमारत",
      id: "2",
    },
    {
      value: "अ. समुदाय इमारत",
      id: "3",
    },
    {
      value: "अ. मोकळ्या जागेत",
      id: "4",
    },
  ])
  const [AnganwadiProfile] = useState<any[]>([
    {
      id: 1,
      //   title: "वाढ",
      //   description: "वयानुसार अपेक्षित उंची",
      //   bgColor: "#d3f7d7",
      //   borderColor: "#40A48B",
      //   name: "उंची",
      //   icon: require("../../assets/surveyimages/AnganwadiProfileScreen/overweight.png"),
    },
  ])

  const onSubmitAwwHelperScreen = () => {}
  const value: AnganwadiProfileInterface = {
    AnganwadiProfile,
    awcMiniType,
    awcType,
    // structureType,
    buildingType,
    AWCControl,
    AWCHandleSubmit,
    WorkerControl,
    onUpdateAnganwadiBuildingType,
    onUpdateAnganwadiLocation,
    onUpdateAww,
    WorkerhandleSubmit,
    LocationControl,
    AboutControl,
    LocationHandleSubmit,
    AboutHandleSubmit,
    onUpdateAboutAnganwadi,
    selectedRadioOption1,
    setSelectedRadioOption1,
    selectedRadioOption2,
    setSelectedRadioOption2,
    selectedRadioOption3,
    setSelectedRadioOption3,
    selectedRadioOption4,
    setSelectedRadioOption4,
    control,
    awwHandleSubmit,
    fields,
    append,
    remove,
    getValues,
    getFieldState,
    LocationHandleWatch,
    shauchalay,
    electricity,
    awcErrors,
    isSpinner,
    locationsErrors,
  }
  return (
    <AnganwadiProfileContext.Provider value={value}>{children}</AnganwadiProfileContext.Provider>
  )
}

export const useAnganwadiProfileContext = () => {
  const context = useContext(AnganwadiProfileContext)
  if (!context)
    throw Error("overall feedback context provider wrapp in overall feedback context provider")
  return context
}
