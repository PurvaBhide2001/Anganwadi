import React, { useState } from "react"
import { View, Text, TextInput, Button } from "react-native"

const BirthRateCalculator = () => {
  const [girls, setGirls] = useState("")
  const [boys, setBoys] = useState("")
  const [birthRate, setBirthRate] = useState("")

  const calculateBirthRate = () => {
    const totalChildren = parseInt(girls) + parseInt(boys)
    const girlRatio = parseInt(girls) / totalChildren
    const boyRatio = parseInt(boys) / totalChildren
    const birthRateResult = (girlRatio * 1000) / 10 //births per 1000 people
    setBirthRate(birthRateResult.toFixed(1))
  }

  return (
    <View>
      <TextInput
        placeholder="Number of girls"
        value={girls}
        onChangeText={setGirls}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Number of boys"
        value={boys}
        onChangeText={setBoys}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={calculateBirthRate} />
      <Text>Birth rate: {birthRate}%</Text>
    </View>
  )
}

export default BirthRateCalculator
