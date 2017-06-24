var rollup = require('rollup')
var vue = require('rollup-plugin-vue2')
var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var babel = require('rollup-plugin-babel')
var eslint = require('rollup-plugin-eslint')
var componentInfo = require('../src/component-list')
var c3lib = ['c3/c3.min.css', 'c3']

Object.keys(componentInfo).forEach(com => {
  rollupFn(com, componentInfo[com])
})

function rollupFn (entryPath, destPath) {
  rollup.rollup({
    entry: entryPath,
    external: c3lib,
    plugins: [
      eslint({
        throwError: true,
        exclude: 'node_modules/**'
      }),
      vue(),
      resolve({
        extensions: ['.js', '.vue']
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        plugins: ['external-helpers']
      })
    ]
  }).then(function (bundle) {
    bundle.write({
      format: 'cjs',
      dest: destPath
    })
  }).catch((e) => {
    console.log(e)
    process.exit(1)
  })
}

rollup.rollup({
  entry: 'src/index.js',
  external: c3lib,
  plugins: [
    eslint({
      throwError: true,
      exclude: 'node_modules/**'
    }),
    vue(),
    resolve({
      extensions: ['.js', '.vue']
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ]
}).then(function (bundle) {
  bundle.write({
    format: 'umd',
    dest: 'lib/index.min.js',
    moduleName: 'VdChart',
    globals: {
      c3: 'c3'
    }
  })
}).catch((e) => {
  console.log(e)
  process.exit(1)
})
