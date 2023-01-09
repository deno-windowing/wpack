import { Platform } from "../types.ts";
import { Win } from "./win.ts";

let platform: {
  new (file: string): Platform;
};

switch (Deno.build.os) {
  case "windows":
    platform = Win;
    break;
  default:
    throw new Error(`Unsupported platform: ${Deno.build.os}`);
}

export default platform;
