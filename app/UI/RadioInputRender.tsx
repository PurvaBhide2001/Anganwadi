// import React, { useState } from "react"
// import { Controller, useForm } from "react-hook-form"
// import { Box, Input, Radio, Text, View } from "native-base"
// import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"

// import { TextInput } from "react-native-gesture-handler"
// import InputField2 from "./InputField2"
// import { useReportContext } from "../Context/ReportContext"

// interface IProps {
//   control: any
//   name: string
//   isDisabled?: boolean
//   defaultValue: any
// }
// export default ({ control, name, defaultValue, isDisabled = false }: IProps) => {
//   console.log("is disable ", isDisabled)
//   const RadioInputRender = () => {
//     const { control, handleSubmit } = useForm()
//     const { ToiletControl, shauchalayStatus, isLoading } = useReportContext()
//     const [selectedOption, setSelectedOption] = useState("")

//     const handleOptionSelect = (value) => {
//       setSelectedOption(value)
//     }

//     const onSubmit = (data) => {
//       console.log(data)
//     }

//     return (
//       <>
      
//         <Box flex={1} paddingY={responsiveWidth(5)}>
//           <Controller
//             defaultValue={defaultValue}
//             control={control}
//             name={name}
//             render={({ field: { onChange, value, onBlur } }) => (
//               <Radio.Group
//                 name="options"
//                 flex={1}
//                 flexDirection="row"
//                 value={value}
//                 onChange={onChange}
//               >
//                 <Box flex={4} paddingLeft={responsiveWidth(8)}>
//                   <Radio value="0" isDisabled={isDisabled}>
//                     <Text color="warmGray.500">होय</Text>
//                   </Radio>
//                 </Box>
//                 <Box flex={4} paddingLeft={responsiveWidth(8)}>
//                   <Radio value="1" isDisabled={isDisabled}>
//                     <Text color="warmGray.500">नाही</Text>
//                   </Radio>
//                 </Box>
//                 <Box flex={1} paddingY={responsiveWidth(1)}></Box>
//               </Radio.Group>
//             )}
//             rules={{
//               required: {
//                 value: true,
//                 message: "Field is required!",
//               },
//             }}
//           />
//         </Box>
//         <Box flex={1} flexDirection="row">
//           <Box
//             flex={1}
//             borderRadius={responsiveWidth(3)}
//             alignContent="flex-end"
//             justifyContent={"center"}
//             padding={responsiveWidth(2)}
//           >
//             <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
//               अंगणवाडी केंद्रामधील शौचालय नादुरुस्त आहे का ?
//             </Text>
//             <Controller
//               defaultValue={defaultValue}
//               control={control}
//               name={name}
//               render={({ field: { onChange, value, onBlur } }) => (
//                 <Radio.Group
//                   name="options"
//                   flex={1}
//                   flexDirection="row"
//                   // value={selectedOptionAvailable}
//                   value={value ? "0" : "1"}
//                   onChange={(selectedValue) => {
//                     onChange(selectedValue === "0")
//                     handleOptionSelect("is_anganwadi_with_toilets", selectedValue)
//                   }}
//                 >
//                   <Box flex={4} paddingLeft={responsiveWidth(8)}>
//                     <Radio value="0">
//                       <Text color="warmGray.500">होय</Text>
//                     </Radio>
//                   </Box>
//                   <Box flex={4} paddingY={responsiveWidth(1)} paddingLeft={responsiveWidth(8)}>
//                     <Radio value="1">
//                       <Text color="warmGray.500">नाही</Text>
//                     </Radio>
//                   </Box>
//                   <Box flex={4} paddingY={responsiveWidth(1)}></Box>
//                 </Radio.Group>
//               )}
//               rules={{
//                 required: {
//                   value: true,
//                   message: "Field is required!",
//                 },
//               }}
//             />
//             {selectedOption === "0" && (
//               <Box flex={1} flexDirection="row">
//                 <Box
//                   flex={4}
//                   borderRadius={responsiveWidth(3)}
//                   alignContent="flex-end"
//                   justifyContent={"center"}
//                   padding={responsiveWidth(2)}
//                 >
//                   <Text fontSize={responsiveFontSize(2.3)} color={"warmGray.500"}>
//                     शौचालय संख्या :
//                   </Text>
//                 </Box>
//                 <Box flex={7} padding={responsiveWidth(2)} borderRadius={responsiveWidth(3)}>
//                   <InputField2
//                     control={ToiletControl}
//                     name={"anganwadi_with_toilets"}
//                     placeholder={"शौचालय"}
//                     keyPadType={"phone-pad"}
//                     variant="underlined"
//                     inputRightElementTopRightRadius={0}
//                     inputRightElementBottomRightRadius={0}
//                     inputRightElementBorderWidth={0}
//                     isDisabled={shauchalayStatus == 200 ? true : false}
//                   />
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </>
//     )
//   }
// }
