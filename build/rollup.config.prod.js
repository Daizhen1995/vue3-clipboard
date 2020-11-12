import path from 'path'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const inputPath = path.resolve(__dirname, '../src/index.js')
const umdOutputPath = path.resolve(__dirname, '../dist/vue3-clipboard.min.js')
const cjsOutputPath = path.resolve(__dirname, '../dist/vue3-clipboard-cjs.min.js')
const esOutputPath = path.resolve(__dirname, '../dist/vue3-clipboard-es.min.js')

export default {
  input: inputPath,
  output: [
    { file: umdOutputPath, format: 'umd', name: 'Vue3Clipboard' },
    { file: cjsOutputPath, format: 'cjs' },
    { file: esOutputPath, format: 'es' },
  ],
  plugins: [commonjs(), resolve(), babel(), terser()],
}
