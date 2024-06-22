import { Get, Post } from "./AxiosRequester";

export const QuestionApi={
    get:async(studentID:number|string)=>await Get<any>(`/api_anganwadi/public/loadQuestions/${studentID}`),
    createResult:async(jsonData:any)=>await Post<any>('/api_anganwadi/public/result/create',jsonData)
}