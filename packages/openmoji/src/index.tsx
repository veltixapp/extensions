import { Box as BoxIcon } from 'lucide-react'
import { Veltix } from '@veltix/types'
import { OpenmojiViewContainer } from './openmoji-view-container'
import { manifest } from './manifest'

export const openmojiExtension: Veltix.Extension = {
  id: 'openmoji',
  title: 'Openmoji',
  icon: BoxIcon,
  viewContainer: OpenmojiViewContainer,
  activate: () => {},
  components: [ manifest ]
}

export default {
  openmojiExtension
}
