import { Openmoji } from "./openmoji"
import { Veltix } from "@veltix/types"

export default {
  name: "openmoji",
  main: Openmoji as unknown as Veltix.Manifest["main"],
}
