import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'

import pkg from './package.json'

const external = [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})]

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return (id) => pattern.test(id)
}

export default {
  input: `src/index.ts`,
  // input: `src/index.js`,
  external: makeExternalPredicate(external),
  output: [
    { file: pkg.main, name: pkg.name, format: 'cjs' },
    { file: pkg.module, format: 'esm' }
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript(),
    // babel({
    //   babelHelpers: 'runtime',
    //   // 只转换源代码，不运行外部依赖
    //   exclude: 'node_modules/**',
    //   // babel 默认不支持 ts 需要手动添加
    //   extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    //   plugins: [['@babel/transform-runtime', { regenerator: true }]]
    // }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    nodeResolve(),

    // getBabelOutputPlugin({
    //   allowAllFormats: true,
    //   // babelHelpers: 'runtime',
    //   // helpers: ''
    //   exclude: 'node_modules/**',
    //   // babel 默认不支持 ts 需要手动添加
    //   extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    //   plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]]
    // }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code,
      babelHelpers: 'runtime'
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: 'node_modules/**'
    })
  ]
}
