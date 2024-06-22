import { Box, Button, Spinner, Image, Input, Modal, Pressable, Text, TextArea } from "native-base"
import { TouchableOpacity } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useImdediateInfoContext } from "../../Context/ImdediateInfoContext"
import { useCommanContextContext } from "../../Context/CommanContext"
interface Iprops {
  maxWidth: number
  isShowModal: boolean
  closeModal: Function
  cancelButton: Function
  submitButton: Function
  title: string
}
export default ({
  maxWidth,
  isShowModal,
  closeModal,
  cancelButton,
  submitButton,
  title,
}: Iprops) => {
  const {
    // onChangeImage,
    imageName,
    // onChangeImageFile,
    setDescription,
    description,
    isExist,
    isLoadingImage,
    exectuteLoaderImage,
    executeSetImage,
    setIsLoadingImage,
  } = useImdediateInfoContext()

  const { getResponseToTheUploadedFile, onChangeImage, onChangeImageFile } =
    useCommanContextContext()
  return (
    <Modal.Content maxWidth={maxWidth}>
      <Modal.CloseButton />
      <Modal.Body>
        {!isExist ? (
          <>
            <Box flex={1} flexDirection="column">
              <Box flex={1}>
                <Modal.Header
                  flex={1}
                  justifyItems="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Text fontSize={responsiveFontSize(2.9)} fontWeight={700} color="#ff9900">
                    {title}
                  </Text>
                </Modal.Header>
              </Box>
              <Box flex={11} flexDirection="column">
                <Box
                  flex={7}
                  padding={responsiveWidth(2)}
                  height={responsiveHeight(18)}
                  flexDirection="column"
                >
                  <Box flex={1.5}>
                    <Text fontSize={responsiveFontSize(1.8)} fontWeight={700} color="#414141">
                      बांधकाम प्रगती माहिती
                    </Text>
                  </Box>
                  <Box flex={5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(1)}>
                    <TextArea
                      height={responsiveHeight(18)}
                      value={description}
                      borderWidth={responsiveWidth(1)}
                      autoCompleteType={undefined}
                      fontSize={responsiveFontSize(1.8)}
                      onChangeText={(e) => {
                        setDescription(e)
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  flex={4}
                  justifyContent="center"
                  alignItems="center"
                  padding={responsiveWidth(1)}
                >
                  <Box
                    flex={1}
                    height={responsiveHeight(20)}
                    width={responsiveWidth(55)}
                    borderRadius={responsiveWidth(2)}
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center"
                    bgColor="gray.200"
                  >
                    {!isLoadingImage ? (
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyItems="center"
                        justifyContent="center"
                        bg="red.300"
                      >
                        {imageName && (
                          <Image
                            style={{ height: "100%", width: responsiveWidth(55) }}
                            source={{
                              uri: imageName ? `${imageName}` : "",
                            }}
                            alt={"image"}
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
                  <Box flex={2.5}></Box>
                  <Box
                    flex={2}
                    height={responsiveHeight(10)}
                    width={responsiveWidth(17)}
                    borderRadius={responsiveWidth(2)}
                    padding={responsiveWidth(2)}
                  >
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        setIsLoadingImage(true)
                        onChangeImageFile(
                          getResponseToTheUploadedFile,
                          executeSetImage,
                          exectuteLoaderImage,
                        )
                      }}
                    >
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                        bgColor="gray.200"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <MaterialCommunityIcons size={responsiveWidth(8)} name="camera" />
                        </Box>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                  <Box flex={0.5}></Box>
                  <Box
                    flex={2}
                    height={responsiveHeight(10)}
                    width={responsiveWidth(17)}
                    borderRadius={responsiveWidth(2)}
                    padding={responsiveWidth(2)}
                  >
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        setIsLoadingImage(true)
                        onChangeImage(
                          getResponseToTheUploadedFile,
                          executeSetImage,
                          exectuteLoaderImage,
                        )
                      }}
                    >
                      <Box
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                        bgColor="gray.200"
                      >
                        <Box
                          flex={1}
                          alignItems="center"
                          justifyItems="center"
                          justifyContent="center"
                        >
                          <Ionicons size={responsiveWidth(8)} name="images-outline" />
                        </Box>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                  <Box flex={2.5}></Box>
                </Box>
              </Box>
            </Box>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  disabled={isLoadingImage}
                  onPress={() => {
                    cancelButton()
                  }}
                >
                  <Text fontSize={responsiveFontSize(2)} color="gray.900" fontWeight={650}>
                    रद्द करा
                  </Text>
                </Button>
                <Button
                  disabled={isExist || isLoadingImage}
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
          </>
        ) : (
          <Box flex={1} flexDirection="column">
            <Box flex={1}>
              <Modal.Header
                flex={1}
                justifyItems="center"
                alignContent="center"
                alignItems="center"
              >
                <Text fontSize={responsiveFontSize(2.9)} fontWeight={700} color="#ff9900">
                  {title}
                </Text>
              </Modal.Header>
            </Box>
            <Box flex={11} flexDirection="column">
              <Box
                flex={7}
                padding={responsiveWidth(2)}
                height={responsiveHeight(18)}
                flexDirection="column"
              >
                <Box flex={1.5}>
                  <Text fontSize={responsiveFontSize(1.8)} fontWeight={700} color="#414141">
                    बांधकाम प्रगती माहिती
                  </Text>
                </Box>
                <Box flex={5} padding={responsiveWidth(2)} borderRadius={responsiveWidth(1)}>
                  <TextArea
                    height={responsiveHeight(18)}
                    value={description}
                    borderColor={"white"}
                    autoCompleteType={undefined}
                    fontSize={responsiveFontSize(1.8)}
                    onChangeText={(e) => {
                      setDescription(e)
                    }}
                    isReadOnly={true}
                  />
                </Box>
              </Box>
              <Box
                flex={4}
                justifyContent="center"
                alignItems="center"
                padding={responsiveWidth(1)}
              >
                <Box
                  flex={1}
                  height={responsiveHeight(20)}
                  width={responsiveWidth(55)}
                  borderRadius={responsiveWidth(2)}
                  alignItems="center"
                  justifyContent="center"
                  justifyItems="center"
                  bgColor="gray.200"
                >
                  <Box
                    flex={1}
                    alignItems="center"
                    justifyItems="center"
                    justifyContent="center"
                    bg="red.300"
                  >
                    {imageName && (
                      <Image
                        style={{ height: "100%", width: responsiveWidth(55) }}
                        source={{
                          uri: imageName ? `${imageName}` : "",
                        }}
                        alt={"imageNameimageName"}
                        resizeMode="cover"
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Modal.Body>
    </Modal.Content>
  )
}
