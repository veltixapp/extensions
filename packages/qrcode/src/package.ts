import { QrCode } from "./qrcode";
import { Veltix } from "@veltix/types";

export default {
  name: "qrcode",
  main: QrCode as unknown as Veltix.Manifest["main"],
}
