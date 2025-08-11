import { QrCode as QrCodeIcon } from 'lucide-react'
import { Veltix } from '@veltix/types'
import { QrCode } from './qrcode'
import { QrCodeViewContainer } from './qrcode-view-container'

export const qrcodeExtension = {
  id: 'qrcode',
  title: 'QR Code',
  icon: QrCodeIcon,
  viewContainer: QrCodeViewContainer,
  activate: () => {},
  components: [
    {
      type: 'qrcode',
      title: 'QR Code',
      description: 'QR Code',
      defaultProps: {},
      icon: QrCodeIcon,
      main: QrCode
    }
  ] as unknown as Veltix.Manifest[]
}

// Default export for IIFE build
export default {
  qrcodeExtension
}
