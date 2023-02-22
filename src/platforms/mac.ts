import * as path from "https://deno.land/std@0.170.0/path/mod.ts";
import { Platform } from "../../types.ts";

export class Mac implements Platform {
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

  async windowify() {
    const parsedPath = path.parse(this.#file);
    await Deno.mkdir(parsedPath.name + ".app", { recursive: true });
    await Deno.rename(
      this.#filePath,
      path.join(parsedPath.name + ".app", this.#parsedPath.name),
    );
  }

  async rename(dest: string) {
    try {
      await Deno.remove(dest + ".app", { recursive: true });
    } catch {
      // no op
    }

    const parsedPath = path.parse(this.#file);
    await Deno.rename(
      path.join(parsedPath.name + ".app", this.#parsedPath.name),
      path.join(parsedPath.name + ".app", dest),
    );
    await Deno.rename(this.#filePath + ".app", dest + ".app");
  }
}
