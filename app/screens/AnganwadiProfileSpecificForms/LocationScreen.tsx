import { observer } from "mobx-react-lite"
import { Box, Text } from "native-base"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useLoginContext } from "../../Context/LoginContext"
import { useUserProfileContextContext } from "../../Context/UserProfileContext"
import { AppStackScreenProps, navigate } from "../../navigators"
import SelectDropdown3 from "../../UI/SelectDropdown3"
import { useAddressContext } from "../../Context/AddressContext"
import { useHeader } from "../../utils/useHeader"
import { useMainMenuContext } from "../../Context/MainMenuContext"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { useAnganwadiProfileContext } from "../../Context/AnganwadiProfileContext"
import LocationComponent from "../../components/LocationComponent"
import Spinner from "react-native-loading-spinner-overlay"

interface LocationProps extends AppStackScreenProps<"Location"> {}

export const LocationScreen: FC<LocationProps> = observer(function Location({ navigation }) {
  const [language, setLanguage] = useState("")
  const { control, handleSubmit, watch, onSubmit } = useUserProfileContextContext()
  const { anganwadiList } = useLoginContext()
  const { states, districts, selectedPrakalpa } = useAddressContext()
  const { onRefresh, refereshing } = useMainMenuContext()
  const { isSpinner } = useAnganwadiProfileContext()

  useHeader({
    title: "स्थान",
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
        <Spinner visible={isSpinner} textContent={""} textStyle={{ color: "#FFF" }} />
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box flex={1} flexDirection="row" paddingY={responsiveWidth(3)}>
            <Box flex={1} borderRadius={responsiveWidth(3)}>
              <LocationComponent watch={watch} control={control} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  )
})
