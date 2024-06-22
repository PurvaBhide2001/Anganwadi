import { Box, Text, useToast } from "native-base"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { yupResolver } from "@hookform/resolvers/yup"
import crashlytics from "@react-native-firebase/crashlytics"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { AngamwadiProfileApi, AnganwadiApi } from "../api/AnganwadiApi"
import { ListAllApi } from "../api/ListAllApi"
import { MeetingApi } from "../api/MeetingApi"
import { StudentApi } from "../api/StudentApi"
import { UserApi } from "../api/UserApi"
import { navigate } from "../navigators"
import { useNetInfo } from "@react-native-community/netinfo"
import * as yup from "yup"
import { asyncDataStoreGetItem, asyncDataStoreSetItem } from "../filter/asyncstorageOperation"
import { notTOShowScheme, schemeAPJShow } from "../../assets/constant/commanConstant"
import ContactNumberComponent from "../screens/User/ContactNumberComponent"
import OTPRecieveComponent from "../screens/User/OTPRecieveComponent"
import NewPassword from "../screens/User/NewPassword"
import { useMainMenuContext } from "./MainMenuContext"
interface LoginContextInterface {
  control: any
  handleSubmit: Function
  studentList: any[]
  onSubmit: Function
  toastShow: Function
  useData: any
  setUserData: Function
  isLogin: boolean
  setIsLogin: Function
  anganwadiList: any[]
  schemeList: any[]
  mainAnganvadiSuvidhaTypesArray: any[]
  isExistSmartAnganwadi: boolean
  setIsExistSmartAnganwadi: Function
  meetingList: any[]
  addedPlayingToysArray: any[]
  getPlayingToys: Function
  anganwadiSuvidhaListIssueByMonth: any[]

  errors: any
  validateNumber: Function
  isShowOTP: boolean
  isShowPasswordField: boolean
  onClickToGetOTP: Function
  setContactNumber: Function
  ForgetPasswordControl: any
  ForgetPasswordHandleSubmit: Function
  ForgetPasswordError: any
  setOtp: Function
  onClickToSubmitOTP: Function
  setFirstPin: Function
  setSecondPin: Function
  isVerifiedPin: boolean
  onFillMpin: Function
  onClickToSubmitNewMPIN: Function
  status: any
  componentsForgetPassword: any
  indexNumberOfForgetPassword: number
  setIndexNumberOfForgetPassword: Function
  setAnganwadSmartSatus: Function
  anganwadSmartSatus: string
  usernewDataSet: Function
  getListServiceIssuesByMonth: Function
  getSchemeList: Function
  onRefresh: Function
  refereshing: boolean
}
const LoginContext = createContext<null | LoginContextInterface>(null)

type loginContextProps = { children: React.ReactNode }

export const LoginContextProvider = ({ children }: loginContextProps) => {
  const validateNumber = (value: string) => {
    const matches = value.match(/^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/)
    return matches?.length > 0 || "Not a Number"
  }

  const loginScheme2 = yup.object().shape({
    contact_no: yup
      .string()
      .min(10, "कृपया १० अंकी नंबर वापरा")
      .max(10, "कृपया १० अंकी नंबर वापरा")
      .required("कृपया १० अंकी नंबर वापरा"),
  })

  type ValidationSchema = {
    contact_no: string
    mpin: string
  }
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(loginScheme2), mode: "onChange" })
  const {
    control: ForgetPasswordControl,
    handleSubmit: ForgetPasswordHandleSubmit,
    formState: { errors: ForgetPasswordError },
  } = useForm({ resolver: yupResolver(loginScheme2), mode: "onChange" })
  const [studentList, setStudentList] = useState<any[]>([])
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [useData, setUserData] = useState<any>(null)
  const [anganwadiList, setAnganwadiList] = useState<any[]>([])
  const [schemeList, setSchemeList] = useState<any[]>([])
  const [meetingList, setMeetingList] = useState<any[]>([])
  const [anganwadSmartSatus, setAnganwadSmartSatus] = useState<string>("0")
  const [isExistSmartAnganwadi, setIsExistSmartAnganwadi] = useState<boolean>(true)
  const [addedPlayingToysArray, setAddedPlayingToysArray] = useState<any[]>([])
  const [anganwadiSuvidhaListIssueByMonth, setAnganwadiSuvidhaListIssueByMonth] = useState<any[]>(
    [],
  )

  /**
   *
   */
  const [indexNumberOfForgetPassword, setIndexNumberOfForgetPassword] = useState<number>(0)
  const [status, setStatus] = useState<any>()
  const [isShowPasswordField, setIsShowPasswordField] = useState<boolean>(false)
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false)
  const [contactNumber, setContactNumber] = useState<string>("")
  const [otp, setOtp] = useState<any>("")
  const [firstPin, setFirstPin] = useState<string>("")
  const [secondPin, setSecondPin] = useState<string>("")
  const netInfo = useNetInfo()
  // const [prakalpa, setPrakalpaList] = useState<any[]>()
  const [isVerifiedPin, setIsVerifiedPin] = useState<boolean>(false)
  const [mainAnganvadiSuvidhaTypesArray, setMainAnganvadiSuvidhaTypesArray] = useState<any[]>([])
  const [refereshing, setRefreshing] = useState<boolean>(false)
  const { getImportantLinks } = useMainMenuContext()
  const onRefresh = useCallback(async () => {
    if (!useData) {
      return
    }
    setRefreshing(true)
    await getSchemeList(useData)
    await getStudents(useData?.anganwadi_id)
    await getMeeting(useData)
    await getImportantLinks()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [useData])

  const getQuestionSmartStatus = async (anganwadi_id: number | string) => {
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await AngamwadiProfileApi.showSmartAnganwadi(anganwadi_id)
    console.log("anganwadi smart  status", status)
    if (status == 200) {
      setAnganwadSmartSatus(data?.status)
      setIsExistSmartAnganwadi(true)
    } else {
      setIsExistSmartAnganwadi(false)
      setAnganwadSmartSatus("0")
    }
  }

  const componentsForgetPassword = [ContactNumberComponent, OTPRecieveComponent, NewPassword]
  const toast = useToast()
  const toastShow = (toast: any, message: string, placement: any, bgColor?: string) => {
    toast.show({
      render: () => {
        return (
          <Box
            bg={bgColor ? bgColor : "#bdfcbd"}
            px="1"
            py="1"
            height={responsiveHeight(7)}
            width={responsiveWidth(95)}
            rounded="sm"
            mb={5}
            flex={1}
            alignItems="center"
            justifyContent="center"
            borderRadius={responsiveWidth(2)}
            style={{ marginTop: 30 }}
          >
            <Text fontSize={responsiveFontSize(2)} color="warmGray.700" fontWeight={600}>
              {message}
            </Text>
          </Box>
        )
      },
      placement: placement,
    })
  }
  const getListServiceIssuesByMonth = async (anganwadi_id: number | string) => {
    const { result: { data: { data = [], status = 204 } = {} } = {} } =
      await AnganwadiApi.getServicesesListByMonth(anganwadi_id)
    setStatus(status)

    if (status == 200) {
      setAnganwadiSuvidhaListIssueByMonth(data)
      await asyncDataStoreSetItem("ListServiceIssuesByMonth", data)
    } else {
      setAnganwadiSuvidhaListIssueByMonth([])
      await asyncDataStoreSetItem("ListServiceIssuesByMonth", [])
    }
  }

  const getPlayingToys = async (anganwadi_id: number | string) => {
    const { result: { data: { data = [], status = 204 } = {} } = {} } =
      await AnganwadiApi.getPlayingToys(anganwadi_id)

    status == 204 && setAddedPlayingToysArray([])
    if (status == 200) {
      status == 200 && setAddedPlayingToysArray(data)
      await asyncDataStoreSetItem("playToyList", data)
    }
  }

  const getSchemeList = async (responseData) => {
    const { result: { data: { data = [] } = {} } = {} } = await AnganwadiApi.getSchemes()
    console.log("schem list ", data.length)

    if (schemeAPJShow.includes(responseData?.prakalpa_id)) {
      setSchemeList(data)
      await asyncDataStoreSetItem("schemeList", data)
    } else {
      const filterData = data.filter((item: any) => !notTOShowScheme.includes(Number(item.id)))
      setSchemeList(filterData)
      await asyncDataStoreSetItem("schemeList", filterData)
    }
  }

  const getMeeting = async (responseData: any) => {
    const { result: { data: { data = [] } = {} } = {} } = await MeetingApi.get(responseData?.id)

    await asyncDataStoreSetItem("meetingList", data)
    setMeetingList(data)
  }

  const getSuvidhaList = async () => {
    const { result: { data: { data = [] } = {} } = {} } = await AnganwadiApi.getSuvidhas()
    setMainAnganvadiSuvidhaTypesArray(data)

    await asyncDataStoreSetItem("suvidhaList", data)
  }
  const getAnganwadiList = async () => {
    const { result: { data: { data = [] } = {} } = {} } = await ListAllApi.getAnganwadiList()

    await asyncDataStoreSetItem("anganwadiList", data)
    setAnganwadiList(data)
  }

  const getStudents = async (anganwadi_id: number | string) => {
    const { result: { data: { data = [] } = {} } = {} } = await StudentApi.getListByAnganwadiID(
      anganwadi_id,
    )
    await asyncDataStoreSetItem("studentList", data)
    setStudentList(data)
  }
  const getAsyncData = async () => {
    const allPromises = await Promise.all([
      asyncDataStoreGetItem("suvidhaList"),
      asyncDataStoreGetItem("studentList"),
      asyncDataStoreGetItem("anganwadiList"),
      asyncDataStoreGetItem("meetingList"),
      asyncDataStoreGetItem("schemeList"),
      asyncDataStoreGetItem("playToyList"),
      asyncDataStoreGetItem("ListServiceIssuesByMonth"),
    ])

    setMainAnganvadiSuvidhaTypesArray(JSON.parse(allPromises[0]))
    setStudentList(JSON.parse(allPromises[1]))
    setAnganwadiList(JSON.parse(allPromises[2]))
    setMeetingList(JSON.parse(allPromises[3]))
    setSchemeList(JSON.parse(allPromises[4]))
    setAddedPlayingToysArray(JSON.parse(allPromises[5]))
    setAnganwadiSuvidhaListIssueByMonth(JSON.parse(allPromises[6]))
  }

  const getData = (responseData) => {
    getStudents(responseData?.anganwadi_id)
    // await getQuestionSmartStatus(responseData?.anganwadi_id)
    getAnganwadiList()
    getSuvidhaList()
    getSchemeList(responseData)
    getMeeting(responseData)
    getPlayingToys(responseData?.anganwadi_id)
    getQuestionSmartStatus(responseData?.anganwadi_id)
    getListServiceIssuesByMonth(responseData?.anganwadi_id)
  }

  const usernewDataSet = async (data: any) => {
    const newData = { ...useData, ...data }
    setUserData(newData)
    await asyncDataStoreSetItem("loginData", newData)
  }

  const loginApi = async (data: any) => {
    const { result: { data: { data: responseData = {} } = {}, status = 204 } = {} } =
      await UserApi.login(data)
    return { responseData, status }
  }
  const userOnceLogin = async () => {
    const asyncLoginData = JSON.parse(await asyncDataStoreGetItem("loginData"))
    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
      setUserData(asyncLoginData)
    } else {
      const { responseData, status } = await loginApi({
        contact_no: asyncLoginData?.contact_no,
        mpin: asyncLoginData?.mpin,
      })
      await asyncDataStoreSetItem("loginData", responseData)
      setUserData(responseData)
      getData(responseData)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const data = await asyncDataStoreGetItem("isLogin")
        const isLogin = JSON.parse(data)
        if (isLogin) {
          setIsLogin(isLogin)
          await userOnceLogin()
          setTimeout(() => navigate("MainMenu"), 1000)
        }
      } catch (error) {
        crashlytics().recordError(error)
        console.log(error)
      }
    })()
  }, [])

  const onSubmit = async (data: any) => {
    // crashlytics().crash()

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
      console.log("====================================")
      console.log("offline")
      console.log("====================================")
      const asyncLoginData = JSON.parse(await asyncDataStoreGetItem("loginData"))
      await getAsyncData()
      if (asyncLoginData?.contact_no == data.contact_no && asyncLoginData?.mpin == data.mpin) {
        setUserData(asyncLoginData)
        await getAsyncData()
        setIsLogin(true)

        navigate("MainMenu")
      } else {
        toastShow(toast, "कृपया तुमचा मोबाइल नंबर आणि पासवर्ड बरोबर टाका ", "top", "#fab4b4")
      }
    } else {
      try {
        const { responseData, status } = await loginApi(data)
        await Promise.all([
          crashlytics().setUserId(responseData?.id),
          crashlytics().setAttributes({
            contact_no: responseData.contact_no,
            username: `${responseData?.f_name} ${responseData?.l_name}`,
          }),
        ])
        crashlytics().log("User signed in.")
        if (status === 200 && responseData !== null) {
          await asyncDataStoreSetItem("loginData", responseData)
          setUserData(responseData)
          setIsLogin(true)
          await asyncDataStoreSetItem("isLogin", true)
          await getData(responseData)
          navigate("MainMenu")
          return
        } else {
          toastShow(toast, "कृपया तुमचा मोबाइल नंबर आणि पासवर्ड बरोबर टाका ", "top", "#fab4b4")
        }
      } catch (error: any) {
        crashlytics().recordError(error)
        console.log(error)
      }
    }
  }

  const onFillMpin = (pin: string) => {
    if (!firstPin) {
      toastShow(toast, "कृपया पिन टाका !!", "top", "#fab4b4")
    } else {
      setIsVerifiedPin(firstPin.includes(pin))
    }
  }
  const onClickToSubmitNewMPIN = async () => {
    const { result: { data: { data = {}, status = 204 } = {} } = {} } = await UserApi.updateMpin({
      contact_no: contactNumber,
      mpin: firstPin,
    })
    console.log("another data", data, status)
    if (status == 200) {
      // setIsShowPasswordField(false)
      // setIsShowOTP(false)
      setIndexNumberOfForgetPassword(0)
      navigate("LoginPage")
    }
  }
  const onClickToSubmitOTP = async () => {
    const {
      result: {
        data: { status, data },
      },
    } = await UserApi.resetMpin({ contact_no: contactNumber, otp: otp })
    console.log("this is get by otp submit response", data, status)
    // status == 200 && setIsShowPasswordField(true)
    status == 200 && setIndexNumberOfForgetPassword(2)
  }
  const onClickToGetOTP = async (data: any) => {
    setContactNumber(data?.contact_no)
    console.log("data for onlcik to otp", data)

    const {
      result: { data: responseData },
    } = await UserApi.forgotMpin(data)
    console.log("data", responseData)

    // responseData.status == 200 && setIsShowOTP(true)
    responseData.status == 200 && setIndexNumberOfForgetPassword(1)
  }

  const value: LoginContextInterface = {
    control,
    handleSubmit,
    useData,
    setUserData,
    onSubmit,
    toastShow,
    isLogin,
    setIsLogin,
    studentList,
    anganwadiList,
    mainAnganvadiSuvidhaTypesArray,
    schemeList,
    isExistSmartAnganwadi,
    setIsExistSmartAnganwadi,
    meetingList,
    addedPlayingToysArray,
    getPlayingToys,
    anganwadiSuvidhaListIssueByMonth,
    anganwadSmartSatus,
    errors,
    validateNumber,
    isShowOTP,
    isShowPasswordField,
    onClickToGetOTP,
    setContactNumber,
    ForgetPasswordControl,
    ForgetPasswordHandleSubmit,
    ForgetPasswordError,
    setOtp,
    onClickToSubmitOTP,
    setFirstPin,
    setSecondPin,
    isVerifiedPin,
    onFillMpin,
    onClickToSubmitNewMPIN,
    status,
    componentsForgetPassword,
    indexNumberOfForgetPassword,
    setIndexNumberOfForgetPassword,
    setAnganwadSmartSatus,
    usernewDataSet,
    getListServiceIssuesByMonth,
    getSchemeList,
    onRefresh,
    refereshing,
  }
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}

export const useLoginContext = () => {
  const context = useContext(LoginContext)
  if (!context) throw new Error("use login context use in login context provider")
  return context
}
