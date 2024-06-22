import moment from "moment"
import "moment/locale/hi"
export const dateFormat = (date: any) => {
  moment.locale("hi")
  return moment(date).format("LL")
}
export const dateFormatRequiredType = (date: any, format: string) => {
  moment.locale("en")
  // console.log("moment(date).format(format)", moment(date).format(format))

  return moment(date).format(format)
}
export const monthDateFormat = (format: string, date: any, lang: string = "hi") => {
  moment.locale(lang)
  return moment(date).format(format)
}

export const calenderFormat = (date: any, lang: string) => {
  moment.locale(lang)
  return moment(date).subtract(10, "days").calendar()
}
