import { Platform } from "../types.ts";
import * as win from "./win.ts";

let platform: Platform;

switch (Deno.build.os) {
  case "windows":
    platform = win;
    break;
  default:
    throw new Error(`Unsupported platform: ${Deno.build.os}`);
}

const {
  compile,
} = platform;

export { compile };
