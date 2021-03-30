/**
 * 此文件为 @dcloudio/webpack-uni-pages-loader 的一个钩子入口，遵循 CommonJs 规范
 * 可以直接使用 require 引入其他依赖，但是不会有热重载的效果
 * uni-pages-hot-modules 在被初始化之后，可以引入其他依赖，并且相关依赖具备热重载
 */

// 引入一个工具函数，用于对 pages 进行去重和设置首页（没有使用热重载引入，因为没必要）
const { removeDuplicationAndSetIndexPage } = require('./utils/uni-pages-hot-modules-common')

/**
 * 使用 global 是为了之后的模块不需要再去引入 uni-pages-hot-modules
 * 更重要的是为了之后可以在客户端代码直接引入模块做准备
 * 在 vue.config.js 中使用 DefinePlugin 插件，将 hotRequire 替换成 require
 * 就可以在客户端代码引入路由模块，可用于 uni-simple-router，并且做到本地和客户端代码双向热重载
 */
global.hotRequire = require('uni-pages-hot-modules')

/**
 * 输出最终的 pages.json 解析内容
 * @param pagesJson <Object> src/pages.json 的文件解析内容（作为初始内容传入）
 * @param loader <Object> @dcloudio/webpack-uni-pages-loader 会传入一个 loader 对象
 * @returns {Object} uni-app 需要的 pages.json 配置内容
 */
function exportPagesConfig(pagesJson = {}, loader = {}) {
  // 初始化 uni-pages-hot-modules（输入 loader）
  hotRequire(loader)
  // pages 的初始配置
  let basePages = [
    // 首页
    {
      "path": "pages/main/index",
      "style": {
        "navigationBarTitleText": "main"
      }
    },
  ]
  // subPackages 的初始配置
  let baseSubPackages = [
    // TODO
  ]

  // 要输出的 pages
  let pages = removeDuplicationAndSetIndexPage(
    [
      ...basePages,
      ...hotRequire('./pages-config/index.js')
    ],
    // 设置首页-可省
    // 'pages/tabBar/component/component'
  )

  // 要输出的 subPackages
  let subPackages = [
    ...baseSubPackages,
    // ...hotRequire('./subpackage_modules/index.js')
  ]

  return {
    // 合并 pages.json 的初始内容
    ...pagesJson,
    pages,
    subPackages
  }
}

module.exports = exportPagesConfig