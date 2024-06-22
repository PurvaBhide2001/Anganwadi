import { Box } from "native-base"

export default ({ toast, message }: any) => {
  toast.show({
    render: () => {
      return (
        <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
          {message}
        </Box>
      )
    },
  })
}
