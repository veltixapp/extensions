import { QrCode as QrCodeIcon } from 'lucide-react'
import { Veltix } from '@veltix/types'
import { QrCodeViewContainer } from './qrcode-view-container'
import { manifest } from './manifest'

export const qrcodeExtension: Veltix.Extension = {
  id: 'qrcode',
  title: 'QR Code',
  icon: QrCodeIcon,
  viewContainer: QrCodeViewContainer,
  activate: () => {},
  components: [ manifest ]
}

// Default export for IIFE build
export default {
  qrcodeExtension
}
