import { observer } from "mobx-react-lite"
import { Box, Text, Icon, Avatar } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import InputField2 from "../../UI/InputField2"
import { styleData } from "../../../assets/constant/styleData"
import { useHeader } from "../../utils/useHeader"
import AntDesign from "react-native-vector-icons/AntDesign"
import Fontisto from "react-native-vector-icons/Fontisto"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { ScrollView } from "react-native"
import { useAddressContext } from "../../Context/AddressContext"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { RefreshControl } from "react-native-gesture-handler"
import AddressComponent from "../../components/AddressComponent"
import IconComponent from "../../components/IconComponent"

interface EditProfileProps extends AppStackScreenProps<"EditProfile"> {}

export const EditProfile: FC<EditProfileProps> = observer(function EditProfile({ navigation }) {
  const [language, setLanguage] = useState("")
  const { control, handleSubmit, watch, onSubmit, onClickTOEditProfileAndSetData, errors } =
    useUserProfileContextContext()
  const { anganwadiList } = useLoginContext()
  const { useData } = useLoginContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const icon = require("../../../assets/surveyimages/MainMenu/Profile.png")
  useHeader({
    title: "प्रोफाइल अपडेट करा ",
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
      <Box flex={1} height="100%" width="100%" paddingBottom={responsiveHeight(103)}>
        <LinearGradient
          colors={["#FFC7E8", "#98AFFF"]}
          style={{
            width: "100%",
            height: responsiveHeight(45),
            padding: responsiveWidth(1),
            flex: 1,
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <Box flex={1} flexDirection="column" padding={responsiveWidth(5)}>
            <Box flex={1}>
              <Avatar
                alignSelf={"center"}
                height={responsiveHeight(10)}
                width={responsiveWidth(19)}
                borderColor="white"
                borderWidth={responsiveWidth(0.5)}
                source={icon}
              ></Avatar>
              <Box flex={0.1}></Box>
              <Box flex={1}>
                <Text
                  color={"white"}
                  textAlign={styleData.heading.textAlign}
                  fontSize={responsiveFontSize(styleData.heading.fontSize)}
                  fontWeight={styleData.heading.fontWeight}
                >
                  {useData?.f_name} {useData?.l_name}
                </Text>
              </Box>
            </Box>

            <Box
              flex={1}
              bgColor={"white"}
              position={"absolute"}
              borderRadius={responsiveWidth(5)}
              alignSelf={"center"}
              justifyContent={"center"}
              marginTop={responsiveHeight(20)}
              padding={responsiveWidth(2)}
              width={"100%"}
              shadow={9}
            >
              <Box flex={1} flexDirection="column" alignItems="flex-end" bg={"red"}>
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                  }}
                  onPress={() => {
                    navigate("EditProfile")
                  }}
                ></TouchableOpacity>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="column">
                  <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                    <Box flex={0.2} alignItems="center">
                      {/* <Icon
                        as={FontAwesome}
                        name="child"
                        size={responsiveHeight(3.4)}
                        color="warmGray.500"
                      /> */}
                      <IconComponent src={require("../../../assets/comman-icons/awc-user.png")} />
                    </Box>

                    <Box flex={1}>
                      <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                        पहिले नाव
                      </Text>

                      <InputField2
                        control={control}
                        name={"f_name"}
                        placeholder={"पहिले नाव"}
                        keyPadType={undefined}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isRequiredValue={false}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box flex={1} flexDirection="column">
                  <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                    <Box flex={0.2} alignItems="center">
                      <IconComponent src={require("../../../assets/comman-icons/awc-user.png")} />
                    </Box>

                    <Box flex={1}>
                      <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                        वडिलांचे/पतीचे नाव
                      </Text>

                      <InputField2
                        control={control}
                        name={"m_name"}
                        placeholder={"वडिलांचे नाव"}
                        keyPadType={undefined}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isRequiredValue={false}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box flex={1} flexDirection="column">
                  <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                    <Box flex={0.2} alignItems="center">
                      <IconComponent src={require("../../../assets/comman-icons/awc-user.png")} />
                    </Box>

                    <Box flex={1}>
                      <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                        आडनाव
                      </Text>

                      <InputField2
                        control={control}
                        name={"l_name"}
                        placeholder={"शेवटचे नाव"}
                        keyPadType={undefined}
                        variant="underlined"
                        inputRightElementTopRightRadius={0}
                        inputRightElementBottomRightRadius={0}
                        inputRightElementBorderWidth={0}
                        isRequiredValue={false}
                        errorMsg={""}
                        errors={errors}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/e-mail.png")} />
                  </Box>
                  <Box flex={1} padding={responsiveHeight(1.5)}>
                    <InputField2
                      control={control}
                      name={"email"}
                      placeholder={"ई-मेल"}
                      keyPadType={undefined}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isRequiredValue={false}
                    />
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/mobile-no.png")} />
                  </Box>
                  <Box flex={1} padding={responsiveHeight(1.5)}>
                    <InputField2
                      control={control}
                      name={"contact_no"}
                      placeholder={"मोबाईल नंबर"}
                      keyPadType={"phone-pad"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isRequiredValue={false}
                    />
                  </Box>
                </Box>
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} alignItems="center">
                    <IconComponent
                      src={require("../../../assets/comman-icons/anganwadi-name.png")}
                    />
                  </Box>
                  <Box flex={1} padding={responsiveHeight(1.5)}>
                    <InputField2
                      control={control}
                      name={"anganwadi_name"}
                      placeholder={"अंगणवाडी नाव"}
                      keyPadType={"default"}
                      variant="underlined"
                      inputRightElementTopRightRadius={0}
                      inputRightElementBottomRightRadius={0}
                      inputRightElementBorderWidth={0}
                      isRequiredValue={false}
                    />
                  </Box>
                </Box>
                <AddressComponent watch={watch} control={control} />
              </Box>
              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingBottom={responsiveWidth(2)}>
                  <Box flex={6} justifyContent={"center"} alignItems="center">
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#9591FF",
                        height: "100%",
                        width: "80%",
                        justifyContent: "center",
                        borderRadius: responsiveWidth(2.5),
                        borderColor: "#f6f8fa",
                        borderWidth: responsiveWidth(0.5),
                        padding: responsiveWidth(1),
                      }}
                      onPress={() => {
                        navigate("ShowProfile")
                      }}
                    >
                      <Text
                        textAlign="center"
                        color={"white"}
                        justifyContent="center"
                        fontWeight={600}
                        fontSize={responsiveFontSize(2.5)}
                      >
                        रद्द करा
                      </Text>
                    </TouchableOpacity>
                  </Box>
                  <Box flex={6} justifyContent={"center"} alignItems="center">
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#9591FF",
                        height: "100%",
                        width: "80%",
                        justifyContent: "center",
                        borderRadius: responsiveWidth(2.5),
                        borderColor: "#f6f8fa",
                        borderWidth: responsiveWidth(0.5),
                        padding: responsiveWidth(1),
                      }}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text
                        textAlign="center"
                        color={"white"}
                        justifyContent="center"
                        fontWeight={600}
                        fontSize={responsiveFontSize(2.5)}
                      >
                        अपडेट करा
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </LinearGradient>
      </Box>
    </ScrollView>
  )
})
