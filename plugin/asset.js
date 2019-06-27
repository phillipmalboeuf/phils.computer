const { Asset } = require('parcel-bundler')
const Path = require('path')
const svelte = require('svelte/compiler')

class SvelteAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options)
    this.type = 'js'
  }

  async parse(code) {
    return svelte.parse(code, { filename: this.name })
  }

  async generate() {
    const result = await svelte.compile(this.contents, process.env.SSR
    ? {
      generate: 'ssr',
      css: true,
      immutable: true,
      preserveWhitespace: true
    }
    : {
      hydratable: true,
      css: false
    })

    return [
      {
        type: 'css',
        value: result.css.code
      },
      {
        type: 'js',
        value: result.js.code
      }
    ]
  }
}

module.exports = SvelteAsset