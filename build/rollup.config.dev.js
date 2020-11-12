import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const inputPath = path.resolve(__dirname, '../src/index.js')
const umdOutputPath = path.resolve(__dirname, '../dist/vue3-clipboard.js')
const cjsOutputPath = path.resolve(__dirname, '../dist/vue3-clipboard-cjs.js')
const esOutputPath = path.resolve(__dirname, '../dist/vue3-clipboard-es.js')

export default {
  input: inputPath,
  output: [
    {
      file: umdOutputPath,
      format: 'umd',
      name: 'Vue3Clipboard',
    },
    { file: cjsOutputPath, format: 'cjs' },
    { file: esOutputPath, format: 'es' },
  ],
  plugins: [commonjs(), resolve(), babel()],
}
