import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  Pressable,
  Spinner,
  Text,
} from "native-base"
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
import { usePlayingToysContext } from "../../Context/PlayingToysContext"

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

    isFour,
    isExist,
    btnFour,
  } = useAnganwadiSuvidhaContext()
  const {
    // onChangeImageFile,
    isLodingImage,
    // onChangeImage,
    imageName,
    setToyName,
    toyName,
    isUpdate,
    onUpdatedToy,
    imageName2,
    setAnotherOneImage,
    setIconImage,
    executeLoaderIcon,
    exectuteLoaderImage,
    isLodingImage2,
    setIsLodingImage,
    setIsLodingImage2,
  } = usePlayingToysContext()
  const { onChangeImage, onChangeImageFile, getResponseToTheUploadedFile } =
    useCommanContextContext()
  console.log("imageNameimage", imageName2, imageName)
  return (
    <Modal.Content maxWidth={maxWidth}>
      <Modal.CloseButton  />
      <Modal.Body>
        <Box flex={1} flexDirection="column">
          <Box flex={1}>
            <Modal.Header flex={1} justifyItems="center" alignContent="center" alignItems="center">
              <Text fontSize={responsiveFontSize(2.9)} fontWeight={700} color="#ff9900">
                नवीन खेळणी टाका
              </Text>
            </Modal.Header>
          </Box>
          <Box flex={11} flexDirection="column">
            <Box flex={1} justifyContent="center" padding={responsiveWidth(1)}>
              <FormControl.Label style={{ alignItems: "flex-start", alignContent: "flex-start" }}>
                <Text textAlign={"left"}>खेळण्याचं नाव:</Text>
              </FormControl.Label>
              <Input
                size="md"
                placeholder="खेळण्याचं नाव"
                value={toyName}
                onChangeText={(text: any) => setToyName(text)}
              />
            </Box>

            <Box flex={1} flexDirection="row">
              <Box flex={1}>
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
                    {isLodingImage == false ? (
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyItems="center"
                        justifyContent="center"
                      >
                        {imageName && (
                          <Image
                            style={{ height: "100%", width: responsiveWidth(26) }}
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
                  <Text fontWeight="600" color="gray.500">
                    आयकॉन छायाचित्र
                  </Text>
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
                              setIsLodingImage(true)
                              onChangeImageFile(
                                getResponseToTheUploadedFile,
                                setIconImage,
                                executeLoaderIcon,
                              )
                            }}
                          >
                            {/* <MaterialCommunityIcons size={responsiveWidth(8)} name="camera" /> */}
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
                              setIsLodingImage(true)
                              onChangeImage(
                                getResponseToTheUploadedFile,
                                setIconImage,
                                executeLoaderIcon,
                              )
                            }}
                          >
                            {/* <MaterialCommunityIcons size={responsiveWidth(8)} name="image" /> */}
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
              </Box>
              <Box flex={1}>
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
                    {isLodingImage2 == false ? (
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyItems="center"
                        justifyContent="center"
                      >
                        {imageName2 && (
                          <Image
                            style={{ height: "100%", width: responsiveWidth(26) }}
                            source={{
                              uri: imageName2,
                            }}
                            resizeMode="cover"
                          />
                        )}
                      </Box>
                    ) : (
                      <Spinner size="lg" />
                    )}
                  </Box>
                  <Text fontWeight="500" color="gray.500">
                    खेळणी छायाचित्र
                  </Text>
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
                              setIsLodingImage2(true)
                              onChangeImageFile(
                                getResponseToTheUploadedFile,
                                setAnotherOneImage,
                                exectuteLoaderImage,
                              )
                            }}
                          >
                            {/* <MaterialCommunityIcons size={responsiveWidth(8)} name="camera" /> */}
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
                              setIsLodingImage2(true)
                              onChangeImage(
                                getResponseToTheUploadedFile,
                                setAnotherOneImage,
                                exectuteLoaderImage,
                              )
                            }}
                          >
                            {/* <MaterialCommunityIcons size={responsiveWidth(8)} name="image" /> */}
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
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant="ghost"
            disabled={isLodingImage || isLodingImage2}
            colorScheme="blueGray"
            onPress={() => {
              cancelButton()
            }}
          >
            <Text fontSize={responsiveFontSize(2)} color="gray.900" fontWeight={650}>
              रद्द करा
            </Text>
          </Button>
          {isUpdate ? (
            <Button
              disabled={isLodingImage || isLodingImage2}
              onPress={() => {
                onUpdatedToy()
              }}
            >
              <Text fontSize={responsiveFontSize(2)} color="gray.200" fontWeight={650}>
                अपडेट करा
              </Text>
            </Button>
          ) : (
            <Button
              disabled={isLodingImage || isLodingImage2}
              onPress={() => {
                submitButton()
              }}
            >
              <Text fontSize={responsiveFontSize(2)} color="gray.200" fontWeight={650}>
                सबमिट करा
              </Text>
            </Button>
          )}
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
