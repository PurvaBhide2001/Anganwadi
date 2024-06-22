import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import { useAddressContext } from "../../Context/AddressContext"
import { useAnganwadiProfileContext } from "../../Context/AnganwadiProfileContext"
import { useHeader } from "../../utils/useHeader"
import MyRadioButtons2 from "../../UI/RadioGroup2"
import InputField2 from "../../UI/InputField2"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"

interface ActivitySummaryProps extends AppStackScreenProps<"ActivitySummary"> {}

export const ActivitySummaryScreen: FC<ActivitySummaryProps> = observer(function ActivitySummary({
  navigation,
}) {
  const [language, setLanguage] = useState("")
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { anganwadiList } = useLoginContext()
  const { states, districts } = useAddressContext()
  const { awcMiniType } = useAnganwadiProfileContext()
  const [value, setValue] = React.useState("two")
  // const [value1, setValue2] = React.useState("2")
  const { onRefresh, refereshing } = useMainMenuContext()

  useHeader({
    title: "(VHND) क्रियाकलाप सारांश",
    titleStyle: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.5),
      fontWeight: "700",
      color: "#7d8592",
    },

    onLeftPress(event) {
      navigation.goBack()
    },
    leftIcon: "back",
  })

  return (
    <ScrollView
      style={{}}
      refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
    >
      <Box
        flex={1}
        flexDirection="column"
        height={"100%"}
        bg={"white"}
        padding={responsiveWidth(3)}
      >
        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              1) VHND नियोजित तारखेला आयोजित करण्यात आला होता?
            </Text>
          </Box>
          <MyRadioButtons2 />
          <Box
            flex={1}
            borderBottomColor="warmGray.300"
            borderBottomWidth={responsiveWidth(0.2)}
          ></Box>
        </Box>

        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              2) VHND दरम्यान AWW उपस्थित आहे?
            </Text>
          </Box>
          <MyRadioButtons2 />

          <Box
            flex={1}
            borderBottomColor="warmGray.300"
            borderBottomWidth={responsiveWidth(0.2)}
          ></Box>
        </Box>
        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              3) व्हिटॅमिन ए पूरक आहार प्रशासित
            </Text>
          </Box>
          <Box flex={1} paddingY={responsiveWidth(2)}>
            <MyRadioButtons2 />
          </Box>
          <Box
            flex={1}
            borderBottomColor="warmGray.300"
            borderBottomWidth={responsiveWidth(0.2)}
          ></Box>
        </Box>

        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              4) कोणतीही प्रसूतीपूर्व तपासणी केली आहे का?
            </Text>
          </Box>
          <Box flex={1} paddingY={responsiveWidth(2)}>
            <MyRadioButtons2 />
          </Box>
          <Box
            flex={1}
            borderBottomColor="warmGray.300"
            borderBottomWidth={responsiveWidth(0.2)}
          ></Box>
        </Box>
        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              5) गावातील नेते/VHSNC सदस्य सहभागी झाले होते का?
            </Text>
          </Box>
          <Box flex={1} paddingY={responsiveWidth(2)}>
            <MyRadioButtons2 />
          </Box>
          <Box
            flex={1}
            borderBottomColor="warmGray.300"
            borderBottomWidth={responsiveWidth(0.2)}
          ></Box>
        </Box>
        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              6) AWC येथे 19 वर्षांपर्यंतच्या मुलांना दिले जाणारे जंतनाशक (अल्बेंडाझोल) टॅब्लेटची
              संख्या
            </Text>
          </Box>
          <Box flex={1} paddingY={responsiveWidth(2)}>
            <InputField2
              control={control}
              name={""}
              placeholder={"कृपया संख्या प्रविष्ट करा"}
              keyPadType={"phone-pad"}
              variant="underlined"
              inputRightElementTopRightRadius={0}
              inputRightElementBottomRightRadius={0}
              inputRightElementBorderWidth={0}
            />
          </Box>
        </Box>
        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              7) जंतनाशक गोळ्या दिलेल्या मुलांची संख्या [ बालके:१-२ वर्षे-अर्धी गोळी; 2-19 वर्षे -1
              टॅब्लेट]
            </Text>
          </Box>
          <Box flex={1} paddingY={responsiveWidth(2)}>
            <InputField2
              control={control}
              name={""}
              placeholder={"कृपया संख्या प्रविष्ट करा"}
              keyPadType={"phone-pad"}
              variant="underlined"
              inputRightElementTopRightRadius={0}
              inputRightElementBottomRightRadius={0}
              inputRightElementBorderWidth={0}
            />
          </Box>
          <Box flex={1}></Box>
        </Box>
        <Box flex={1} paddingY={responsiveWidth(3)}>
          <Box flex={1}>
            <Text fontSize={responsiveFontSize(2.2)} color="warmGray.500">
              8) ECCE DAY
            </Text>
          </Box>
          <Box flex={1} paddingY={responsiveWidth(2)}>
            <MyRadioButtons2 />
          </Box>
        </Box>
      </Box>
      <Box flex={4} flexDirection="row" justifyContent={"flex-end"}>
        <TouchableOpacity
          style={{
            backgroundColor: "#669df6",
            width: "100%",
            justifyContent: "center",
          }}
          onPress={handleSubmit((data: any) => {
            onSubmit(data)
          })}
        >
          <Text
            textAlign="center"
            color={"white"}
            justifyContent="center"
            fontSize={responsiveFontSize(2.5)}
            padding={responsiveWidth(1)}
            bold
          >
            अपडेट करा
          </Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  )
})
