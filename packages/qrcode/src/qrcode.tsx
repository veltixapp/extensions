import QRCodeStyling from 'qr-code-styling'
import { useEffect, useState } from 'react'

export const QrCode = (props: { text: string }) => {
  const [src, setSrc] = useState('https://veltix.app')

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
