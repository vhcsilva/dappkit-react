import ts from "rollup-plugin-ts";
import commonjs from '@rollup/plugin-commonjs';
import pkg from "./package.json" assert {type: "json"};

export default [
  {
    input: "src/lib/index.ts",
    plugins: [
      ts({tsconfig: "tsconfig.json"}),
      commonjs()
    ],
    output: [
      {
        file: pkg.main,
        format: "cjs"
      },
      {
        file: pkg.module,
        format: "esm"
      }
    ],
    external: [
      /\@web3-react.+/,
      /zustand(.+)?/,
      "@taikai/dappkit",
      "@taikai/rocket-kit",
      /react(.+)?/,
      /styl(is|ed-components)/,
    ],
  },
]