import { babel } from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { DEFAULT_EXTENSIONS } from '@babel/core'

import pkg from './package.json'

const external = [...Object.keys(pkg.dependencies || {})]
const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return (id) => pattern.test(id)
}
export default {
  input: 'src/index.ts',

  output: [
    { file: pkg.main, name: pkg.name, format: 'cjs' },
    { file: pkg.module, format: 'esm' }
  ],
  external: makeExternalPredicate(external),
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      plugins: [['@babel/plugin-transform-runtime', { regenerator: true, corejs: 3 }]]
    }),
  ]
}
