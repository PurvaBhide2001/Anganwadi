import { observer } from "mobx-react-lite"
import { Box, Flex, Input, Text, Image, Center, Icon, Avatar } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, StatusBar } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { TabView } from "react-native-tab-view"
import { Button, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import RenderTabBar from "../../components/RenderTabBar"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useImediateInformationContext } from "../../Context/ImediateInformationContext"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import Modal from "../../theme/Modal"
// import Entypo from "@expo/vector-icons"
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import InputField2 from "../../UI/InputField2"

interface ReportingProps extends AppStackScreenProps<"Reporting"> {}

export const ReportingScreen: FC<ReportingProps> = observer(function Reporting(_props) {
  const { index, routes, renderScene, setIndex, initialLayout, selectedItem } =
    useImediateInformationContext()
  return (
    <>
      <Box flex={1} padding={responsiveWidth(2)} bg="white">
        <Box flex={1} flexDirection="column">
          <Box flex={1}>
            <Text
              textAlign="center"
              fontSize={responsiveFontSize(3)}
              fontWeight={700}
              color="#1b7fb6"
            >
              {selectedItem.name}
            </Text>
          </Box>

          <Box flex={1} flexDirection="row">
            <Box flex={1}>
              {/* <Avatar alignSelf={"center"} height={responsiveHeight(3)} width={responsiveWidth(6)}
                                source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                }}
                            ></Avatar> */}
            </Box>
            <Box flex={8}>
              <Box
                flex={1}
                alignItems="flex-start"
                paddingLeft={responsiveWidth(2.5)}
                borderRadius={responsiveWidth(3)}
                bg="warmGray.300"
                borderColor={"warmGray.400"}
                borderWidth={responsiveWidth(0.5)}
              >
                <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
                  {selectedItem?.name}
                </Text>
              </Box>
            </Box>
            <Box flex={3}></Box>
          </Box>

          <Box flex={0.1}></Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1}></Box>
            <Box flex={8}>
              <Box
                flex={1}
                alignItems="flex-start"
                paddingLeft={responsiveWidth(2.5)}
                borderRadius={responsiveWidth(3)}
                bg="warmGray.300"
                borderColor={"warmGray.400"}
                borderWidth={responsiveWidth(0.5)}
              >
                <Text fontSize={responsiveFontSize(2.2)} color={"warmGray.500"}>
                  {selectedItem?.format}
                </Text>
              </Box>
            </Box>
            <Box flex={3}></Box>
          </Box>

          <Box flex={0.1}></Box>
          <Box flex={1} flexDirection="row">
            <Box flex={1} justifyContent="flex-end">
              <Avatar
                alignSelf={"center"}
                height={responsiveHeight(3)}
                width={responsiveWidth(6)}
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              ></Avatar>
              {/* <Box flex={1} bg="warmGray.100" alignItems={"flex-end"}></Box> */}
            </Box>
            <Box flex={8}>
              <Box
                flex={1}
                alignItems="flex-start"
                paddingLeft={responsiveWidth(2.5)}
                borderRadius={responsiveWidth(3)}
                bg="warmGray.300"
                borderColor={"warmGray.400"}
                borderWidth={responsiveWidth(0.5)}
              >
                <Text fontSize={responsiveFontSize(2.2)} color={"warmGray.500"}>
                  Document
                </Text>
              </Box>
            </Box>
            <Box flex={3}></Box>
          </Box>
          <Box flex={0.1}></Box>
          <Box flex={1} flexDirection="row">
            <Box flex={8}></Box>
            <Box flex={4}></Box>
          </Box>

          <Box flex={0.1}></Box>
          <Box flex={1} flexDirection="row">
            <Box flex={3}></Box>
            <Box flex={8}>
              <Box
                flex={1}
                alignItems="flex-end"
                paddingRight={responsiveWidth(2.5)}
                borderRadius={responsiveWidth(3)}
                bg="warmGray.300"
                borderColor={"warmGray.400"}
                borderWidth={responsiveWidth(0.5)}
              >
                <Text fontSize={responsiveFontSize(2.2)} color={"warmGray.500"}>
                  {selectedItem?.format}
                </Text>
              </Box>
            </Box>
            <Box flex={1}></Box>
          </Box>
          <Box flex={0.1}></Box>
          <Box flex={1} flexDirection="row">
            <Box flex={3}></Box>
            <Box flex={8}>
              <Box
                flex={1}
                alignItems="flex-end"
                paddingRight={responsiveWidth(2.5)}
                borderRadius={responsiveWidth(3)}
                bg="warmGray.300"
                borderColor={"warmGray.400"}
                borderWidth={responsiveWidth(0.5)}
              >
                <Text fontSize={responsiveFontSize(2.2)} color={"warmGray.500"}>
                  This is reply
                </Text>
              </Box>
            </Box>
            <Box flex={1} justifyContent="flex-end">
              <Avatar
                alignSelf={"center"}
                height={responsiveHeight(3)}
                width={responsiveWidth(6)}
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              ></Avatar>
            </Box>
          </Box>
          <Box flex={1}></Box>
          <Box flex={1} alignItems="center" flexDirection="row">
            <Box flex={10}>
              <Input
                bgColor={"warmGray.300"}
                size="md"
                placeholder={selectedItem.name}
                fontSize={responsiveFontSize(2.2)}
                borderRadius={responsiveWidth(3)}
                borderColor={"warmGray.400"}
                borderWidth={responsiveWidth(0.5)}
              />
            </Box>
            <Box flex={0.2}></Box>
            <Box flex={1} justifyContent={"center"}>
              <Icon
                as={Entypo}
                name="attachment"
                color="warmGray.500"
                size={"lg"}
                justifyContent={"center"}
                alignItems={"center"}
              />
            </Box>
            <Box flex={1} justifyContent={"center"}>
              <Icon
                as={Feather}
                name="send"
                color="warmGray.500"
                size={"lg"}
                justifyContent={"center"}
                alignItems={"center"}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
})

/* 


 */
