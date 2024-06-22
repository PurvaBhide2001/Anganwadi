import { ImageResizeMode } from "react-native"
import { ImageSourcePropType } from "react-native"
import { Image } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

interface Iprops {
  src: ImageSourcePropType
  height?: number
  width?: number
  resizeMode?: ImageResizeMode
}
export default ({ src, height = 8, width = 6, resizeMode = "contain" }: Iprops) => {
  return (
    <Image
      style={{ height: responsiveHeight(height), width: responsiveWidth(width) }}
      source={src}
      resizeMode={resizeMode}
    />
  )
}
