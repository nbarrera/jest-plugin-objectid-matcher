import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index-cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index-es.js',
      format: 'es',
      sourcemap: true,
    }
  ],
  external: ['mongodb', 'jest'],
  plugins: [
    eslint({
      exclude: []
    }),
    builtins(),
    resolve({
      jsnext: true,

    }),
    commonjs({
      jsnext: true,
      include: 'node_modules/**',
      // exclude: 'node_modules/winston/**'
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
  ],
}
