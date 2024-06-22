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

interface NutritionalStatusProps extends AppStackScreenProps<"NutritionalStatus"> {}

export const NutritionalStatusScreen: FC<NutritionalStatusProps> = observer(
  function NutritionalStatus({ navigation }) {
    const [language, setLanguage] = useState("")
    const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
    const { anganwadiList } = useLoginContext()
    const { onRefresh, refereshing } = useMainMenuContext()

    useHeader({
      title: "बालकांची आरोग्य स्थिती ",
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
              <Box flex={1} borderRadius={responsiveWidth(3)}>
                <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                  सामान्य
                </Text>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    0 ते 6 महिने :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    6 महिने ते 3 वर्षे :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                flexDirection="row"
                borderBottomColor="warmGray.300"
                borderBottomWidth={responsiveWidth(0.5)}
                paddingY={responsiveWidth(3)}
              >
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    3 वर्षे ते 6 वर्षे :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका "}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={1} borderRadius={responsiveWidth(3)}>
                <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                  मध्यम कुपोषित (2SD पेक्षा कमी ते -3SD)
                </Text>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    0 ते 6 महिने :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    6 महिने ते 3 वर्षे :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                flexDirection="row"
                borderBottomColor="warmGray.300"
                borderBottomWidth={responsiveWidth(0.5)}
                paddingY={responsiveWidth(3)}
              >
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    3 वर्षे ते 6 वर्षे :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका "}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={1} borderRadius={responsiveWidth(3)}>
                <Text fontSize={responsiveFontSize(2.4)} color={"warmGray.500"} bold>
                  तीव्र कुपोषित (3SD पेक्षा कमी)
                </Text>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    0 ते 6 महिने :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>
            <Box flex={1} flexDirection="row">
              <Box flex={1} flexDirection="row">
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    6 महिने ते 3 वर्षे :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row">
              <Box
                flex={1}
                flexDirection="row"
                borderBottomColor="warmGray.300"
                borderBottomWidth={responsiveWidth(0.5)}
                paddingY={responsiveWidth(3)}
              >
                <Box
                  flex={4}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                    3 वर्षे ते 6 वर्षे :
                  </Text>
                </Box>
                <Box
                  flex={3.5}
                  borderRadius={responsiveWidth(3)}
                  alignContent="flex-end"
                  justifyContent={"center"}
                >
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालके"}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
                <Box flex={3.5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
                  <InputField2
                    control={control}
                    name={""}
                    placeholder={"बालिका "}
                    keyPadType={"phone-pad"}
                    variant="underlined"
                    inputRightElementTopRightRadius={0}
                    inputRightElementBottomRightRadius={0}
                    inputRightElementBorderWidth={0}
                  />
                </Box>
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
