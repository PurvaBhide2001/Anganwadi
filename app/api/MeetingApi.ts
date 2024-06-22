import { Get } from "./AxiosRequester"

export const MeetingApi = {
  get: async (userId: number | string) => {
    return await Get<any>(`/api_anganwadi/public/Meeting/upcomingMeetings/${userId}/0`)
    // return Get<any>(`/api_anganwadi/public/Meeting/listAll`)
  },
  getPast: async (userId: number | string) => {
    return await Get<any>(`/api_anganwadi/public/Meeting/pastMeetings/${userId}/0`)
    // return Get<any>(`/api_anganwadi/public/Meeting/listAll`)
  },
  particularMeeting: async (meetingID: number | string) =>
    Get(`/api_anganwadi/public/Meeting/show/${meetingID}`),
  particularPastMeeting: async (meetingID: number | string) =>
    Get(`/api_anganwadi/public/Meeting/showPastMeetings/${meetingID}`),
}
