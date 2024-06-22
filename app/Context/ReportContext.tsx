import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { ReportApi, ReportShowApi } from "../api/ReportApi"
import { useLoginContext } from "./LoginContext"
import { useForm } from "react-hook-form"
import { dateFormatRequiredType } from "../filter/dateAndTimeFormat"
import { useToast } from "native-base"
import { navigate } from "../navigators"
interface ReportContextInterface {
  onSubmitPSEData: Function
  PSEHandleSubmit: Function
  PSEControl: any
  onSubmitBirthRateData: Function
  BirthRateHandleSubmit: Function
  BirthRateControl: any
  callBackdateSet: Function
  LBWControl: any
  HBControl: any
  LBWHandleSubmit: Function
  HBHandleSubmit: Function
  onSubmitLBWData: Function
  onSubmitHBData: Function
  HealthControl: any
  HealthHandleSubmit: Function
  onSubmitHealthCheckup: Function
  dateValue: any
  ToiletControl: any
  ToiletHandleSubmit: Function
  onSubmitShauchalayBandhkam: Function
  AdharControl: any
  AdharHandleSubmit: Function
  onSubmitAdharReport: Function
  KishoriControl: any
  KishoriHandleSubmit: Function
  onSubmitKishoriReport: Function
  SuwMuwControl: any
  SuwMuwHandleSubmit: Function
  onSubmitSuwMuw: Function
  BalaControl: any
  BalaHandleSubmit: Function
  onSubmitBalaReport: Function
  SamMamControl: any
  SamMamHandleSubmit: Function
  onSubmitSamMam: Function
  VCDCControl: any
  VCDCHandleSubmit: Function
  onSubmitVCDCReport: Function
  NutritionControl: any
  NutritionHandleSubmit: Function
  onSubmitNutritionReport: Function
  hbStatus: any
  pseStatus: any
  adharStatus: any
  birthRateStatus: any
  lbwStatus: any
  healthStatus: any
  shauchalayStatus: any
  kishoriStatus: any
  suwMuwStatus: any
  balaStatus: any
  vcdcStatus: any
  nutritionStatus: any
  samMamStatus: any
  isLoading: boolean
  isLoadingHC: boolean
  isLoadingBirthrate: boolean
  isLoadingKishori: boolean
  isLoadingHb: boolean
  isLoadingToilet: boolean
  isLoadingBala: boolean
  isLoadingLbw: boolean
  isLoadingVcdc: boolean
  isLoadingSuwNMuW: boolean
  isLoadingSamMam: boolean
  isLoadingPse: boolean
  isLoadingNutrition: boolean

  datePseValue: any
  dateFGValue: any
  dateSamMamValue: any
  dateSuwMuwValue: any
  dateVcdcValue: any
  dateLbwValue: any
  dateBalaValue: any
  dateToiletValue: any
  dateWomenHbBmiValue: any
  dateKishoriValue: any
  dateBirthRateValue: any
  dateHealthCheckupValue: any
  dateAdharValue: any
  callBackPsedateSet: Function
  callBackFGdateSet: Function
  callBackSamMamdateSet: Function
  callBackSuwMuwdateSet: Function
  callBackVcdcdateSet: Function
  callBackLbwdateSet: Function
  callBackBaladateSet: Function
  callBackToiletdateSet: Function
  callBackWomenHbBmidateSet: Function
  callBackKishoridateSet: Function
  callBackBirthRatedateSet: Function
  callBackHealthCheckupdateSet: Function
  callBackAdhardateSet: Function
  getCurrentDate: Function
  isOpenWarninigModal: boolean
  closeToTheWarningModal: Function
  openWarningModal: Function
  adharHandleError: any
  exectutePSEApi: Function
  executeAdharApi: Function
  PSEErrors: any
  executeFinalHealthCheckup: Function
  finalHealthError: any
  birthRateError: any
  executeBirthRateApi: Function
  kishorError: any
  executeKishorApi: Function
  hbStateError: any
  executeHBApi: Function
  toiletError: any
  executeToiletApi: Function
  balaError: any
  executeBalaApi: Function
  lbwError: any
  executeLbwApi: Function
  vcdcError: any
  executevcdcApi: Function
  suwMuwError: any
  executeSuwMuwApi: Function
  samMamError: any
  executeSamMamApi: Function
  nutritionsError: any
  executeNutritionApi: Function
  nutritionReset: Function
  birthRateeReset: Function
  pseReset: Function
  samMamReset: Function
  suwMuwReset: Function
  vcdcReset: Function
  lbwReset: Function
  balaReset: Function
  toiletReset: Function
  hbReset: Function
  kishorReset: Function
  finalHealthCheckupReset: Function
  adharReset: Function
}
type ReportContextType = { children: React.ReactNode }
const ReportContext = createContext<null | ReportContextInterface>(null)
export const ReportContextProvider = ({ children }: ReportContextType) => {
  const [dateValue, setDateValue] = useState<any>(new Date())
  const [deliverToJsonData, setDeliverToJsonData] = useState<any>(null)
  const [birthRateStatus, setBirthRateStatus] = useState<any>([])
  const [hbStatus, setHbStatus] = useState<any>([])
  const [pseStatus, setPseStatus] = useState<any>([])
  const [adharStatus, setAdharStatus] = useState<any>([])
  const [lbwStatus, setLbwStatus] = useState<any>([])
  const [healthStatus, setHealthStatus] = useState<any>([])
  const [shauchalayStatus, setShauchalayStatus] = useState<any>([])
  const [kishoriStatus, setKishoriStatus] = useState<any>([])
  const [suwMuwStatus, setSuwMuwStatus] = useState<any>([])
  const [balaStatus, setBalaStatus] = useState<any>([])
  const [vcdcStatus, setVcdcStatus] = useState<any>([])
  const [nutritionStatus, setNutritionStatus] = useState<any>([])
  const [samMamStatus, setSamMamStatus] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingHC, setIsLoadingHC] = useState(false)
  const [isLoadingBirthrate, setIsLoadingBirthrate] = useState(false)
  const [isLoadingKishori, setIsLoadingKishori] = useState(false)
  const [isLoadingHb, setIsLoadingHb] = useState(false)
  const [isLoadingToilet, setIsLoadingToilet] = useState(false)
  const [isLoadingBala, setIsLoadingBala] = useState(false)
  const [isLoadingLbw, setIsLoadingLbw] = useState(false)
  const [isLoadingVcdc, setIsLoadingVcdc] = useState(false)
  const [isLoadingSamMam, setIsLoadingSamMam] = useState(false)
  const [isLoadingPse, setIsLoadingPse] = useState(false)
  const [isLoadingSuwNMuW, setIsLoadingSuwMuw] = useState(false)
  const [isLoadingNutrition, setIsLoadingNutrition] = useState(false)
  const { useData, toastShow, setIsExistSmartAnganwadi } = useLoginContext()
  const [datePseValue, setDatePseValue] = useState<any>(new Date())
  const [dateFGValue, setDateFGValue] = useState<any>(new Date())
  const [dateSamMamValue, setDateSamMamValue] = useState<any>(new Date())
  const [dateSuwMuwValue, setDateSuwMuwValue] = useState<any>(new Date())
  const [dateVcdcValue, setDateVcdcValue] = useState<any>(new Date())
  const [dateLbwValue, setDateLbwValue] = useState<any>(new Date())
  const [dateBalaValue, setDateBalaValue] = useState<any>(new Date())
  const [dateToiletValue, setDateToiletValue] = useState<any>(new Date())
  const [dateWomenHbBmiValue, setDateWomenHbBmiValue] = useState<any>(new Date())
  const [dateKishoriValue, setDateKishoriValue] = useState<any>(new Date())
  const [dateBirthRateValue, setDateBirthRateValue] = useState<any>(new Date())
  const [dateHealthCheckupValue, setDateHealthCheckupValue] = useState<any>(new Date())
  const [dateAdharValue, setDateAdharValue] = useState<any>(new Date())
  const [isOpenWarninigModal, setIsOpenWarninigModal] = useState<boolean>(false)
  const toast = useToast()

  /* Set MaximumDate to CurrentDate */
  const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() - 1
    const day = currentDate.getDate()
    return new Date(year, month, day)
  }
  /* PSE Report Create  */
  const pseArray = ["three_to_four", "four_to_five", "five_to_six"]
  const getPse = async () => {
    const {
      result: { data: { data: [pseData] = [], status = 204 } = {} },
    } = await ReportShowApi.getPSEReport(
      useData?.anganwadi_id,
      dateFormatRequiredType(new Date(), "YYYY-MM"),
    )
    if (status == 200) {
      setPseStatus(status)
      pseArray.forEach((element) => {
        pseSetValue(element, pseData[element])
      })
      setDateValue(pseData?.year_month)
    }
  }

  const closeToTheWarningModal = () => {
    setIsOpenWarninigModal(false)
  }

  const openWarningModal = () => {
    setIsOpenWarninigModal(true)
  }
  useEffect(() => {
    if (!useData) return
    getPse()
  }, [useData])
  const {
    control: PSEControl,
    handleSubmit: PSEHandleSubmit,
    setValue: pseSetValue,
    reset: pseReset,
    formState: { errors: PSEErrors },
  } = useForm()
  const exectutePSEApi = async () => {
    closeToTheWarningModal()
    setIsLoadingPse(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitPSEReport(deliverToJsonData)
    setPseStatus(status)
    if (status == 200) {
      setDeliverToJsonData(null)
      setIsLoadingPse(false)
      toastShow(
        toast,
        "पुर्व शालेय शि.घेत असलेल्या लाभार्थ्यांचा अहवाल सादर केला आहे",
        "top",
        "#bdfcbd",
      )
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }

  const onSubmitPSEData = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(datePseValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Birth Rate Report Create */
  const birthRateArray = ["girls", "boys"]
  const getBirthRateReport = async () => {
    const { result: { data: { data: [birthRateData] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getBirthRateReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    setBirthRateStatus(status)
    if (status == 200) {
      birthRateArray.forEach((element) => {
        birthRateValue(element, birthRateData[element])
      })
      setDateValue(birthRateData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getBirthRateReport()
    // console.log(dateFormatRequiredType(new Date(), "YYYY-MM"), "month format")
  }, [useData])
  const {
    control: BirthRateControl,
    handleSubmit: BirthRateHandleSubmit,
    setValue: birthRateValue,
    reset: birthRateeReset,
    formState: { errors: birthRateError },
  } = useForm()

  const executeBirthRateApi = async () => {
    closeToTheWarningModal()
    setIsLoadingBirthrate(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitBirthRateReport(deliverToJsonData)
    setBirthRateStatus(status)
    if (status == 200) {
      setIsLoadingBirthrate(false)
      toastShow(toast, "जन्मदर अहवाल यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
      navigate("MonthlyReport")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitBirthRateData = async (formData: any) => {
    setIsLoadingBirthrate(true)
    const jsonData = {
      year_month: dateFormatRequiredType(dateBirthRateValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }
  /* LBW Report Create */
  const lbwReportArray = ["total_weighted", "less_weighted"]
  const getLbw = async () => {
    const { result: { data: { data: [lbwData] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getLBWReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    setLbwStatus(status)
    if (status == 200) {
      lbwReportArray.forEach((element) => {
        lbwSetValue(element, lbwData[element])
      })
      setDateValue(lbwData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getLbw()
  }, [useData])
  const {
    control: LBWControl,
    handleSubmit: LBWHandleSubmit,
    setValue: lbwSetValue,
    reset: lbwReset,
    formState: { errors: lbwError },
  } = useForm()

  const executeLbwApi = async () => {
    closeToTheWarningModal()
    setIsLoadingLbw(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitLBWReport(deliverToJsonData)
    setLbwStatus(status)
    if (status == 200) {
      setIsLoadingLbw(false)
      toastShow(toast, "LBW रिपोर्ट यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitLBWData = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateLbwValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* HB Info for women and kids Create  */
  const hbInfoArray = [
    "pregnent_women_count",
    "hb_checked_count",
    "less_hb_count",
    "hb_checked_kids",
    "less_hb_kids",
  ]
  const getHbBmiInfo = async () => {
    const { result: { data: { data: [hbInfoData] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getHBinfoReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )

    setHbStatus(status)
    if (status == 200) {
      hbInfoArray.forEach((element) => {
        hbSetValue(element, hbInfoData[element])
      })
      setDateValue(useData?.year_month)
    }
    // console.log(status, "+++___+/////")
  }
  useEffect(() => {
    if (!useData) return
    getHbBmiInfo()
  }, [useData])
  const {
    control: HBControl,
    handleSubmit: HBHandleSubmit,
    setValue: hbSetValue,
    reset: hbReset,
    formState: { errors: hbStateError },
  } = useForm()

  const executeHBApi = async () => {
    closeToTheWarningModal()
    setIsLoadingHb(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitHBOInfoReport(deliverToJsonData)
    setHbStatus(status)
    if (status == 200) {
      setIsLoadingHb(false)
      toastShow(toast, "HB /BMI अहवाल यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitHBData = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateWomenHbBmiValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }

    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Final Health Checkup Create */
  const HealthReportArray = [
    "zero_three_beneficiary",
    "three_six_beneficiary",
    "zero_three_tested",
    "three_six_tested",
    "pregnent_women",
    "tested_pregnent_women",
    "bresfeeding_women",
    "tested_brestfeeding_women",
  ]
  const getHealthReport = async () => {
    const { result: { data: { data: [healthData] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getFinalHealthReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    setHealthStatus(status)
    if (status == 200) {
      HealthReportArray.forEach((element) => {
        HealthSetValue(element, healthData[element])
      })
      setDateValue(healthData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    // console.log(dateFormatRequiredType(new Date(), "YYYY-MM"), "month format")
    getHealthReport()
  }, [useData])
  const {
    control: HealthControl,
    handleSubmit: HealthHandleSubmit,
    setValue: HealthSetValue,
    reset: finalHealthCheckupReset,
    formState: { errors: finalHealthError },
  } = useForm()
  const executeFinalHealthCheckup = async () => {
    closeToTheWarningModal()
    setIsLoadingHC(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitFinalHealthReport(deliverToJsonData)
    setHealthStatus(status)
    if (status == 200) {
      setIsLoadingHC(false)
      toastShow(toast, "आरोग्य तपासणी अहवाल यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitHealthCheckup = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateHealthCheckupValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Shauchalay Bandhkam Durusti */
  const ShauchalayArray = [
    "is_anganwadi_with_toilets",
    "anganwadi_with_toilets",
    "is_anganwadi_with_unrepaired_toilets",
    "anganwadi_unrepaired_toilets",
    "is_fifteen_ayog_new_toilets",
    "fifteen_ayog_new_toilets",
    "is_fifteen_ayog_completed_toilets",
    "fifteen_ayog_completed_toilets",
  ]
  const getShauchalayReport = async () => {
    const { result: { data: { data: [shauchalayData = ""] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getShaucalayReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    setShauchalayStatus(status)
    if (status == 200) {
      ShauchalayArray.forEach((element) => {
        ToiletSetValue(element, shauchalayData[element])
      })
      setDateValue(useData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getShauchalayReport()
  }, [useData])
  const {
    control: ToiletControl,
    handleSubmit: ToiletHandleSubmit,
    reset: toiletReset,
    setValue: ToiletSetValue,
    formState: { errors: toiletError },
  } = useForm()

  const executeToiletApi = async () => {
    closeToTheWarningModal()
    setIsLoadingToilet(true)
    const {
      result: { data: { data = {}, status = 204 } = {} },
    } = await ReportApi.submitShauchalayReport(deliverToJsonData)
    // console.log("SHAUCHALAY ============='''", data, status)
    setShauchalayStatus(status)
    if (status == 200) {
      setIsLoadingToilet(false)
      toastShow(
        toast,
        "शौचालय बांधकाम व दुरुस्ती अहवाल यशस्वीरित्या सादर केला आहे",
        "top",
        "#bdfcbd",
      )
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitShauchalayBandhkam = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateToiletValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    // console.log("SHAUCHALAY DATAA", jsonData)
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Baal Aadhar Nondani Create */
  const AadharReportArray = [
    "total_kids",
    "registered_kids",
    "pregnent_womens",
    "registered_pregnent_womens",
    "breastfeeding_womens",
    "registered_breastfeeding_women",
  ]
  const getAadharReport = async () => {
    const {
      result: {
        data: { data: [AadharData = ""] = [], status = 204 },
      },
    } = await ReportShowApi.getAadharReport(
      useData?.anganwadi_id,
      dateFormatRequiredType(new Date(), "YYYY-MM"),
    )
    setAdharStatus(status)
    if (status == 200) {
      AadharReportArray.forEach((element) => {
        AdharSetValue(element, AadharData[element])
      })
      setDateValue(AadharData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getAadharReport()
  }, [useData])

  const {
    control: AdharControl,
    handleSubmit: AdharHandleSubmit,
    reset: adharReset,
    setValue: AdharSetValue,
    formState: { errors: adharHandleError },
  } = useForm()
  const resetAdharFormData = {}
  const executeAdharApi = async () => {
    closeToTheWarningModal()
    setIsLoading(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitAadharReport(deliverToJsonData)
    setAdharStatus(status)
    if (status == 200) {
      setIsLoading(false)
      toastShow(toast, "आधार नोंदणी अहवाल यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitAdharReport = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateAdharValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Kishori HB BMI create */
  const kishoriReportArray = [
    "total_girls",
    "hb_tested_girls",
    "less_than_seven_hb_girls",
    "iron_injections_taking",
    "hb_less_than_eleven",
    "hb_greater_than_eleven",
    "ifa_tablets_taking",
    "checkup_done",
    "low_bmi",
    "adopted_total",
  ]
  const getkishoriReport = async () => {
    const { result: { data: { data: [kishoriData = ""] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getHBBMIKishori(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    setKishoriStatus(status)
    if (status == 200) {
      kishoriReportArray.forEach((element) => {
        kishoriSetValue(element, kishoriData[element])
      })
      setDateValue(kishoriData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getkishoriReport()
  }, [useData])
  const {
    control: KishoriControl,
    handleSubmit: KishoriHandleSubmit,
    setValue: kishoriSetValue,
    reset: kishorReset,
    formState: { errors: kishorError },
  } = useForm()

  const executeKishorApi = async () => {
    closeToTheWarningModal()
    setIsLoadingKishori(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitHBBMIKishori(deliverToJsonData)
    setKishoriStatus(status)
    if (status == 200) {
      setIsLoadingKishori(false)
      toastShow(toast, "किशोरी HB /BMI अहवाल यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitKishoriReport = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateKishoriValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Suw Muw Create */
  const SuwMuwArray = ["muw", "suw", "sam", "mam"]
  const getSuwMuwReport = async () => {
    const { result: { data: { data: [suwMuwData = ""] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getSuwMuwReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    setSuwMuwStatus(status)
    if (status == 200) {
      SuwMuwArray.forEach((element) => {
        suwMuwSetValue(element, suwMuwData[element])
      })
      setDateValue(useData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getSuwMuwReport()
  }, [useData])
  const {
    control: SuwMuwControl,
    handleSubmit: SuwMuwHandleSubmit,
    setValue: suwMuwSetValue,
    reset: suwMuwReset,
    formState: { errors: suwMuwError },
  } = useForm()

  const executeSuwMuwApi = async () => {
    closeToTheWarningModal()
    setIsLoadingSuwMuw(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitSuwMuwReport(deliverToJsonData)
    setSuwMuwStatus(status)
    if (status == 200) {
      setIsLoadingSuwMuw(false)
      toastShow(toast, "SUW MUW रिपोर्ट यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitSuwMuw = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateSuwMuwValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Bala Report Create */
  const balaReportArray = ["is_anganwadi_bala_type", "is_bala_working"]
  const {
    control: BalaControl,
    handleSubmit: BalaHandleSubmit,
    setValue: BalaSetValue,
    reset: balaReset,
    formState: { errors: balaError },
  } = useForm()
  const getBalaReport = async () => {
    const { result: { data: { data: [balaData = ""] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getBalaReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    // console.log("baladata", balaData, status)

    setBalaStatus(status)
    if (status == 200) {
      balaReportArray.forEach((element) => {
        BalaSetValue(element, balaData[element])
      })
      setDateValue(balaData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    // console.log(dateFormatRequiredType(new Date(), "YYYY-MM"), "month format")
    getBalaReport()
  }, [useData])

  const executeBalaApi = async () => {
    closeToTheWarningModal()
    setIsLoadingBala(true)
    const { result: { data: { data = {}, status = 204, message = "" } = {} } = {} } =
      await ReportApi.submitBalaReport(deliverToJsonData)

    setBalaStatus(status)
    if (status == 200) {
      setIsLoadingBala(false)
      toastShow(toast, "बाला रिपोर्ट यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitBalaReport = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateBalaValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* VCDC Report Create */
  const vcdcArray = [
    "total_sam",
    "gram_vikas",
    "sam_to_mam",
    "sam_to_normal",
    "vajanat_vadh",
    "vajanat_n_vadh",
    "remaining_sam",
    "nrc_sam",
    "durdhar_aajari_sam",
    "zero_six_sam",
    "niyojit_gram_balvikas_no",
  ]
  const getVcdcReport = async () => {
    const { result: { data: { data: [vcdcData = ""] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getVcdcReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )

    setVcdcStatus(status)
    if (status == 200) {
      vcdcArray.forEach((element) => {
        vcdcSetValue(element, vcdcData[element])
      })
      setDateValue(useData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getVcdcReport()
  }, [useData])
  const {
    control: VCDCControl,
    handleSubmit: VCDCHandleSubmit,
    setValue: vcdcSetValue,
    reset: vcdcReset,
    formState: { errors: vcdcError },
  } = useForm()

  const executevcdcApi = async () => {
    closeToTheWarningModal()
    setIsLoadingVcdc(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitVCDCReport(deliverToJsonData)
    setVcdcStatus(status)
    if (status == 200) {
      setIsLoadingVcdc(false)
      toastShow(toast, "VCDC रिपोर्ट यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitVCDCReport = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateVcdcValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }

  /* Final Gradation Report (Nutritional Status) Create */
  const NutritionReportArray = [
    "zero_to_six_agegroup",
    "total_weighted",
    "normal_weighted",
    "less_weighted",
    "over_weighted",
    "SAM",
    "MAM",
  ]
  const getNutritionReport = async () => {
    const { result: { data: { data: [nutritionData = {}] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getNutritionReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )

    if (status == 200) {
      setNutritionStatus(status)
      NutritionReportArray.forEach((element) => {
        nutritionSetValue(element, nutritionData[element])
      })
      setDateValue(nutritionData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getNutritionReport()
  }, [useData])
  const {
    control: NutritionControl,
    handleSubmit: NutritionHandleSubmit,
    setValue: nutritionSetValue,
    reset: nutritionReset,
    formState: { errors: nutritionsError },
  } = useForm()

  const executeNutritionApi = async () => {
    closeToTheWarningModal()
    setIsLoadingNutrition(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitNutritionalReport(deliverToJsonData)
    setNutritionStatus(status)
    if (status == 200) {
      setIsLoadingNutrition(false)
      toastShow(toast, "पोषणस्थिती अहवाल यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitNutritionReport = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateFGValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }
    setDeliverToJsonData(jsonData)
    openWarningModal()
  }
  /* Sam Mam Report Create */
  const SamMamArray = [
    "is_sam",
    "sam_last_month",
    "sam_to_mam",
    "sam_to_normal",
    "weight_gained",
    "weight_not_gained",
    "new_sam",
    "is_mam",
    "last_month_mam",
    "mam_to_normal",
    "weight_gained_mam",
    "weight_not_gained_mam",
    "total_sam_to_mam",
  ]
  const getSamMamReport = async () => {
    const { result: { data: { data: [SamMamData = []] = [], status = 204 } = {} } = {} } =
      await ReportShowApi.getSamMamReport(
        useData?.anganwadi_id,
        dateFormatRequiredType(new Date(), "YYYY-MM"),
      )
    setSamMamStatus(status)
    if (status == 200) {
      SamMamArray.forEach((element) => {
        setSamMamValue(element, SamMamData[element])
      })
      setDateValue(SamMamData?.year_month)
    }
  }
  useEffect(() => {
    if (!useData) return
    getSamMamReport()
  }, [useData])
  const {
    control: SamMamControl,
    handleSubmit: SamMamHandleSubmit,
    setValue: setSamMamValue,
    reset: samMamReset,
    formState: { errors: samMamError },
  } = useForm()

  const executeSamMamApi = async () => {
    closeToTheWarningModal()
    setIsLoadingSamMam(true)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await ReportApi.submitSamMamReport(deliverToJsonData)
    setSamMamStatus(status)
    if (status == 200) {
      setIsLoadingSamMam(false)
      toastShow(toast, "अहवाल यशस्वीरित्या सादर केला आहे", "top", "#bdfcbd")
      navigate("MonthlyReport")
    } else if (status == 203) {
      toastShow(toast, "या महिन्याचा डेटा आधीच सबमिट केला आहे", "top", "#fab4b4")
    } else {
      toastShow(
        toast,
        "डेटा फक्त महिन्याच्या 1 ते 5 तारखेदरम्यान टाकला जाऊ शकतो",
        "top",
        "gray.400",
      )
    }
  }
  const onSubmitSamMam = async (formData: any) => {
    const jsonData = {
      year_month: dateFormatRequiredType(dateSamMamValue, "YYYY-MM"),
      anganwadi_id: useData?.anganwadi_id,
      ...formData,
    }

    setDeliverToJsonData(jsonData)
    openWarningModal()
  }
  const callBackdateSet = useCallback((date: any) => {
    setDateValue(date)
  }, [])
  const callBackPsedateSet = useCallback((date: any) => {
    setDatePseValue(date)
  }, [])
  const callBackFGdateSet = useCallback((date: any) => {
    setDateFGValue(date)
  }, [])
  const callBackSamMamdateSet = useCallback((date: any) => {
    setDateSamMamValue(date)
  }, [])
  const callBackSuwMuwdateSet = useCallback((date: any) => {
    setDateSuwMuwValue(date)
  }, [])
  const callBackVcdcdateSet = useCallback((date: any) => {
    setDateVcdcValue(date)
  }, [])
  const callBackLbwdateSet = useCallback((date: any) => {
    setDateLbwValue(date)
  }, [])
  const callBackBaladateSet = useCallback((date: any) => {
    setDateBalaValue(date)
  }, [])
  const callBackToiletdateSet = useCallback((date: any) => {
    setDateToiletValue(date)
  }, [])
  const callBackWomenHbBmidateSet = useCallback((date: any) => {
    setDateWomenHbBmiValue(date)
  }, [])
  const callBackKishoridateSet = useCallback((date: any) => {
    setDateKishoriValue(date)
  }, [])
  const callBackBirthRatedateSet = useCallback((date: any) => {
    setDateBirthRateValue(date)
  }, [])
  const callBackHealthCheckupdateSet = useCallback((date: any) => {
    setDateHealthCheckupValue(date)
  }, [])
  const callBackAdhardateSet = useCallback((date: any) => {
    setDateAdharValue(date)
  }, [])
  const value: ReportContextInterface = {
    isLoading,
    onSubmitPSEData,
    PSEHandleSubmit,
    PSEControl,
    onSubmitBirthRateData,
    BirthRateHandleSubmit,
    BirthRateControl,
    LBWControl,
    LBWHandleSubmit,
    onSubmitLBWData,
    HBControl,
    HBHandleSubmit,
    onSubmitHBData,
    HealthControl,
    HealthHandleSubmit,
    onSubmitHealthCheckup,
    callBackdateSet,
    dateValue,
    ToiletControl,
    ToiletHandleSubmit,
    onSubmitShauchalayBandhkam,
    AdharControl,
    AdharHandleSubmit,
    onSubmitAdharReport,
    KishoriControl,
    KishoriHandleSubmit,
    onSubmitKishoriReport,
    SuwMuwControl,
    SuwMuwHandleSubmit,
    onSubmitSuwMuw,
    BalaControl,
    BalaHandleSubmit,
    onSubmitBalaReport,
    SamMamControl,
    SamMamHandleSubmit,
    onSubmitSamMam,
    VCDCControl,
    VCDCHandleSubmit,
    onSubmitVCDCReport,
    NutritionControl,
    NutritionHandleSubmit,
    onSubmitNutritionReport,
    birthRateStatus,
    hbStatus,
    pseStatus,
    adharStatus,
    lbwStatus,
    healthStatus,
    shauchalayStatus,
    kishoriStatus,
    suwMuwStatus,
    balaStatus,
    vcdcStatus,
    nutritionStatus,
    samMamStatus,
    datePseValue,
    dateFGValue,
    callBackPsedateSet,
    callBackFGdateSet,
    dateSamMamValue,
    dateSuwMuwValue,
    callBackSuwMuwdateSet,
    callBackSamMamdateSet,
    dateVcdcValue,
    callBackVcdcdateSet,
    dateLbwValue,
    callBackLbwdateSet,
    dateBalaValue,
    callBackBaladateSet,
    dateToiletValue,
    callBackToiletdateSet,
    dateWomenHbBmiValue,
    callBackWomenHbBmidateSet,
    dateKishoriValue,
    callBackKishoridateSet,
    dateBirthRateValue,
    callBackBirthRatedateSet,
    dateHealthCheckupValue,
    callBackHealthCheckupdateSet,
    dateAdharValue,
    callBackAdhardateSet,
    isLoadingPse,
    isLoadingNutrition,
    isLoadingSamMam,
    isLoadingSuwNMuW,
    isLoadingVcdc,
    isLoadingLbw,
    isLoadingBala,
    isLoadingToilet,
    isLoadingHb,
    isLoadingKishori,
    isLoadingBirthrate,
    isLoadingHC,
    getCurrentDate,
    isOpenWarninigModal,
    closeToTheWarningModal,
    openWarningModal,
    adharHandleError,
    exectutePSEApi,
    executeAdharApi,
    PSEErrors,
    executeFinalHealthCheckup,
    finalHealthError,
    birthRateError,
    executeBirthRateApi,
    kishorError,
    executeKishorApi,
    hbStateError,
    executeHBApi,
    toiletError,
    executeToiletApi,
    balaError,
    executeBalaApi,
    lbwError,
    executeLbwApi,
    vcdcError,
    executevcdcApi,
    suwMuwError,
    executeSuwMuwApi,
    samMamError,
    executeSamMamApi,
    nutritionsError,
    executeNutritionApi,
    nutritionReset,
    birthRateeReset,
    pseReset,
    samMamReset,
    suwMuwReset,
    vcdcReset,
    lbwReset,
    balaReset,
    toiletReset,
    hbReset,
    kishorReset,
    finalHealthCheckupReset,
    adharReset,
  }

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
}

export const useReportContext = () => {
  const context = useContext(ReportContext)
  if (!context) {
    throw new Error("useReportContext must be used within a ReportContextProvider component")
  }
  return context
}
