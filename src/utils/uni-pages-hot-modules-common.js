/**
 * 此文件作为 pages.js 的工具包，遵循 CommonJs 规范
 */

/**
 * 对 pages 进行去重，并且可以设置首页
 * @param pages <Array> uni-app pages 数组
 * @param indexPath <String> 首页地址，可省
 * @returns {Array} 返回去重和排序后 pages
 */
function removeDuplicationAndSetIndexPage(pages = [], indexPath = pages[0] && pages[0].path || '') {
  let uniquePageMap = {}, resultPages = [], indexPage = []

  // 去重
  pages.forEach((page) => {
    uniquePageMap[page.path] = page
  })

  // 抽出首页
  if (uniquePageMap[indexPath]) {
    indexPage.push(uniquePageMap[indexPath])
    delete uniquePageMap[indexPath]
  }

  for (let i in uniquePageMap) {
    resultPages.push(uniquePageMap[i])
  }

  return [
    ...indexPage,
    ...resultPages
  ]
}

/**
 * 导出 uni-simple-router 需要的路由表格式
 * @param modules {Array} uni 的 pages.json 中的 pages 数组
 * @returns {Array}
 */
function getRouterTableList(modules) {
  return modules.map(({ path, style, ...others }) => ({
    path: '/' + path,
    ...others
  }))
}

/**
 * 导出 uni-simple-router 需要的路由表格式（由分包配置中导）
 * @param subPackage_modules {Array} uni 的 pages.json 中的 subPackages 数组
 * @returns {Array} routerList
 */
function subPackageToPageConfigForSimpleRouter(subPackage_modules) {
  const routerList = []
  subPackage_modules.forEach((sub) => {
    sub.pages.forEach(({ path, style, ...other }) => {
      routerList.push({
        path: '/' + sub.root + '/' + path,
        ...other
      })
    })
  })
  return routerList
}

module.exports = {
  removeDuplicationAndSetIndexPage,
  getRouterTableList,
  subPackageToPageConfigForSimpleRouter
}