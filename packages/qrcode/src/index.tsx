import { QrCode as QrCodeIcon } from 'lucide-react'
import { Veltix } from '@veltix/types'
import { QrCodeViewContainer } from './qrcode-view-container'
import { manifest } from './manifest'

export const qrcodeExtension: Veltix.Extension = {
  id: 'qrcode',
  title: '%title%',
  icon: QrCodeIcon,
  viewContainer: QrCodeViewContainer,
  activate: () => { },
  components: [manifest],
  locales: {
    en: {
      'title': 'QR Code'
    },
    'zh-CN': {
      'title': '二维码'
    }
  }
}

// Default export for IIFE build
export default {
  qrcodeExtension
}
