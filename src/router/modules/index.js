// router/modules/index.js
const files = require.context('.', false, /\.js$/)
const modules = [
  {
    path: "/pages/main/index",
    name: "main",
    aliasPath: '/',
    meta: {
      title: "首页",
    },
  },
]

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  // console.log("[router]", item);
  modules.push(...item)
})

export default modules
