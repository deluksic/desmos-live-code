import { defineConfig } from "vite";
import { desmosLivePlugin } from "./plugins/desmosLivePlugin";

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      name: "desmosLive",
      fileName: "desmos-live",
      formats: ["iife"],
    },
    watch: {}, // enable watch mode
  },
  plugins: [desmosLivePlugin({
    target: 'geometry',
    expressionsCollapsedByDefault: true,
  })],
});
