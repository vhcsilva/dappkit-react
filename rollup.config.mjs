import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules';
import pkg from "./package.json" assert {type: "json"};

export default {
  input: "src/lib/index.ts",
  plugins: [typescript(), postcss({extract: true, writeDefinitions: true}), commonjs()],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
    },
    {
      file: pkg.module,
      format: "esm",
    }
  ]
}