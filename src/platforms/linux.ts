import * as path from "https://deno.land/std@0.170.0/path/mod.ts";
import { Platform } from "../../types.ts";
import { yellow } from "https://deno.land/std@0.170.0/fmt/colors.ts";
export class Linux implements Platform {
  #parsedPath: path.ParsedPath;
  #filePath: string;
  #file: string;
  constructor(file: string) {
    this.#file = file;
    this.#parsedPath = path.parse(file);
    this.#filePath = this.#parsedPath.name;
  }

  async compile(flags: string[]) {
    const command = new Deno.Command(Deno.execPath(), {
      args: [
        "compile",
        ...flags,
        this.#file,
      ],
      stdin: "null",
      stdout: "null",
    });
    const child = command.spawn();
    const _status = await child.status;
  }
  // deno-lint-ignore require-await
  async windowify() {
    console.warn(yellow("Windowify is not available on this platform"));
  }

  rename(dest: string) {
    Deno.rename(this.#filePath, dest);
  }
}
