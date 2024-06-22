import { Box, Text } from "native-base"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

interface IProps {
  title: string
  khel: string
  paripath: string
  VLG: string
  ss: string
  pt: string
  sv: string
  gg: string
}

function AakarDetailItem({ title, khel, paripath, VLG, ss, pt, sv, gg }: IProps) {
  const [clicked, setClicked] = useState(false)

  const handlePress = () => {
    setClicked(!clicked)
  }

  return (
    <Box padding={responsiveWidth(1.5)}>
      <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1)}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            backgroundColor: "#90cafc",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            color={"white"}
            justifyContent="center"
            fontSize={responsiveFontSize(2.2)}
            padding={responsiveWidth(1.2)}
            paddingLeft={responsiveWidth(3)}
            bold
          >
            {title}
          </Text>
        </TouchableOpacity>
      </Box>

      {clicked && (
        <>
          <Box flex={1} flexDirection="row">
            <Box flex={4} paddingRight={responsiveWidth(0.3)}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="#3870c0">
                मुक्तखेळ (२० मिनिटे)
              </Text>
            </Box>
            <Box flex={0.5}></Box>
            <Box flex={7}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" textAlign={"justify"}>
                {khel}
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={0.5} flexDirection="row">
            <Box flex={4} paddingRight={responsiveWidth(0.3)}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="#3870c0">
                परिपाठ (२० मिनिटे)
              </Text>
            </Box>
            <Box flex={0.5}></Box>
            <Box flex={7} paddingBottom={responsiveHeight(1)}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" textAlign={"justify"}>
                {paripath}
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={1} flexDirection="row">
            <Box flex={4} paddingRight={responsiveWidth(0.3)}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="#3870c0">
                वाचन/लेखन/गणन पूर्वतयारी (२० मिनिटे)
              </Text>
            </Box>
            <Box flex={0.5}></Box>
            <Box flex={7} paddingBottom={responsiveHeight(1)}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" textAlign={"justify"}>
                {VLG}
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1.5)}>
            <Box flex={1} paddingRight={responsiveWidth(0.3)} alignItems={"center"}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" bold>
                छोटी सुट्टी (१० मिनिटे)
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1.5)}>
            <Box flex={4} paddingRight={responsiveWidth(0.3)}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="#3870c0">
                परिसर परिचय/विज्ञानानुभव/भाषविकास (२० मिनिटे)
              </Text>
            </Box>
            <Box flex={0.5}></Box>
            <Box flex={7} paddingBottom={responsiveHeight(1)}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" textAlign={"justify"}>
                {ss}
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1.5)}>
            <Box flex={4} paddingRight={responsiveWidth(0.3)}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="#3870c0">
                शारीरिक विकास (२० मिनिटे)
              </Text>
            </Box>
            <Box flex={0.5}></Box>
            <Box flex={7} paddingBottom={responsiveHeight(1)}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" textAlign={"justify"}>
                {pt}
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1.5)}>
            <Box flex={1} paddingRight={responsiveWidth(0.3)} alignItems={"center"}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" bold>
                खाऊची सुट्टी (२० मिनिटे)
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1.5)}>
            <Box flex={4} paddingRight={responsiveWidth(0.3)}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="#3870c0">
                सर्जनशीलतेचा विकास (२० मिनिटे)
              </Text>
            </Box>
            <Box flex={0.5}></Box>
            <Box flex={7} paddingBottom={responsiveHeight(1)}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" textAlign={"justify"}>
                {sv}
              </Text>
            </Box>
          </Box>
          <Box
            flex={1}
            bg="#f1f1f1"
            height={responsiveHeight(0.5)}
            marginBottom={responsiveHeight(1.5)}
          ></Box>
          <Box flex={1} flexDirection="row" paddingBottom={responsiveHeight(1.5)}>
            <Box flex={4} paddingRight={responsiveWidth(0.3)}>
              <Text fontSize={responsiveFontSize(2.2)} fontWeight={600} color="#3870c0">
                गोष्ट/गाणी (२० मिनिटे)
              </Text>
            </Box>
            <Box
              flex={1}
              bg="#f1f1f1"
              height={responsiveHeight(0.5)}
              marginBottom={responsiveHeight(1.5)}
            ></Box>
            <Box flex={0.5}></Box>
            <Box flex={7} paddingBottom={responsiveHeight(1)}>
              <Text fontSize={responsiveFontSize(2.2)} color="#3870c0" textAlign={"justify"}>
                {gg}
              </Text>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default AakarDetailItem
