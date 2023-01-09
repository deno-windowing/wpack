import Instance from "./src/compile.ts";
import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

await new Command()
  .name("dwm-pack")
  .version("0.1.0")
  .description("pack dwm")
  .command("compile <source:string>", "compiles a dwm application")
  .option(
    "-o, --output [PATH_OF_FILE:string]",
    "output location of the exacutable",
  )
  .action(async ({ output }, source: string) => {
    const instance = new Instance(source);

    await instance.compile([
      "--unstable",
      "--allow-env",
      "--allow-ffi",
      "--allow-write",
    ]);
    await instance.windowify();
    if (typeof output === "string") {
      instance.rename(output);
    }
  })
  .parse(Deno.args);
