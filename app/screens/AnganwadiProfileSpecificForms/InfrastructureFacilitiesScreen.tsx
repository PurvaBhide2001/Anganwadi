import { observer } from "mobx-react-lite"
import {
  Box,
  Center,
  FormControl,
  Input,
  Text,
  Link,
  Button,
  HStack,
  Stack,
  Image,
  CheckIcon,
  Select,
  Radio,
} from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  KeyboardAvoidingView,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import LinearGradient from "react-native-linear-gradient"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import AddressComponent from "../../components/AddressComponent"
import { useLoginContext } from "../../Context/LoginContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "../../navigators"
import { colors, spacing } from "../../theme"
import InputField from "../../UI/InputField"
import InputField2 from "../../UI/InputField2"
import SelectDropdown3 from "../../UI/SelectDropdown3"
import Feather from "react-native-vector-icons/Feather"
// import Fontisto from "react-native-vector-icons/Fontisto"
import Fontisto from "react-native-vector-icons/Fontisto"
import AntDesign from "react-native-vector-icons/AntDesign"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { styleData } from "../../../assets/constant/styleData"
import { useHeader } from "../../utils/useHeader"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"

interface InfrastructureFacilitiesProps extends AppStackScreenProps<"InfrastructureFacilities"> {}

export const InfrastructureFacilitiesScreen: FC<InfrastructureFacilitiesProps> = observer(
  function InfrastructureFacilities({ navigation }) {
    const [language, setLanguage] = useState("")
    const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
    const [value, setValue] = React.useState("one")
    const { anganwadiList } = useLoginContext()
    const { onRefresh, refereshing } = useMainMenuContext()

    useHeader({
      title: "  पायाभूत सुविधा",
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
            {/* <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={4}>
                <Text
                  textAlign={styleData.heading.textAlign}
                  fontSize={responsiveFontSize(styleData.heading.fontSize)}
                  fontWeight={styleData.heading.fontWeight}
                >
                  पायाभूत सुविधा
                </Text>
              </Box>
            </Box> */}

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)} alignItems={"flex-start"}>
                <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
                  <Box flex={1.5}>
                    <Text fontSize={responsiveFontSize(2.2)}>पिण्याचे पाणी उपलब्ध आहे का</Text>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Radio.Group
                    name="myRadioGroup"
                    value={value}
                    flex={1}
                    flexDirection="row"
                    onChange={(nextValue) => {
                      setValue(nextValue)
                    }}
                  >
                    <Radio flex={1} value="one" mx="2">
                      होय
                    </Radio>
                    <Radio flex={1} value="two" mx="3">
                      नाही
                    </Radio>
                  </Radio.Group>
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)}>
                <InputField2
                  control={control}
                  name={""}
                  placeholder={"शौचालय संख्या"}
                  keyPadType={"phone-pad"}
                  variant="underlined"
                  inputRightElementTopRightRadius={0}
                  inputRightElementBottomRightRadius={0}
                  inputRightElementBorderWidth={0}
                />
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)} alignItems={"flex-start"}>
                <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
                  <Box flex={1.5}>
                    <Text fontSize={responsiveFontSize(2.2)}>शौचालय उपलब्ध आहे का</Text>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Radio.Group
                    name="myRadioGroup"
                    value={value}
                    flex={1}
                    flexDirection="row"
                    onChange={(nextValue) => {
                      setValue(nextValue)
                    }}
                  >
                    <Radio flex={1} value="one" mx="2">
                      होय
                    </Radio>
                    <Radio flex={1} value="two" mx="3">
                      नाही
                    </Radio>
                  </Radio.Group>
                </Box>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={1} borderRadius={responsiveWidth(3)} paddingTop={responsiveHeight(1.5)}>
                <SelectDropdown3
                  control={control}
                  name={""}
                  placeholder={"AWC येथे शौचालयाचा प्रकार"}
                  listItem={undefined}
                  label={"undefined"}
                  labelValue={"id"}
                  bgColor="white"
                  borderBottomColor="warmGray.300"
                  borderColor="white"
                  borderRadius={2}
                  borderWidth={0.3}
                  fontSize={2.2}
                />
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
              <Box flex={10.5} borderRadius={responsiveWidth(3)} alignItems={"flex-start"}>
                <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
                  <Box flex={1.5}>
                    <Text fontSize={responsiveFontSize(2.2)}>
                      शौचालयात पाण्याची सुविधा उपलब्ध आहे की नाही
                    </Text>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Radio.Group
                    name="myRadioGroup"
                    value={value}
                    flex={1}
                    flexDirection="row"
                    onChange={(nextValue) => {
                      setValue(nextValue)
                    }}
                  >
                    <Radio flex={1} value="one" mx="2">
                      होय
                    </Radio>
                    <Radio flex={1} value="two" mx="3">
                      नाही
                    </Radio>
                  </Radio.Group>
                </Box>
              </Box>
            </Box>

            {/* <Box flex={2}>
              <Box flex={1} flexDirection="row" padding={responsiveWidth(2)}></Box>
            </Box> */}
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
