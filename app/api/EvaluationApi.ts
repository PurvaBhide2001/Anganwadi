import { Get, Post } from "./AxiosRequester";

export const EvaluationApi={
    create:async(json:any)=>await Post<any>("/api_anganwadi/public/result/create",json),
    getAll:async(studentID:number|string)=>await Get<any>(`/api_anganwadi/public/student/getallResults/${studentID}`)
} 