import React from "react"
import { useCalculationContext } from "../../Context/CalculationContext"
import { Box } from "native-base"
import { responsiveWidth } from "react-native-responsive-dimensions"
import VaccinationItem from "./VaccineItem"
import Vaccination1Item from "./Vaccine1Item"

export default () => {
  const { vaccination1 } = useCalculationContext()
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
      {vaccination1.map(({ title, when, amount, way, place }: any, i: number) => {
        return (
          <Vaccination1Item title={title} when={when} amount={amount} way={way} place={place} />
        )
      })}
    </Box>
  )
}
