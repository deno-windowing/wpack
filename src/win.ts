// based on https://github.com/astrodon/astrodon/issues/10
import * as path from "https://deno.land/std@0.170.0/path/mod.ts";
import { readN, view, writeAll } from "./util.ts";

export async function compile(
  file: string,
  flags: string[],
  output?: string,
) {
  const command = new Deno.Command(Deno.execPath(), {
    args: [
      "compile",
      ...flags,
      file,
    ],
    stdin: "null",
    stdout: "null",
  });
  command.spawn();

  const parsedPath = path.parse(file);
  const filePath = parsedPath.name + ".exe";
  const bin = await Deno.open(filePath, { read: true, write: true });
  await bin.seek(0, Deno.SeekMode.Start);
  const magicBytes = await readN(bin, 2);
  if (magicBytes == null) {
    console.error("Encountered EOF at magicBytes");
    Deno.exit(1);
  }
  const binMagic = new TextDecoder().decode(magicBytes);

  if ("MZ" != binMagic) {
    console.error(`${filePath} was not found`);
    Deno.exit(1);
  }
  const PE_ADDRESS_OFFSET = 0x3C;
  await bin.seek(PE_ADDRESS_OFFSET, Deno.SeekMode.Start);
  const peHeaderPointerBytes = await readN(bin, 4);
  if (peHeaderPointerBytes == null) {
    console.error("Encountered EOF at peHeaderPointerBytes");
    Deno.exit(1);
  }
  const peHeaderPointer = view(peHeaderPointerBytes).getUint32(0, true);
  await bin.seek(peHeaderPointer + 92, Deno.SeekMode.Start);
  const SUBSYSTEM_WINDOWS = 2;
  const SUBSYSTEM_CONSOLE = 3;
  const subsystemBytes = await readN(bin, 2);
  if (subsystemBytes == null) {
    console.error("Encountered EOF at subsystemBytes");
    Deno.exit(1);
  }

  const subsystem = view(subsystemBytes).getUint16(0, true);

  if (!(SUBSYSTEM_WINDOWS == subsystem || SUBSYSTEM_CONSOLE == subsystem)) {
    console.error("Oops! The subsystem is not WINDOWS=2 or CONSOLE=3.");
    console.error("We might be editing the wrong field,");
    console.error("the EXE might use a different subsystem.");
    Deno.exit(1);
  }

  const newSubsystemData = new Uint16Array(1);
  view(newSubsystemData).setUint16(0, SUBSYSTEM_WINDOWS, true);
  await bin.seek(peHeaderPointer + 92, Deno.SeekMode.Start);
  await writeAll(bin, newSubsystemData);

  if (output) {
    Deno.rename(filePath, output);
  }
}
