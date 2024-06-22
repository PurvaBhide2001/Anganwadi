import { Box, Text, Image, Avatar, Icon, Link } from "native-base"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import Fontisto from "react-native-vector-icons/Fontisto"
import Octicons from "react-native-vector-icons/Octicons"
import { useSansadhaneContext } from "../../../Context/SansadhaneContext"
import { navigate } from "../../../navigators"

// import { useSuchanaContext } from "../../Context/SuchanaContext"
// import { randIntWithZero } from "../../filter/requireFunction"
// import { navigate } from "../../navigators"
interface IProps {
  title: string
  desc: string
  borderColor: string
  bg: string
}

export default ({ item }: any) => {
  const icon = require("../../../../assets/surveyimages/Suchana/resource.png")
  //   const [currentColor, setCurrentColor] = useState(initialColor)
  const { onSelectSansadhan } = useSansadhaneContext()
  return (
    <Box width="100%" padding={responsiveWidth(1.8)}>
      <Box flex={1}>
        <Box
          flex={1}
          flexDirection="row"
          height={responsiveHeight(16)}
          borderRadius={responsiveWidth(3)}
          bg="white"
          shadow={4}
        >
          <Box flex={1} flexDirection={"column"}>
            <Box flex={1} flexDirection="row">
              <Box flex={0.5}></Box>

              <Box flex={2} paddingTop={responsiveHeight(1)}>
                <Image
                  source={icon}
                  resizeMode="contain"
                  paddingRight={responsiveWidth(2)}
                  height={responsiveHeight(7)}
                  alt="icon"
                />
              </Box>
              <Box flex={1}></Box>
              <Box flex={10} justifyContent="center">
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  fontSize={responsiveFontSize(2.2)}
                  color="#7D8592"
                  padding={responsiveWidth(1.5)}
                  fontWeight={600}
                >
                  {item.title}
                </Text>
              </Box>
            </Box>

            <Box flex={1} flexDirection="row" borderBottomRadius={responsiveWidth(3)} bg={item.bg}>
              <TouchableOpacity
                style={{
                  flex: 4,
                  borderRadius: responsiveWidth(1),
                }}
                onPress={() => onSelectSansadhan(item)}
              >
                <Box flex={4} alignItems="center" justifyContent="center">
                  <Text color="#7D8592" fontSize={responsiveFontSize(2)} fontWeight={500}>
                    अधिक माहिती
                  </Text>
                </Box>
              </TouchableOpacity>

              <Box flex={4} justifyContent="center" alignItems={"center"}>
                {item.url ? (
                  <Link color={"blue.600"} href={item.url}>
                    <Text
                      color="blue.800"
                      fontSize={responsiveFontSize(2)}
                      fontWeight={500}
                      textAlign="center"
                    >
                      तपशील लिंक
                    </Text>
                  </Link>
                ) : (
                  ""
                )}
              </Box>
              <Box flex={4}>
                {item.file ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: "100%",
                      height: "100%",

                      shadowOpacity: 3,
                    }}
                  >
                    {/* {schemeInfo.document.endsWith(".pdf") ? ( */}
                    <Box flex={1} padding={responsiveWidth(1.5)} flexDirection="row">
                      <Box
                        bg={"green.400"}
                        flex={3}
                        flexDirection="row"
                        borderRadius={responsiveWidth(2)}
                      >
                        <Box flex={1} alignItems={"center"} justifyContent="center">
                          <Link color={"blue.600"} href={item.file}>
                            <Text
                              color={"white"}
                              justifyContent="flex-end"
                              fontWeight={300}
                              fontSize={responsiveFontSize(2.2)}
                              bold
                            >
                              डाउनलोड
                            </Text>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                    {/* ) : (
                    <Text>{""}</Text>
                  )} */}
                  </TouchableOpacity>
                ) : (
                  <Box
                    style={{
                      flex: 1,
                      width: "100%",
                      height: "100%",
                      shadowOpacity: 3,
                    }}
                  >
                    <Box flex={1} padding={responsiveWidth(1.5)} flexDirection="row">
                      <Box
                        bg={"warmGray.300"}
                        flex={3}
                        flexDirection="row"
                        borderRadius={responsiveWidth(2)}
                      >
                        <Box flex={1} alignItems={"center"} justifyContent="center">
                          <Link color={"blue.600"} href={item.file}>
                            <Text
                              color={"warmGray.400"}
                              justifyContent="flex-end"
                              fontWeight={300}
                              fontSize={responsiveFontSize(2.2)}
                              bold
                            >
                              डाउनलोड
                            </Text>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
