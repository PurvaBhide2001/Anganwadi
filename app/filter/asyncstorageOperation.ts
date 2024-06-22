import AsyncStorage from "@react-native-async-storage/async-storage"

export const asyncDataStoreSetItem = async (keyName: string, data: any) => {
  const stringifyData = JSON.stringify(data)
  try {
    await AsyncStorage.setItem(keyName, stringifyData)
  } catch (error) {
    // Error saving data
    console.log("error", error)
  }
}

export const asyncDataStoreGetItem = async (keyName: string) => {
  try {
    const item = await AsyncStorage.getItem(keyName)
        const  parseData=JSON.parse(item)
    return item
  } catch (error) {
    alert("your data not found!!")
    return
  }
}
