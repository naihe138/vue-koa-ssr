
class InserJsPlugin {
  constructor(options) {
    this.options = options
  }
  apply (compiler) {
    let { template, path } = this.options
    compiler.hooks.emit.tap('InserJsPlugin', compilation => {
      const source = compilation.assets[template].source()
      let str = source.replace('<!--vuelib-->', `<script src="${path}"></script>`)
      compilation.assets[template].source = function source() {
        return str
      }
    })
  }
}

module.exports = InserJsPlugin
