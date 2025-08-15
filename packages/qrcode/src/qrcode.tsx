import QRCodeStyling from 'qr-code-styling'
import { useEffect, useState } from 'react'

type QrCodeProps = {
  text: string
}

export const QrCode = (props: QrCodeProps) => {
  const [src, setSrc] = useState(props.text)

  useEffect(() => {
    const qrCodeStyling = new QRCodeStyling({
      data: props.text
    })
    qrCodeStyling.getRawData().then((blob) => {
      if (blob) {
        const reader = new FileReader()
        reader.readAsDataURL(blob as Blob)
        reader.onloadend = () => {
          setSrc(reader.result as string)
        }
      }
    })
  }, [props.text])

  return <div>{src ? <img src={src} alt="QR Code" /> : <div>Loading...</div>}</div>
}

QrCode.defaultProps = {
  text: "https://veltix.app",
};