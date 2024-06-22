import React, { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
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
  Icon,
  Avatar,
  Square,
} from "native-base"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

const MeetingButton = ({ startTime, particularMeetingInfo }) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const timeDiff = new Date(startTime).getTime() - new Date().getTime()

      const tenMinutesInMs = 10 * 60 * 1000 // 10 minutes in milliseconds

      setIsButtonEnabled(timeDiff <= tenMinutesInMs)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [startTime])

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isButtonEnabled ? "orangered" : "gray", // set the background color based on button's state
        alignItems: "center",
        justifyContent: "center",
        height: responsiveHeight(5.5),
        borderRadius: responsiveWidth(4),
      }}
      disabled={!isButtonEnabled} // disable the button if it is not enabled
    >
      <Link
        _text={{
          fontSize: responsiveFontSize(2.2),
          fontWeight: "500",
          color: "#ffffff",
          textDecoration: "none",
        }}
        href={particularMeetingInfo?.url}
        alignSelf="center"
      >
        बैठकीत सामील व्हा
      </Link>
    </TouchableOpacity>
  )
}

export default MeetingButton
