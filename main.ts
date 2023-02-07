import Instance from "./src/platform.ts";
import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

await new Command()
  .name("wpack")
  .version("0.1.1")
  .description("Application packager dwm")
  .command("compile <source:string>", "compiles a dwm application")
  .option(
    "-o, --output [PATH_OF_FILE:string]",
    "output location of the exacutable",
  )
  .action(async ({ output }, source: string) => {
    const instance = new Instance(source);

    await instance.compile([
      "--unstable",
      "-Ar",
    ]);
    await instance.windowify();
    if (typeof output === "string") {
      instance.rename(output);
    }
  })
  .parse(Deno.args);
