import { observer } from "mobx-react-lite"
import { Box, Text, Avatar, Icon } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { styleData } from "../../../assets/constant/styleData"
import { useLoginContext } from "../../Context/LoginContext"

import { AppStackScreenProps, navigate } from "../../navigators"
import AntDesign from "react-native-vector-icons/AntDesign"
import Fontisto from "react-native-vector-icons/Fontisto"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useHeader } from "../../utils/useHeader"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { RefreshControl } from "react-native-gesture-handler"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { asyncDataStoreSetItem } from "../../filter/asyncstorageOperation"
import IconComponent from "../../components/IconComponent"

interface ShowProfileProps extends AppStackScreenProps<"ShowProfile"> {}

export const ShowProfile: FC<ShowProfileProps> = observer(function ShowProfile({ navigation }) {
  const avatar = require("../../../assets/surveyimages/svgtopng/img1.png")
  const { useData, setIsLogin } = useLoginContext()
  const { stateName, onClickTOEditProfileAndSetData } = useUserProfileContextContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const icon = require("../../../assets/surveyimages/MainMenu/Profile.png")

  let state, district, block, village
  if (useData?.state_obj && useData?.district_obj && useData?.block_obj && useData?.village_obj) {
    console.log("this is data for obj")
    state = JSON.parse(useData.state_obj)
    state = JSON.parse(state)

    district = JSON.parse(useData.district_obj)
    district = JSON.parse(district)
    block = JSON.parse(useData.block_obj)
    block = JSON.parse(block)
    village = JSON.parse(useData.village_obj)
    village = JSON.parse(village)
  } else {
    block = district = village = ""
  }

  useHeader({
    title: "यूजर प्रोफाइल",
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
      style={{ height: "100%", width: "100%" }}
      refreshControl={<RefreshControl refreshing={refereshing} onRefresh={() => onRefresh()} />}
    >
      <Box flex={1} width="100%" bg={"white"}>
        <LinearGradient
          colors={["#FFC7E8", "#98AFFF"]}
          style={{
            width: "100%",
            height: responsiveHeight(135),
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
                    alignItems: "center",
                  }}
                  onPress={() => {
                    onClickTOEditProfileAndSetData()
                  }}
                >
                  {/* <Icon
                    as={MaterialCommunityIcons}
                    name="account-edit-outline"
                    size={responsiveHeight(4.5)}
                    color="warmGray.500"
                  /> */}
                  <IconComponent
                    src={require("../../../assets/comman-icons/user-edit.png")}
                    width={10}
                  />
                </TouchableOpacity>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box flex={2} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/awc-user.png")} />
                  </Box>
                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      पूर्ण नाव
                    </Text>
                    <Text fontSize={responsiveFontSize(2.2)} color="warmGray.400">
                      {useData?.f_name} {useData?.m_name} {useData?.l_name}{" "}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/e-mail.png")} />
                  </Box>
                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      ई-मेल
                    </Text>
                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {useData?.email}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/mobile-no.png")} />
                  </Box>

                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      मोबाईल नंबर
                    </Text>

                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {useData?.contact_no}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent
                      src={require("../../../assets/comman-icons/anganwadi-code.png")}
                    />
                  </Box>

                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      अंगणवाडी कोड
                    </Text>

                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {useData?.anganwadi_code}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent
                      src={require("../../../assets/comman-icons/anganwadi-name.png")}
                    />
                  </Box>

                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      अंगणवाडी नाव
                    </Text>

                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {useData?.anganwadi_name}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/rajya.png")} />
                  </Box>

                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      राज्य
                    </Text>

                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {state?.state_title}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/jilha.png")} />
                  </Box>

                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      जिल्हा
                    </Text>

                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {district?.district_title}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/taluka.png")} />
                  </Box>

                  <Box
                    flex={1}
                    padding={responsiveHeight(1.5)}
                    borderBottomWidth={responsiveWidth(0.2)}
                    borderBottomColor="warmGray.400"
                  >
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      तालुका
                    </Text>

                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {block?.block_title}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box flex={1} flexDirection="column">
                <Box flex={1} flexDirection="row" paddingRight={responsiveWidth(2)}>
                  <Box flex={0.2} justifyContent={"center"} alignItems="center">
                    <IconComponent src={require("../../../assets/comman-icons/gav.png")} />
                  </Box>

                  <Box flex={1} padding={responsiveHeight(1.5)}>
                    <Text bold fontSize={responsiveFontSize(2.2)} color="warmGray.500">
                      गाव
                    </Text>

                    <Text fontSize={responsiveFontSize(2.2)} color={"grey"}>
                      {village?.village_name}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box flex={1} flexDirection="column" alignItems={"center"}>
                <Box flex={1} flexDirection="row">
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#dc3541",
                      height: "100%",
                      width: "45%",
                      justifyContent: "center",
                      borderRadius: responsiveWidth(2),
                    }}
                    onPress={async () => {
                      await asyncDataStoreSetItem("isLogin", false)
                      setIsLogin(false)
                    }}
                  >
                    <Text
                      textAlign="center"
                      color={"white"}
                      justifyContent="center"
                      fontWeight={600}
                      fontSize={responsiveFontSize(2.5)}
                      padding={responsiveHeight(1)}
                    >
                      साइन आऊट
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          </Box>
        </LinearGradient>
      </Box>
    </ScrollView>
  )
})
