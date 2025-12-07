import QRCodeStyling from 'qr-code-styling'
import { useState } from 'react'
import { Veltix } from '@veltix/types'

export const QrCodeViewContainer = ({ context }: { context: Veltix.Context }) => {
  const [text, setText] = useState('')

  const upsertQrCode = (base64: string) => {
    // create
    context.editor.createNode(
      {
        position: {
          width: 260,
          height: 260,
        },
        type: 'qrcode',
        props: {
          text,
          src: base64
        }
      }
    )
  }

  const handleGenerate = async () => {
    const qrCodeStyling = new QRCodeStyling({
      data: text
    })

    const blob = await qrCodeStyling.getRawData()
    if (blob) {
      const reader = new FileReader()
      reader.readAsDataURL(blob as Blob)
      reader.onloadend = () => {
        upsertQrCode(reader.result as string)
      }
    }
  }

  return (
    <div className="p-2">
      <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white">
        <span className="bg-gradient-to-r from-cyan-200 to-emerald-600 bg-clip-text text-transparent">QR Code</span>
      </h1>
      <div className="mb-4">
        <textarea
          rows={4}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(event) => setText(event.target.value)}
          value={text}
          placeholder="Enter text to generate QR code"
        />
      </div>
      <button
        onClick={handleGenerate}
        className="mb-2 me-2 w-full rounded-lg bg-[#2557D6] px-5 py-2 text-center text-sm font-medium text-white hover:bg-[#2557D6]/90 focus:outline-none focus:ring-4 focus:ring-[#2557D6]/50 dark:focus:ring-[#2557D6]/50"
        disabled={!text}
      >
        Generate
      </button>
    </div>
  )
}
