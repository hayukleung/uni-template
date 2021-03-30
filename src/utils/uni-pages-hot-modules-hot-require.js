/**
 * 在 webpack 的客户端包中如果要引入 pages.js 的相关依赖（pages.js 文件本身不能被 webpack 的客户端包依赖）
 * 可以在 pages.js 中使用 global 引入 uni-pages-hot-modules
 * 比如 global.hotRequire = require('uni-pages-hot-modules')
 * 这样 pages.js 的相关依赖中就不需要再定义 hotRequire
 * 在 vue.config.js 中使用 DefinePlugin 将 hotRequire 和 hotRequire.context 分别替换成 require 和 require.context
 * 在 uni-app 的应用中就可以引入 pages.js 的相关依赖模块了。比如可以直接用于 uni-simple-router
 * 并且可以做到客户端包和本地配置包的双向热重载
 */

const path = require('path')
const callsites = require('callsites');
const fs = require('fs')
let addDependency

/**
 * CommonJs 规范
 * 
 * 引入相关的 js 依赖，并且可以使依赖在 @dcloudio/webpack-uni-pages-loader 中进行热重载
 * 只可用于 uni-app 项目的 pages.js 中
 * @param mix {Object | String} loader 或者 依赖的路径
 * @returns {*} mix 为 loader 时为初始化，返回 hotRequire，mix 为依赖的路径时，返回依赖
 */
function uniPagesHotModule(mix = {}) {
  let parentPath = ''
  try {
    // 尝试获取调用此方法的文件所在目录
    parentPath = callsites()[1].getFileName().match(/(.*)[\/\\][^\/\\]+$/)[1]
  } catch (e) { }

  function hotRequire(modulesPath) {
    let finalPath = path.resolve(parentPath, modulesPath)
    try {
      // 将模块作为依赖加到 webpack 的 loader 中
      addDependency(finalPath)
      // 清除模块的缓存
      delete require.cache[finalPath]
    } catch (e) { }
    return require(finalPath)
  }

  if (mix && typeof mix === 'object') {
    if (typeof mix.addDependency === 'function') {
      addDependency = mix.addDependency
      try {
        // 默认将初始化的文件添加到依赖中
        addDependency(callsites()[1].getFileName())
      } catch (e) { }
    }
    return hotRequire
  }
  if (typeof mix === 'string') {
    return hotRequire(mix)
  }
  throw new Error('参数错误，只接受 loader 或者 modulePath')
}

/**
 * 模拟 webpack 的 require.context
 * 与 webpack 不同的地方是不会将调用此方法的模块输出，没有 id 属性，resolve 方法返回绝对路径
 * @param dir
 * @param deep
 * @param fileRegExp
 * @returns {function(*): *}
 */
function hotRequireContext(dir, deep = false, fileRegExp) {
  const filesMap = {}
  const callsites = require('callsites');
  let topPath = ''
  let ownerPath = ''
  try {
    // 尝试获取调用此方法的文件所在目录
    ownerPath = callsites()[1].getFileName()
    topPath = ownerPath.match(/(.*)[\/\\][^\/\\]+$/)[1]
  } catch (e) { }
  let firstPath = path.resolve(topPath, dir)
  function findFiles(dirName) {
    fs.readdirSync(dirName).map((item) => {
      let absolutePath = path.resolve(dirName, item)
      if (deep) {
        // 一律都当作子目录处理
        try {
          findFiles(absolutePath)
          return
        } catch (e) { }
      }

      // 验证 fileRegExp
      if (fileRegExp && !item.match(fileRegExp)) {
        return
      }

      // 去除自己避免死循环
      if (ownerPath === absolutePath) return

      filesMap[absolutePath.replace(topPath, '.').replace(/\\\\/g, '/').replace(/\\/g, '/')] = uniPagesHotModule(absolutePath)
    })
  }
  function keys() {
    return Object.keys(filesMap)
  }

  function resolve(relativePath) {
    return path.resolve(firstPath, relativePath)
  }

  function output(id) {
    return filesMap[id]
  }

  findFiles(firstPath)
  output.keys = keys
  output.resolve = resolve
  return output
}

uniPagesHotModule.context = hotRequireContext

module.exports = uniPagesHotModule