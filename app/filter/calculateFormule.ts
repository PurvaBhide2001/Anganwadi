export const calculateAge = (date: string, isFormat: boolean = false): string | number => {
  const birthdate = new Date(date)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - birthdate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const years = Math.floor(diffDays / 365)
  const months = Math.floor((diffDays % 365) / 30)
  const days = diffDays - years * 365 - months * 30
  if (!isFormat) return parseFloat(`${years}.${months}`)
  return `${years} वर्ष, ${months} महिने`
}

export const bmi = (height: number = 0, weight: number = 0) => {
  let h = height / 100
  h = Math.pow(h, 2)
  const res = weight / h
  const finalRes = res ? Number(res.toFixed(2)) : Number(res)

  return finalRes
}
