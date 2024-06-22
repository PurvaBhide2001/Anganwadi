import { Get, Post } from "./AxiosRequester"

export const NipunBharatApi = {
  getExamCategoeries: async (studentID: number | string) =>
    await Get<any>(`/api_anganwadi/public/get_exam_list/${studentID}`),
  getExamQuestions: async (studentID: number | string, examCategoryID: number | string) =>
    await Get<any>(`/api_anganwadi/public/nipun_exam_detail/${studentID}/${examCategoryID}`),
  submitQuestionAnswer: async (jsonData: any) =>
    await Post<any>(`/api_anganwadi/public/nipun_exam_result/submit_result`, jsonData),
  getExistedExam: async (studentID: number | string, examCategoryID: number | string) =>
    await Get<any>(`/api_anganwadi/public/nipun_exam/get_result/${studentID}/${examCategoryID}`),
}
