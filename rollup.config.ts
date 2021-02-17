import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

import pkg from './package.json'

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: pkg.name, format: 'umd' },
    { file: pkg.module, format: 'esm' },
    { file: pkg.module, format: 'esm' },
  ],
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: 'node_modules/**'
    })
  ]
}
