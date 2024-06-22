import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react"
import { navigate } from "../navigators"
import { useLoginContext } from "./LoginContext"
import { MeetingApi } from "../api/MeetingApi"

interface MeetingContextInterface {
  meetingColorObjArray: any[]
  onPressToViewParticularDetail: Function
  onPressToViewPastParticularDetail: Function
  particularMeetingInfo: any
  pastParticularMeetingInfo: any
  avatarImages: any[]
  meeting: any[]
  pastMeeting: any[]
  meetingStatus: any
  pastMeetingStatus: any
  onRefreshMeeting: Function
  refreshMeeting: boolean
}
const MeetingContext = createContext<null | MeetingContextInterface>(null)
type MeetingContextProps = { children: React.ReactNode }
export const MeetingContextProvider = ({ children }: MeetingContextProps) => {
  const { useData } = useLoginContext()
  const [meeting, setMeeting] = useState<any[]>([])
  const [meetingStatus, setMeetingStatus] = useState<any[]>([])
  const [pastMeeting, setPastMeeting] = useState<any[]>([])
  const [pastMeetingStatus, setPastMeetingStatus] = useState<any[]>([])
  const [refreshMeeting, setRefershMeeting] = useState<boolean>(false)
  const userData = useData?.id

  const getPastMeeting = useCallback(async () => {
    const {
      result: {
        data: { data, status },
      },
    } = await MeetingApi.getPast(useData?.id)
    setPastMeetingStatus(status)
    status === 204 && setPastMeeting([])
    status === 200 && setPastMeeting(data)
  }, [])
  const getCurrentMeeting = useCallback(async () => {
    const { result: { data: { data = [], status = 204 } = {} } = {} } = await MeetingApi.get(
      useData?.id,
    )
    setMeetingStatus(status)
    status === 204 && setMeeting([])

    status == 200 && setMeeting(data)
  }, [])
  useEffect(() => {
    ;(async () => {
      if (!useData) return
      await getCurrentMeeting()
    })()
  }, [useData?.id, 0])

  /* Past Meetings */
  useEffect(() => {
    ;(async () => {
      if (!useData) return
      await getPastMeeting()
    })()
  }, [useData?.id, 0])
  const onRefreshMeeting = useCallback(async () => {
    if (!useData) {
      return
    }
    setRefershMeeting(true)
    await getPastMeeting()
    await getCurrentMeeting()

    setTimeout(() => {
      setRefershMeeting(false)
    }, 2000)
  }, [])
  const [particularMeetingInfo, setParticularMeetingInfo] = useState<any>(null)
  const [pastParticularMeetingInfo, setPastParticularMeetingInfo] = useState<any>(null)
  const meetingColorObjArray = [
    {
      leftBorderColor: "#a9a4ff",
      backgroundColor: "#efefff",
    },
    {
      leftBorderColor: "#fe6e6e",
      backgroundColor: "#fef1f2",
    },
    {
      leftBorderColor: "#26c9d9",
      backgroundColor: "#e5f8f8",
    },
    {
      leftBorderColor: "#fd9d29",
      backgroundColor: "#fcf1e4",
    },
  ]
  const [avatarImages] = useState<any[]>([
    require("./../../assets/meetingIcon/indian-man.png"),
    require("./../../assets/meetingIcon/man.png"),
    require("./../../assets/meetingIcon/indian.png"),
    require("./../../assets/meetingIcon/indian-woman.png"),
    require("./../../assets/meetingIcon/indian2.png"),
  ])

  const onPressToViewParticularDetail = (item: any) => {
    setParticularMeetingInfo(item)
    navigate("MeetingDetailShow")
  }
  const onPressToViewPastParticularDetail = (item: any) => {
    setPastParticularMeetingInfo(item)
    navigate("PastMeetingDetailShow")
  }

  const value: MeetingContextInterface = {
    meetingColorObjArray,
    onPressToViewParticularDetail,
    particularMeetingInfo,
    avatarImages,
    meeting,
    pastMeeting,
    meetingStatus,
    pastMeetingStatus,
    onPressToViewPastParticularDetail,
    pastParticularMeetingInfo,
    onRefreshMeeting,
    refreshMeeting,
  }
  return <MeetingContext.Provider value={value}>{children}</MeetingContext.Provider>
}
export const useMeetingContextContext = () => {
  const context = useContext(MeetingContext)
  if (!context) throw Error("use MeetingContext in  MeetingContext screen context provider!!")
  return context
}
