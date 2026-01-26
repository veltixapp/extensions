import { Box as BoxIcon } from "lucide-react"
import { Openmoji } from "./openmoji"
import { Veltix } from "@veltix/types"

export const manifest: Veltix.Manifest = {
  name: "openmoji",
  title: "Openmoji",
  description: "Openmoji",
  defaultProps: {},
  icon: BoxIcon,
  propertiesSchema: {
    sections: [
      {
        title: "Openmoji",
        type: "custom",
        settings: [
          {
            label: "Message",
            name: "message",
            type: "input",
            default: Openmoji.defaultProps.message,
          },
        ],
      },
    ],
  },
  main: Openmoji as unknown as Veltix.Manifest["main"],
}
