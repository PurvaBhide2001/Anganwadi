import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react"
import { ListAllApi } from "../api/ListAllApi"
import { navigate } from "../navigators"

interface SuchanaContextInterface {
  suchanaData: any[]
  colorData: any[]
  setSelectedScuchanaItem: Function
  selectedScuchanaItem: any
  showByParticularSuchana: Function
  selectedColorData: any
  resourceData: any[]
  suchana: any[]
  onRefreshSuchana: Function
  refereshSuchna: boolean
}
const SuchanaContext = createContext<null | SuchanaContextInterface>(null)

type SuchanaContextProps = { children: React.ReactNode }

export const SuchanaContextProvider = ({ children }: SuchanaContextProps) => {
  const [selectedScuchanaItem, setSelectedScuchanaItem] = useState<any>(null)
  const [selectedColorData, setSelectedColorData] = useState<any>(null)
  const [suchana, setSuchana] = useState<any[]>([])
  const [refereshSuchna, setRefereshSuchna] = useState<boolean>(false)

  const getSuchanaList = useCallback(async () => {
    const { result: { data: { data = [] } = {} } = {} } = await ListAllApi.getSuchanaList()
    console.log(data)

    data && setSuchana(data)
  }, [])
  const onRefreshSuchana = useCallback(async () => {
    setRefereshSuchna(true)
    await getSuchanaList()
    setTimeout(() => {
      setRefereshSuchna(false)
    }, 2000)
  }, [])
  useEffect(() => {
    ;(async () => {
      await getSuchanaList()
    })()
  }, [])

  const [suchanaData] = useState<any>([
    {
      id: 1,
      title:
        "बाल न्याय (मुलांची काळजी व संरक्षण) अधिनियम, 2015 च्या अनुषंगाने बालकांची काळजी घेणा-या संस्थांकरिता नोंदणी प्रमाणपत्रासाठी करावयाच्या Online अर्जाबाबतचे परिपत्रक दि. 8.5.2018",
      desc: "महाराष्ट्र राज्य बाल न्याय (मुलाांची काळजी व सांरक्षण ) धियम, 2018 धद 13.3.2018 च्या अधिसूचिेद्वार अधिसूधचत करण्यात आले आहेत. सदर धियमामध्ये बाल न्याय (मुलाांची काळजी व सांरक्षण) अधिधियम, 2000/ 2006 अन्वये िोंदणीकृ त असलेल्या सांस्ाांच्या िोंदणी प्रमाणपत्राची मुदत धियम लार्ू झालेपासूि एक वर्षे इतकी आहे. सदर तरतूद लक्षात घेता, बाल न्याय (मुलाांची काळजी व सांरक्षण) अधिधियम,2015 च्या धियमाांतर्गत सवग शासकीय आधण सवयांसेवी सांस्ाांिी बालर्ृहाांसाठी धवहीत मुदत सांपुष्ट्टात येण्याच्या आत पुन्हा िोंदणी अजग करणेसाठी online सुधविा धवकधसत करणेबाबत आवश्यक सूचिा सांदभग क्र. 2 च्या पत्रान्वये देण्यात आल्या आहेत. त्यािुसार मधहला व बाल धवकास धवभार्ाच्या सांके तस्ळावर धद. 20.5.2018 पयंत सवग कायगरत तसेच इच्छुक अशासकीय/सवयांसेवी सांस्ाांकडूि online अजग करणेबाबत जाधहरात देण्यात आली आहे तसेच online प्रधक्रया सुरू करण्यात आली आहे.  िोंदणी प्रमाणपत्राच्या online प्रधक्रयेच्या अिुर्षांर्ािे आता असे सपष्ट्ट करण्यात येते की, इच्छु क अशासकीय/सवयांसेवी सांस्ाांकडूि online पद्धतीिे अजग करतािा काही अत्यांत अपधरहायग कारणामुळे अडचणी उद्भवत असल्यास सांबांधित सांस्ा offline पद्धतीिे धवहीत िमुन्यात आवश्यक दसताऐवजाांसह अजग सादर करू शकतील. मात्र सदर offline अजग हा सांबांधित धजल्याच्या धजल्हा मधहला व बाल धवकास अधिकारी याांिी सवग आवश्यक बाबी पधरपूणग आहेत याची खात्री करूि त्यािुसार प्रमाधणत करूि आयुक्त, मधहला व बाल धवकास, मधहला व बाल धवकास आयुक्तालय, पुणे याांचेकडे सादर करावा.सदर offline अजाबाबत सांदभग क्र. 2 च्या पत्रान्वये देण्यात आलेल्या सूचिािुसार पुढील आवश्यक कायगवाही करण्यात यावी.",
      borderColor: "#8da8ec",
      bg: "#f3f6fd",
    },
    {
      id: 2,
      title: "	एक बालगृह दत्तक घेणे",
      desc: "घर दत्तक घ्या- तरुण जीवनात बदल घडवा आमच्या बालगृहांमध्ये राहून काळजी आणि संरक्षणाची गरज असलेल्या मुलांना मदत करणे हे आमचे ध्येय आहे! असुरक्षित आणि आधाराची गरज असलेल्या या मुलांना मदत करण्यासाठी आपण एकत्र काम केल्यास काहीही शक्य आहे. आमचे ध्येय आमच्या बालगृहांपैकी एक येथे एक कार्य पूर्ण करणे आहे जे तेथे राहणाऱ्या मुलांच्या जीवनात बदल घडवून आणण्यास मदत करते. कॉर्पोरेट्स/बिझनेस हाऊसेस/संस्था आणि व्यक्तींनी दत्तक गृह कार्यक्रम अंतर्गत दिलेला पाठिंबा त्यांच्या शारीरिक, भावनिक, बौद्धिक, सामाजिक आणि नैतिक विकासात वाढ करेल. प्रत्येक मूल त्याच्या/तिच्या पूर्ण क्षमतेपर्यंत पोहोचण्यासाठी प्रेम आणि काळजी घेण्यास पात्र आहे.",
      borderColor: "#eba3bb",
      bg: "#f6edf0",
    },
    {
      id: 3,
      title: "महाराष्ट्राचा पोषण संकल्प, सदृढ बालक, स ुदृढ महाराष्ट्र",
      desc: "महाराष्ट्र हे दशात प े रोगामी आणि विकसित राज्य म्हणून गणले जाते. महाराष्ट्राने मागील पधरा ं वर्षात किशोरी, माता, बालके यांच्या पोषणात सधारणा करण्यासाठी अनेक उपक्रम राबविले आहेत. या मध्ये राजमाता जिजाऊ, माता-बाल आरोग्य पोषण मिशनची स्थापना राज्यात करण्यात आली. हेमिशन यनिसु ेफच्या तांत्रिक व आर्थिक साहाय्याने २००५ मध्ये सरु करण ्यात आले. बालकातील कुपोषणाचे प्रमाण कमी करणे व कुपोषणामळुे होणाऱ्या बालमतृ्यूचे प्रमाण कमी करणेया उद्देशाने स्वतंत्र मिशनची स्थापना करणार महाराष्ट्र ह े े दशातील प े हिले राज्य होते. या वरून पोषणाच्या प्रति प्रबळ राजकीय इच्छाशक्ती दिसून येते.अशा प्रकारच्या विविध उपक्रमांमळुे कालांतराने राज्याच्या पोषणात सधार ु णा झाली आहे. प्रस्तुत प्र ्तु यत्नानंतरही महाराष्ट्रात पाच वर्षाखालील ३४% बालकांची उंची त्यांच्या वयाच्या मानाने कमी आहे असे दशपातळी े वर झालेल्",
      borderColor: "#97c952",
      bg: "#ecfed3",
    },
  ])

  const [resourceData] = useState<any>([
    {
      id: 1,
      title: "Here is the title 1",

      borderColor: "#8da8ec",
      bg: "#f3f6fd",
    },
    {
      id: 2,
      title: "Here is the title 2",
      desc: "विविध राज्यांनी स्थलांतरित विद्यार्थ्यांना शिक्षण देण्यासाठी विविध योजना आखल्या आहेत.",
      borderColor: "#eba3bb",
      bg: "#f6edf0",
    },
    {
      id: 3,
      title: "Here is the title 3",
      desc: "विविध राज्यांनी स्थलांतरित विद्यार्थ्यांना शिक्षण देण्यासाठी विविध योजना आखल्या आहेत.",
      borderColor: "#97c952",
      bg: "#ecfed3",
    },
  ])

  const [colorData] = useState<any[]>([
    {
      borderColor: "#97c952",
      bg: "#ecfed3",
    },
    {
      borderColor: "#eba3bb",
      bg: "#f6edf0",
    },
    {
      borderColor: "#8da8ec",
      bg: "#f3f6fd",
    },
    {
      borderColor: "#fceca2",
      bg: "#fcf4cf",
    },
    // {
    //   borderColor: "#97c952",
    //   bg: "#ecfed3",
    // },
    // {
    //   borderColor: "#97c952",
    //   bg: "#ecfed3",
    // },
  ])

  const showByParticularSuchana = (data: any, colorData: any) => {
    setSelectedScuchanaItem(data)
    setSelectedColorData(colorData)
    navigate("ShowParticularSuchana")
  }
  const value: SuchanaContextInterface = {
    suchanaData,
    colorData,
    setSelectedScuchanaItem,
    selectedScuchanaItem,
    showByParticularSuchana,
    selectedColorData,
    resourceData,
    suchana,
    onRefreshSuchana,
    refereshSuchna,
  }
  return <SuchanaContext.Provider value={value}>{children}</SuchanaContext.Provider>
}

export const useSuchanaContext = () => {
  const context = useContext(SuchanaContext)
  if (!context) throw Error("use Suchana context in  home screen context provider!!")
  return context
}

//comment
