import { useToast } from "native-base"
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

import { Platform } from "react-native"
import { AnganwadiApi } from "../api/AnganwadiApi"

import { useCommanContextContext } from "./CommanContext"
import { useLoginContext } from "./LoginContext"
import { useForm } from "react-hook-form"
import { AngamwadiProfileApi } from "../api/AnganwadiProfileApi"
import { StudentApi } from "../api/StudentApi"

interface AnganwadiEmployeeContextInterface {
  addedPlayingToysArray: any[]
  isOpenEmployeeModal: boolean
  openToEmployeeModal: Function
  closeToEmployeeModal: Function

  setToyName: Function
  toyName: string
  onAddEmployee: Function

  onUpdateEmployee: Function
  isUpdate: boolean
  onUpdatedEmployee: Function
  deleteMessage: string
  deleteBtnName: string
  cancelBtnName: string
  closeWarningModal: Function
  deleteEmployeeItem: Function
  yesToDeleteEmployeeItem: Function
  isWarningModalOpen: boolean
  handleSubmit: Function
  control: any
  staffList: any[]
  yesToDeleteStudentItem: Function
  deleteStudentItem: Function
}
const AnganwadiEmployeeContext = createContext<null | AnganwadiEmployeeContextInterface>(null)

type AnganwadiEmployeeContextProps = { children: React.ReactNode }

export const AnganwadiEmployeeContextProvider = ({ children }: AnganwadiEmployeeContextProps) => {
  const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>("")
  const { openAlertModal } = useCommanContextContext()

  const [toyName, setToyName] = useState<string>("")

  const [imageName2, setImageName2] = useState<string>("")
  const { toastShow, useData, addedPlayingToysArray } = useLoginContext()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [selectedEmployeeID, setSelectedEmployeeID] = useState<string | number>("")
  const [staffList, setStaffList] = useState<any[]>([])
  const [selectedStudentID, setSelectedStudentID] = useState<string | number>("")
  type awwFormValues = {
    f_name: string
    m_name: string
    l_name: string
    contact_number: string
    email: string
    role: string
  }
  const resetData: any = {
    f_name: "",
    m_name: "",
    l_name: "",
    contact_number: "",
    email: "",
    role: "",
  }
  const { control, handleSubmit, reset, setValue } = useForm<any>()
  const [deleteMessage, setDeleteMessage] = useState<any>(
    "तुम्हाला सेविका व मदतनीस नक्की हटवायची आहे का??",
  )

  const [deleteBtnName] = useState<string>("हटवा")
  const [cancelBtnName] = useState<string>("रद्द करा")
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)

  const toast = useToast()
  const { getPlayingToys } = useLoginContext()
  const getListAllStaff = async () => {
    const { result: { data: { data = [], status = 204 } = {} } = {} } =
      await AngamwadiProfileApi.getStaffList()
    console.log("====================================")
    console.log("data for stadfff", data, status)
    console.log("====================================")
    status == 200 &&
      setStaffList(data.filter((emp: any) => emp?.anganwadi_id == useData?.anganwadi_id))
    status == 204 && setStaffList([])
  }
  useEffect(() => {
    if (useData) {
      getListAllStaff()
    }
  }, [useData])
  const resetDataAndCallGetEmployeeList = (anganwadi_id: number | string) => {
    // getPlayingToys(anganwadi_id)
    getListAllStaff()
    reset()
    setSelectedEmployeeID("")
    setIsUpdate(false)
  }
  const findEmployee = (id: number | string) => {
    return staffList.find((item: any) => item?.id == id)
  }

  const openToEmployeeModal = () => {
    setIsOpenEmployeeModal(true)
  }
  const closeToEmployeeModal = () => {
    setTimeout(() => {
      setIsOpenEmployeeModal(false)
      resetDataAndCallGetEmployeeList(useData?.anganwadi_id)
    }, 600)
  }
  const openWarningModal = () => {
    setIsWarningModalOpen(true)
  }

  const closeWarningModal = () => {
    setIsWarningModalOpen(false)
  }

  const yesToDeleteEmployeeItem = async () => {
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await AngamwadiProfileApi.deleteStaff(selectedEmployeeID)
    console.log("data deleted", data, status)
    resetDataAndCallGetEmployeeList(useData?.anganwadi_id)
    closeWarningModal()
  }
  const deleteEmployeeItem = (id: number | string) => {
    setSelectedEmployeeID(id)
    openWarningModal()
  }

  /**
   * update to the employee
   */
  const onUpdateEmployee = (id: number | string) => {
    console.log("id", id, findEmployee(id))
    const data = findEmployee(id)
    console.log("====================================")
    console.log("updating data", data)
    console.log("====================================")
    Object.keys(resetData).forEach((key) => setValue(key, data[key]))
    setSelectedEmployeeID(id)

    setIsUpdate(true)
    openToEmployeeModal()
  }

  /**
   * updated playing employee
   */
  const onUpdatedEmployee = async (formadata: any) => {
    const jsonData = {
      ...formadata,
      anganwadi_id: useData?.anganwadi_id,
    }
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await AngamwadiProfileApi.updateStaff(selectedEmployeeID, jsonData)
    console.log("update  by employee data", data, status)

    if (status == 200) {
      openAlertModal("तुम्ही भरलेला डेटा अपडेट  केला गेला आहे !!!", 500)
      resetDataAndCallGetEmployeeList(useData?.anganwadi_id)
      closeToEmployeeModal()
    }
  }

  /***
   * add to the employee
   */
  const onAddEmployee = async (formData: any) => {
    const jsonData = {
      title: toyName,
      icon: imageName,
      image: imageName2,
      anganwadi_id: useData?.anganwadi_id,
    }
    console.log("formDataformData", formData)
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await AngamwadiProfileApi.createStaff({
        ...formData,
        anganwadi_id: useData?.anganwadi_id,
      })
    console.log("datta", data, status)

    if (status == 200) {
      openAlertModal("तुम्ही भरलेला डेटा अपलोड केला गेला आहे ", 500)
      resetDataAndCallGetEmployeeList(useData?.anganwadi_id)
      closeToEmployeeModal()

      // clearToData()
    } else {
      openAlertModal("कृपया तुम्ही सर्व फील्ड फील करा !!!", 500)
      // toastShow(toast, "कृपया तुम्ही सर्व फील्ड फील करा !!!", "top", "red.200")
    }
  }

  /* Delete Student */
  const yesToDeleteStudentItem = async () => {
    const { result: { data: { data = {}, status = 204 } = {} } = {} } =
      await StudentApi.deleteStudent(selectedStudentID)
    console.log("data deleted", data, status)
    // resetDataAndCallGetStudentList(useData?.anganwadi_id)
    // closeWarningModal()
  }
  const deleteStudentItem = (id: number | string) => {
    setSelectedStudentID(id)
    openWarningModal()
  }
  const value: AnganwadiEmployeeContextInterface = {
    addedPlayingToysArray,
    isOpenEmployeeModal,
    openToEmployeeModal,
    closeToEmployeeModal,
    setToyName,
    toyName,
    onAddEmployee,

    onUpdateEmployee,
    isUpdate,
    onUpdatedEmployee,
    deleteMessage,
    deleteBtnName,
    cancelBtnName,
    closeWarningModal,
    deleteEmployeeItem,
    yesToDeleteEmployeeItem,
    isWarningModalOpen,
    handleSubmit,
    control,
    staffList,
    yesToDeleteStudentItem,
    deleteStudentItem,
  }
  return (
    <AnganwadiEmployeeContext.Provider value={value}>{children}</AnganwadiEmployeeContext.Provider>
  )
}

export const useAnganwadiEmployeeContext = () => {
  const context = useContext(AnganwadiEmployeeContext)
  if (!context) throw new Error("use PlayingToys context use in PlayingToys context provider")
  return context
}
