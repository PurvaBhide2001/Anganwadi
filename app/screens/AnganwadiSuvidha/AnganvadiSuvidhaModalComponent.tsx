import { Box, Button, Heading, Input, Modal, Pressable, Spinner, Text } from "native-base"
import { TouchableOpacity, Image } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"
import { useAnganwadiSuvidhaContext } from "../../Context/AnganwadiSuvidhaContext"
import { useCommanContextContext } from "../../Context/CommanContext"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import TwoButtonsGroup from "./TwoButtonsGroup"
interface Iprops {
  maxWidth: number
  isShowModal: boolean
  closeModal: Function
  cancelButton: Function
  submitButton: Function
}
export default ({ maxWidth, isShowModal, closeModal, cancelButton, submitButton }: Iprops) => {
  const {
    btnOne,
    setBtnOne,
    btnTwo,
    setBtnTwo,
    btnThree,
    setBtnFour,
    setBtnThree,

    imageName,

    isFour,
    isExist,
    btnFour,
    isLoadingImage,
    exectuteLoaderImage,
    executeSetImage,
    setIsImageLoading,
  } = useAnganwadiSuvidhaContext()

  const { getResponseToTheUploadedFile, onChangeImageFile, onChangeImage } =
    useCommanContextContext()
  return (
    <Modal.Content maxWidth={maxWidth}>
      <Modal.CloseButton />
      <Modal.Body>
        <Box flex={1} flexDirection="column">
          <Box flex={1}>
            <Modal.Header flex={1} justifyItems="center" alignContent="center" alignItems="center">
              <Text fontSize={responsiveFontSize(2.9)} fontWeight={700} color="#ff9900">
                स्थिती
              </Text>
            </Modal.Header>
          </Box>
          <Box flex={11} flexDirection="column">
            <Box flex={1} padding={responsiveWidth(2)} height={responsiveHeight(8)}>
              <Pressable
                height="100%"
                onPress={() => {
                  setBtnOne(true)
                  setBtnTwo(false)
                  setBtnThree(false)
                  setBtnFour(false)
                }}
              >
                <Box
                  flex={1}
                  bgColor={btnOne ? "green.300" : "gray.200"}
                  padding={responsiveWidth(2)}
                  borderRadius={responsiveWidth(1)}
                >
                  <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
                    वापरास योग्य
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Box flex={1} padding={responsiveWidth(2)} height={responsiveHeight(8)}>
              <Pressable
                height="100%"
                onPress={() => {
                  setBtnOne(false)
                  setBtnTwo(true)
                  setBtnThree(false)
                  setBtnFour(false)
                }}
              >
                <Box
                  flex={1}
                  bgColor={btnTwo ? "green.300" : "gray.200"}
                  padding={responsiveWidth(2)}
                  borderRadius={responsiveWidth(1)}
                >
                  <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
                    तात्काळ दुरुस्तीची गरज
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Box flex={1} padding={responsiveWidth(2)} height={responsiveHeight(8)}>
              <Pressable
                height="100%"
                onPress={() => {
                  setBtnOne(false)
                  setBtnTwo(false)
                  setBtnThree(true)
                  setBtnFour(false)
                }}
              >
                <Box
                  flex={1}
                  bgColor={btnThree ? "green.300" : "gray.200"}
                  padding={responsiveWidth(2)}
                  borderRadius={responsiveWidth(1)}
                >
                  <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
                    वापरास अयोग्य
                  </Text>
                </Box>
              </Pressable>
            </Box>

            <Box flex={1} padding={responsiveWidth(2)} height={responsiveHeight(8)}>
              <Pressable
                height="100%"
                onPress={() => {
                  setBtnOne(false)
                  setBtnTwo(false)
                  setBtnThree(false)
                  setBtnFour(true)
                }}
              >
                <Box
                  flex={1}
                  bgColor={btnFour ? "green.300" : "gray.200"}
                  padding={responsiveWidth(2)}
                  borderRadius={responsiveWidth(1)}
                >
                  <Text fontSize={responsiveFontSize(1.9)} fontWeight={700} color="#414141">
                    उपलब्ध नाही
                  </Text>
                </Box>
              </Pressable>
            </Box>
            {btnFour == false ? (
              <>
                <Box
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  padding={responsiveWidth(1)}
                >
                  <Box
                    flex={1}
                    height={responsiveHeight(15)}
                    width={responsiveWidth(28)}
                    borderRadius={responsiveWidth(2)}
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center"
                    bgColor="gray.200"
                  >
                    {isLoadingImage === false ? (
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyItems="center"
                        justifyContent="center"
                      >
                        {imageName && (
                          <Image
                            style={{ height: "100%", width: responsiveWidth(30) }}
                            source={{
                              uri: imageName,
                            }}
                            resizeMode="cover"
                          />
                        )}
                      </Box>
                    ) : (
                      <Spinner size="lg" />
                    )}
                  </Box>
                </Box>
                <Box
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  padding={responsiveWidth(1)}
                  flexDirection="row"
                >
                  <Box flex={1} flexDirection="row">
                    <Box flex={2}> </Box>
                    <Box
                      flex={3}
                      height={responsiveHeight(10)}
                      width={responsiveWidth(17)}
                      borderRadius={responsiveWidth(2)}
                      padding={responsiveWidth(2)}
                    >
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <TouchableOpacity
                            disabled={isExist}
                            onPress={() => {
                              setIsImageLoading(true)
                              onChangeImageFile(
                                getResponseToTheUploadedFile,
                                executeSetImage,
                                exectuteLoaderImage,
                              )
                            }}
                          >
                            <Image
                              style={{ height: responsiveHeight(8), width: responsiveWidth(6) }}
                              source={require("../../../assets/surveyimages/icon/camera.png")}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </Box>
                      </Box>
                    </Box>
                    <Box flex={3} borderRadius={responsiveWidth(2)}>
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                        // bgColor="gray.200"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <TouchableOpacity
                            disabled={isExist}
                            onPress={() => {
                              setIsImageLoading(true)
                              onChangeImage(
                                getResponseToTheUploadedFile,
                                executeSetImage,
                                exectuteLoaderImage,
                              )
                            }}
                          >
                            <Image
                              style={{ height: responsiveHeight(8), width: responsiveWidth(6) }}
                              source={require("../../../assets/surveyimages/icon/gallery.png")}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </Box>
                      </Box>
                    </Box>
                    <Box flex={2}> </Box>
                  </Box>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            disabled={isLoadingImage}
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => {
              cancelButton()
            }}
          >
            <Text fontSize={responsiveFontSize(2)} color="gray.900" fontWeight={650}>
              रद्द करा
            </Text>
          </Button>
          <Button
            backgroundColor={isLoadingImage ? "gray.500" : "red.400"}
            disabled={isLoadingImage}
            onPress={() => {
              submitButton()
            }}
          >
            <Text fontSize={responsiveFontSize(2)} color="gray.200" fontWeight={650}>
              सबमिट करा
            </Text>
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
