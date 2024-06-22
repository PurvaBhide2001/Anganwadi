import React from "react"
import { useCalculationContext } from "../../Context/CalculationContext"
import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import Vaccination2Item from "./Vaccine2Item"

export default () => {
  const { vaccination2 } = useCalculationContext()
  return (
    <Box
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: responsiveWidth(2),
      }}
    >
      {vaccination2.map(({ title, when, amount, way, place }: any, i: number) => {
        return (
          <Vaccination2Item title={title} when={when} amount={amount} way={way} place={place} />
        )
      })}
    </Box>
  )
}
