export const sortList = (array: any[], key: string) => {
  return array.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
}
export const removeDuplicate = (arr: any[], key: string) => {
  return sortList(
    arr.filter((a, i) => arr.findIndex((s) => a[key] === s[key]) === i),
    key,
  )
}

export function randIntWithZero(num: number) {
  return Math.floor(Math.random() * num)
}

export const randomNumberArray = (arrayLength: number) => {
  const numbers = Array(arrayLength)
    .fill(1)
    .map((_, index) => index + 1)
  return numbers.sort(() => Math.random() - 0.5)
}

export function _arrayRandom(len: number, min: number, max: number, unique: boolean = true) {
  var len = len ? len : 10,
    min = min !== undefined ? min : 1,
    max = max !== undefined ? max : 100,
    unique = unique ? unique : false,
    toReturn = [],
    tempObj = {},
    i = 0

  if (unique === true) {
    for (; i < len; i++) {
      var randomInt = Math.floor(Math.random() * (max - min + min))
      if (tempObj["key_" + randomInt] === undefined) {
        tempObj["key_" + randomInt] = randomInt
        toReturn.push(randomInt)
      } else {
        i--
      }
    }
  } else {
    for (; i < len; i++) {
      toReturn.push(Math.floor(Math.random() * (max - min + min)))
    }
  }

  return toReturn
}


export const jsonToParse=(data:any)=>{
  if(!data){
    return null
  }
  return JSON.parse(data)
}