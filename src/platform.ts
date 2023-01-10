import { Platform } from "../types.ts";
import { Win } from "./platforms/win.ts";
import { Mac } from "./platforms/mac.ts";
import { Linux } from "./platforms/linux.ts";

let platform: {
  new (file: string): Platform;
};

switch (Deno.build.os) {
  case "windows":
    platform = Win;
    break;
  case "darwin":
    platform = Mac;
    break;
  case "linux":
    platform = Linux;
    break;
  default:
    throw new Error(`Unsupported platform: ${Deno.build.os}`);
}

export default platform;
