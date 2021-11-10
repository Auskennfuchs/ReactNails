import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// automatically exlude peer dependencies from build
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser'
import renameNodeModules from "rollup-plugin-rename-node-modules";

import pkg from "./package.json";

// Array of extensions to be handled by babel
const EXTENSIONS = [".ts", ".tsx"];

// Excluded dependencies - dev dependencies
const EXTERNAL = Object.keys(pkg.devDependencies);

const baseRollupConfig = {
    input: ["src/index.ts"],  // What files we build?
    plugins: [
        typescript({
            tsconfig: './tsconfig.build.json',
            outputToFilesystem: true,
        }),
        peerDepsExternal(),  // https://rollupjs.org/guide/en/#peer-dependencies
        //        commonJs(),
        nodeResolve(),  // Resolves node modules
        renameNodeModules('ext'),
        babel({
            extensions: EXTENSIONS,  // Compile our TypeScript files
            babelHelpers: "inline",  // Place babel helper functions in the same file they were used
            include: EXTENSIONS.map(ext => `src/**/*${ext}`)
        }),
        terser(),
    ],
    external: EXTERNAL  // https://rollupjs.org/guide/en/#peer-dependencies
}

const esmOutput = {
    ...baseRollupConfig,
    output: [{
        dir: "dist/",  // Directory where rollup.js will put the built files
        sourcemap: true,  // We want a source map to trace the original code
        format: "esm",  // Built files will follow ES Module format
        preserveModules: true,  // This one is important for treeshaking features of our library                
    },
    {
        dir: "dist",
        sourcemap: true,  // We want a source map to trace the original code
        format: "cjs",  // Built files will follow ES Module format
        preserveModules: false,  // This one is important for treeshaking features of our library                
        //        file: "dist/index.cjs"
        entryFileNames: "[name].cjs"
    }],
}

export default esmOutput;