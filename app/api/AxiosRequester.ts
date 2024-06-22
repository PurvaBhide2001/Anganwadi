import axios, { isCancel, AxiosError } from "axios"
import { FilterQueryParams } from "./Helpers"
import Response from "./Response"

export abstract class RequestDefaults {
  public static token: string = ""
  public static baseUrl: string = "https://kitintellect.tech"
  // public static baseUrl: string = "https://nvdj.in/dist/plant"
  // public static baseUrl: string = "https://kitintellect.com/api"

  public static version: string = ""
  public static changeToken(t: string) {
    RequestDefaults.token = t
  }

  public static changeBaseUrl(bu: string) {
    RequestDefaults.baseUrl = bu
  }
}

const parseError = (errText: string): Array<string | any> => {
  try {
    let err = JSON.parse(errText)
    return (err && err.error) || err || []
  } catch (e) {
    return []
  }
}
export const Get = async <T>(path: string, json?: any) => {
  let response: Response<T> = {}
  try {
    response.result = (await axios.get(`${RequestDefaults.baseUrl}${path}`, json)) as T
  } catch (e) {
    console.log("====================================")
    console.log("error in get", e)
    console.log("====================================")
    response.err = parseError(e.text)
    response.status = e.status
  }
  return response
}

export const Post = async <T>(path: string, json?: any) => {
  let response: Response<T> = {}
  try {
    response.result = (await axios.post(`${RequestDefaults.baseUrl}${path}`, json)) as T
  } catch (e: any) {
    console.log("====================================")
    console.log("error in post", e)
    console.log("====================================")
    response.err = parseError(e.text)
    response.status = e.status
  }
  return response
}

export const Login = async <T>(path: any, json?: any) => {
  let response: Response<T> = {}

  try {
    response.result = (await axios.post(`${RequestDefaults.baseUrl}${path}`, json)) as T
  } catch (e: any) {
    console.log("====================================")
    console.log("error in login", e)
    console.log("====================================")
    response.err = parseError(e.text)
    response.status = e.status
  }
  return response
}

export const Patch = async <T>(path: string, json?: any) => {
  let response: Response<T> = {}
  try {
    response.result = (await axios.patch(`${RequestDefaults.baseUrl}${path}`, json)) as T
  } catch (e: any) {
    console.log("====================================")
    console.log("error in patch", e)
    console.log("====================================")
    response.err = parseError(e.text)
    response.status = e.status
  }
  return response
}

export const Delete = async <T>(path: string, json?: any) => {
  let response: Response<T> = {}
  try {
    response.result = (await axios.delete(`${RequestDefaults.baseUrl}${path}`, json)) as T
  } catch (e: any) {
    console.log("====================================")
    console.log("error in delete", e)
    console.log("====================================")
    response.err = parseError(e.text)
    response.status = e.status
  }
  return response
}

export const UploadFile = async <T>(path: string, json?: any) => {
  let response: Response<T> = {}
  try {
    console.log("path", path, json)

    const formData = new FormData()
    formData.append("file", json)
    response.result = (await axios.post(`https://kitintellect.tech${path}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })) as T
  } catch (e: any) {
    console.log("====================================")
    console.log("error in upload file", e)
    console.log("====================================")
    response.err = parseError(e.text)
    response.status = e.status
  }
  return response
}
