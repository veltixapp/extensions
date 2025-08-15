import { QrCode as QrCodeIcon } from "lucide-react";
import { QrCode } from "./qrcode";
import { Veltix } from "@veltix/types";

export const manifest: Veltix.Manifest = {
  type: "qrcode",
  title: "QR Code",
  description: "QR Code",
  defaultProps: {},
  icon: QrCodeIcon,
  propertiesSchema: {
    sections: [
      {
        title: "QR Code",
        type: "custom",
        settings: [
          {
            label: "Text",
            name: "text",
            type: "input",
            default: QrCode.defaultProps.text,
          },
        ],
      },
    ],
  },
  main: QrCode as unknown as Veltix.Manifest["main"],
};
