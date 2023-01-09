# Wpack

[![Tags](https://img.shields.io/github/release/deno-windowing/wpack)](https://github.com/deno-windowing/wpack/releases)
[![Doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/wpack/mod.ts)
[![License](https://img.shields.io/github/license/deno-windowing/wpack)](https://github.com/deno-windowing/wpack/blob/master/LICENSE)

Application packager for [Dwm](https://github.com/deno-windowing/dwm)

## Usage

Since this module depends on unstable FFI API, you need to pass `--unstable`
along with `--allow-ffi`, `--allow-write` and `--allow-env`.

```sh
deno install --unstable --allow-ffi --allow-write --allow-env https://raw.githubusercontent.com/deno-windowing/wpack/main/main.ts -n wpack
```

```sh
wpack compile <file> -o <output-file>
```

## Maintainers

- Dj ([@DjDeveloperr](https://github.com/DjDeveloperr))
- Loading ([@load1n9](https://github.com/load1n9))

## License

[Apache-2.0](./LICENSE) licensed.

Copyright 2023 © The Deno Windowing Team
