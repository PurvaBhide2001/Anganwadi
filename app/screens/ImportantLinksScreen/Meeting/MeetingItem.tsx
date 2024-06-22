import { Box, Image, Pressable, Text } from "native-base"
import { TouchableOpacity } from "react-native"

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useMeetingContextContext } from "../../../Context/MeetingContext"
import { randIntWithZero } from "../../../filter/requireFunction"
import Icon from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from "react-native-vector-icons/Fontisto"

export default ({ item }: any) => {
  console.log("dateeeeee", item?.date_time)

  const { meetingColorObjArray, onPressToViewParticularDetail, avatarImages } =
    useMeetingContextContext()
  const date = item?.date_time.split(" ")[0]
  const time = item?.date_time.split(" ")[1]

  const colorObject = meetingColorObjArray[randIntWithZero(meetingColorObjArray.length)]
  return (
    <TouchableOpacity
      onPress={() => {
        onPressToViewParticularDetail(item)
      }}
      style={{
        height: responsiveHeight(15),
        padding: responsiveWidth(0.8),
      }}
    >
      <Box flex={1} padding={responsiveWidth(1)}>
        <Box
          flex={1}
          flexDirection="row"
          height={responsiveHeight(10)}
          bgColor={colorObject.backgroundColor}
          borderRadius={responsiveWidth(2)}
          paddingX={responsiveWidth(3)}
          borderLeftWidth={responsiveWidth(2)}
          borderLeftColor={colorObject.leftBorderColor}
        >
          <Box flex={10} flexDirection={"column"}>
            <Box flex={0.1}></Box>
            <Box flex={1.5} flexDirection="row">
              <Text fontSize={responsiveFontSize(2.2)} color="#7D8592" fontWeight={600}>
                {item?.title}
              </Text>
            </Box>
            <Box flex={1} flexDirection={"row"}>
              <Box flex={6} flexDirection="row">
                <Box flex={4} alignItems="center">
                  <Fontisto name="date" size={responsiveWidth(6)} color="gray" />
                </Box>
                <Box flex={10}>
                  <Text fontSize={responsiveFontSize(2.1)} color="warmGray.500" fontWeight={600}>
                    {date}
                  </Text>
                </Box>
              </Box>

              <Box flex={6} flexDirection="row">
                <Box flex={4}>
                  <MaterialCommunityIcons
                    name="clock-time-four-outline"
                    size={responsiveWidth(6)}
                    color="gray"
                  />
                </Box>
                <Box flex={10}>
                  <Text fontSize={responsiveFontSize(2.1)} color="warmGray.500" fontWeight={600}>
                    {time}
                  </Text>
                </Box>
              </Box>
            </Box>
            {/* <Box flex={1} flexDirection="row" style={{ paddingBottom: 10 }}>
              {avatarImages.map((image, index) => (
                <Image
                  style={{
                    height: responsiveHeight(8),
                    width: responsiveWidth(5),
                    marginBottom: 10,
                    marginRight: index === avatarImages.length - 1 ? 0 : 5,
                  }}
                  source={image}
                  resizeMode="contain"
                  alt={"Image"}
                />
              ))}
            </Box> */}
          </Box>

          <Box flex={2} flexDirection="column" alignItems="center">
            <Box flex={0.1}></Box>
            <Icon name="chat" size={30} color={colorObject.leftBorderColor} />
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
