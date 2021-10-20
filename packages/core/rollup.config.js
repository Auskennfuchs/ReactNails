import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
// automatically exlude peer dependencies from build
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from "./package.json";
import localResolve from 'rollup-plugin-local-resolve'
import typescript from "rollup-plugin-typescript2";

// Array of extensions to be handled by babel
const EXTENSIONS = [".ts", ".tsx"];

// Excluded dependencies - dev dependencies
const EXTERNAL = Object.keys(pkg.devDependencies);

export default {
    input: ["src/index.ts"],  // What files we build?
    output: {
        dir: "dist",  // Directory where rollup.js will put the built files
        sourcemap: true,  // We want a source map to trace the original code
        format: "esm",  // Built files will follow ES Module format
        preserveModules: true  // This one is important for treeshaking features of our library        
    },
    plugins: [
        typescript({
            exclude: ["**/*.test.ts", "**/*.test.d.ts"]
        }),
        peerDepsExternal(),  // https://rollupjs.org/guide/en/#peer-dependencies
        nodeResolve({
            extensions: ['.tsx', '.ts']
        }),  // Resolves node modules
        localResolve(),
        babel({
            extensions: EXTENSIONS,  // Compile our TypeScript files
            babelHelpers: "inline",  // Place babel helper functions in the same file they were used
            include: EXTENSIONS.map(ext => `src/**/*${ext}`)
        })
    ],
    external: EXTERNAL  // https://rollupjs.org/guide/en/#peer-dependencies
};