import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { StyleProp } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../theme"

import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  SectionList,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { ListItem, Screen, Text } from "../components"
import { isRTL } from "../i18n"
import { DemoTabParamList, DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import * as Demos from "../screens/DemoShowroomScreen/demos"
import { DrawerIconButton } from "../screens/DemoShowroomScreen/DrawerIconButton"
import { Link, RouteProp, useRoute } from "@react-navigation/native"
const logo = require("../../assets/images/logo.png")

import { useNavigation } from "@react-navigation/native"

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  const sectionSlug = item.name.toLowerCase()

  return (
    <View>
      <Link to={`/login`} style={$menuContainer}>
        <Text preset="bold">111{item.name}</Text>
      </Link>
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)

        return (
          <Link key={`section${sectionIndex}-${u}`} to={`/login`}>
            <Text>11{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => {
  return (
    <View>
      <Text onPress={() => handleScroll(sectionIndex)} preset="bold" style={$menuContainer}>
        {item.name}
      </Text>
      {item.useCases.map((u, index) => (
        <Link key={`section${sectionIndex}-${u}`} to={`/home`}>
          <Text>11{u}</Text>
        </Link>
      ))}
    </View>
  )
}
const ShowroomListItem = Platform.select({ web: WebListItem, default: NativeListItem })

export interface DrawerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children?: any
}

/**
 * Describe your component here
 */
export const Drawer = observer(function Drawer(props: DrawerProps) {
  const { style } = props
  const $styles = [$container, style]
  const navigation = useNavigation()
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const drawerRef = useRef<DrawerLayout>()
  const listRef = useRef<SectionList>()
  const menuRef = useRef<FlatList>()
  const progress = useSharedValue(0)

  // handle Web links

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  const handleScroll = (sectionIndex: number, itemIndex = 0) => {
    listRef.current.scrollToLocation({
      animated: true,
      itemIndex,
      sectionIndex,
    })
    toggleDrawer()
  }

  const scrollToIndexFailed = (info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => {
    listRef.current?.getScrollResponder()?.scrollToEnd()
    timeout.current = setTimeout(
      () =>
        listRef.current?.scrollToLocation({
          animated: true,
          itemIndex: info.index,
          sectionIndex: 0,
        }),
      50,
    )
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])
  let Demos = [
    {
      name: "Home",
      data: [
        {
          props: { name: "Harshal" },
        },
      ],
    },
  ]

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])
  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={Platform.select({ default: 326, web: Dimensions.get("window").width * 0.3 })}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      overlayColor={open ? colors.palette.overlay20 : "transparent"}
      onDrawerSlide={(drawerProgress) => {
        progress.value = open ? 1 - drawerProgress : drawerProgress
      }}
      onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
        if (newState === "Settling") {
          progress.value = withTiming(drawerWillShow ? 1 : 0, {
            duration: 250,
          })
          setOpen(drawerWillShow)
        }
      }}
      renderNavigationView={() => (
        <View style={[$drawer, $drawerInsets]}>
          <View style={$logoContainer}>
            <Image source={logo} style={$logoImage} />
          </View>

          <FlatList<{ name: string; useCases: string[] }>
            ref={menuRef}
            contentContainerStyle={$flatListContentContainer}
            data={Object.values(Demos).map((d) => ({
              name: d.name,
              useCases: d.data.map((u) => u.props.name),
            }))}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <ShowroomListItem {...{ item, sectionIndex, handleScroll }} />
            )}
          />
        </View>
      )}
    >
      <View style={$menuContainerNew}>
        <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
      </View>
      {props.children}
    </DrawerLayout>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $menuContainerNew: ViewStyle = {
  paddingTop: spacing.extraLarge,
}
const $drawer: ViewStyle = {
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.massive,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
  paddingHorizontal: spacing.large,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.extraSmall,
  paddingTop: spacing.large,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.medium,
}

const $demoItemDescription: TextStyle = {
  marginBottom: spacing.huge,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.huge,
}
