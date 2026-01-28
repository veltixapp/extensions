import { Box as BoxIcon } from 'lucide-react'
import { Veltix } from '@veltix/types'
import { OpenmojiViewContainer } from './openmoji-view-container'
import { manifest } from './manifest'

export const openmojiExtension: Veltix.Extension = {
  id: 'openmoji',
  title: '%title%',
  icon: BoxIcon,
  main: OpenmojiViewContainer,
  activate: () => { },
  exports: [manifest],
  locales: {
    en: {
      "title": "Openmoji"
    },
    "zh-CN": {
      "title": "表情"
    }
  }
}

export default openmojiExtension
