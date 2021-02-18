import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

import pkg from './package.json'

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: pkg.name, format: 'umd' },
    { file: pkg.module, format: 'esm' }
  ],
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    nodeResolve(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: 'node_modules/**'
    })
  ]
}
