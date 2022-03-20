import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

const dist = 'dist'
const bundle = 'bundle'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/app.js',
  external: [
    'express',
    'morgan',
    'mongoose',
    'cors',
    'livereload',
    'connect-livereload',
    'dotenv/config',
    'path',
    'url',
    'joi',
  ],
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs',
    },
    {
      file: `${dist}/${bundle}.es.js`,
      format: 'es',
    },
    {
      name: 'app',
      file: `${dist}/${bundle}.umd.js`,
      globals: {
        express: 'express',
        mongoose: 'mongoose',
        joi: 'Joi',
        morgan: 'morgan',
        cors: 'cors',
        livereload: 'livereload',
        'connect-livereload': 'connectLiveReload',
        path: 'path',
        url: 'url',
      },
      format: 'umd',
    },
  ],
  plugins: [resolve(), production && terser()],
}
