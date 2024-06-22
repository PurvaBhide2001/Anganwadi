import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { navigate } from "../navigators"
import { UserApi } from "../api/UserApi"
import { useLoginContext } from "./LoginContext"
import { getStateName } from "../filter/getStateName"
import crashlytics from "@react-native-firebase/crashlytics"
interface UserProfileContextInterface {
  control: any
  handleSubmit: Function
  watch: Function
  onSubmit: Function
  stateName: string
  onClickTOEditProfileAndSetData: Function
  testLog: Function
  errors: any
}
const UserProfileContext = createContext<null | UserProfileContextInterface>(null)

type UserProfileContextProps = { children: React.ReactNode }
const userProfileData = [
  "f_name",
  "m_name",
  "l_name",
  "anganwadi_code",
  "contact_no",
  "email",
  "anganwadi_name",
  "state",
  "district",
  "block",
  "village",
]
export const UserProfileContextProvider = ({ children }: UserProfileContextProps) => {
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { useData, setUserData } = useLoginContext()
  const [stateName, setStateName] = useState("")

  const testLog = () => {
    console.log("this is update console log -=-=-=-==-==-===-=-=-=-===-=-")
  }
  const onSubmit = async (data: any) => {
    console.log("====================================")
    console.log("data", data)
    console.log("====================================")
    const {
      result: {
        data: { data: response },
        status,
      },
    } = await UserApi.update(useData.id, data)
    if (status == 200) {
      console.log("====================================")
      console.log("user update response data", response)
      console.log("====================================")
      setUserData(response)
      setTimeout(() => navigate("ShowProfile"), 1000)
    }
  }

  const onClickTOEditProfileAndSetData = () => {
    console.log("this is for onclick to edit")
    try {
      userProfileData.forEach((key: string) => {
        setValue(key, useData[key])
      })
      setTimeout(() => navigate("EditProfile"), 900)
    } catch (error) {
      crashlytics().recordError(error)
    }
  }
  useEffect(() => {
    ;(async () => {
      if (useData?.state) {
        // const state = await getStateName(useData?.state)
        // state && setStateName(state)
      }
    })()
  }, [useData?.state])

  const value: UserProfileContextInterface = {
    control,
    handleSubmit,
    watch,
    onSubmit,
    stateName,
    onClickTOEditProfileAndSetData,
    testLog,
    errors,
  }
  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
}

export const useUserProfileContextContext = () => {
  const context = useContext(UserProfileContext)
  if (!context)
    throw Error("use UserProfileContext in  UserProfileContext screen context provider!!")
  return context
}
