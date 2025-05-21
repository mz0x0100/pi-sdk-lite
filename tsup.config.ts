import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  clean: true,
  dts: true,
  sourcemap: true,
  format: ["esm", "cjs", "iife"],
  globalName: "PiSdk",
});
