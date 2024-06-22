import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import InputField2 from "../../UI/InputField2"
import { useHeader } from "../../utils/useHeader"

interface TotalParticipantsProps extends AppStackScreenProps<"TotalParticipants"> {}

export const TotalParticipantsScreen: FC<TotalParticipantsProps> = observer(
  function TotalParticipants({ navigation }) {
    const [language, setLanguage] = useState("")
    const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
    const { anganwadiList } = useLoginContext()
    const { onRefresh, refereshing } = useMainMenuContext()

    useHeader({
      title: "अंगणवाडी सर्वेक्षणनुसार लाभार्थी",
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
          padding={responsiveWidth(2)}
        >
          <Box flex={1} alignItems="center" justifyContent="center" padding={responsiveWidth(2)}>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)} alignItems={"center"}>
                <InputField2
                  control={control}
                  name={""}
                  placeholder={"बालके (०-६ महिने)"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={control}
                  name={""}
                  placeholder={"बालके (6 महिने ते 3 वर्षे)"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={control}
                  name={""}
                  placeholder={"बालके (3-6 वर्षे)"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={control}
                  name={""}
                  placeholder={"गर्भवती महिला"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box>
            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={control}
                  name={""}
                  placeholder={"स्तनदा माता"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box>

            <Box flex={2}>
              <Box flex={1} flexDirection="row" padding={responsiveWidth(2)}></Box>
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
  },
)
