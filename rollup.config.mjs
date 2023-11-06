import ts from "rollup-plugin-ts";
import commonjs from '@rollup/plugin-commonjs';
import pkg from "./package.json" assert {type: "json"};
import svg from "rollup-plugin-svg";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const commonPlugins = [
  ts({tsconfig: "tsconfig.json"}),
  commonjs(),
  svg()
];

const cjs = {
  input: ["src/lib/index.ts"],
  output: {
    file: pkg.main,
    format: "cjs",
    interop: "auto"
  },
  plugins: commonPlugins,
  external,
};

const es = {
  input: ["src/lib/index.ts"],
  output: {
    file: pkg.module,
    format: "esm",
    interop: "esModule"
  },
  plugins: commonPlugins,
  external,
};

export default [cjs, es];

// export default [
//   {
//     input: "src/lib/index.ts",
//     plugins: [
//       ts({tsconfig: "tsconfig.json"}),
//       commonjs(),
//       svg()
//     ],
//     output: [
//       {
//         file: pkg.main,
//         format: "cjs",
//         interop: "compat"
//       },
//       {
//         file: pkg.module,
//         format: "esm",
//         interop: "compat"
//       }
//     ],
//     external: [
//       ...Object.keys(pkg.dependencies || {}),
//       ...Object.keys(pkg.peerDependencies || {}),
//     ],
//   },
// ]