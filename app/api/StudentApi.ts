import { Get, Post, Delete, Patch } from "./AxiosRequester"

export const StudentApi = {
  getList: async () => await Get<any>("/api_anganwadi/public/students/listAll"),
  get: async (studentID: number | string) =>
    await Get<any>(`/api_anganwadi/public/student/${studentID}`),
  getEvaluation: async (studentID: number | string) =>
    await Get<any>(`/api_anganwadi/public/getEvalType/${studentID}`),
  getListByAnganwadiID: async (anganwadiID: number | string) =>
    await Get<any>(`/api_anganwadi/public/anganwadi/getStudents/${anganwadiID}`),
  getOverAllSurvey: async (studentID: number | string) =>
    await Get<any>(`/api_anganwadi/public/getallResults/${studentID}`),
  getStudentsOfPerticularAnganwadi: async (anganwadiId: number | string) =>
    await Get<any>(`/api_anganwadi/public/anganwadi/getStudents/${anganwadiId}`),
  createStudent: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/student/create`, jsonData)
  },
  deleteStudent: async (id: number | string) =>
    await Delete<any>(`/api_anganwadi/public/student/delete/${id}`),
  updateStudent: async (studentID: string | number, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/student/update/${studentID}`, jsonData),
  getPerticularStudent: async (studentID: number | string) => {
    return await Get<any>(`/api_anganwadi/public/student/${studentID}`)
  },
}
