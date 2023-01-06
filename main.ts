import { compile } from "./src/compile.ts";
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
    await compile(source, [
      "--unstable",
      "--allow-env",
      "--allow-ffi",
      "--allow-write",
    ], typeof output === "string" ? output : undefined);
  })
  .parse(Deno.args);
