import React from "react"
import { Box, Text } from "native-base"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import AakarDetailItem from "./AakarDetailItem"
import { usePurvPrathmikContextContext } from "../../Context/PurvPrathmikContext"

export default () => {
  const { akarWeekleDetails } = usePurvPrathmikContextContext()
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
      <Box>
        <Text fontSize={responsiveFontSize(2.3)} color="warmGray.500" bold>
          आठवडा १
        </Text>
      </Box>
      {akarWeekleDetails.map(({ title, khel, paripath, VLG, ss, pt, sv, gg }: any, i: number) => {
        return (
          <AakarDetailItem
            title={title}
            khel={khel}
            paripath={paripath}
            VLG={VLG}
            ss={ss}
            pt={pt}
            sv={sv}
            gg={gg}
          />
        )
      })}
    </Box>
  )
}
