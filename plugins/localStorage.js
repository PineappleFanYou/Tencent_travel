import createPersistedState from 'vuex-persistedstate'

// export default 函数是nuxt插件的固定的格式
// 函数有一个参数，这个参数是nuxt对象
export default ({store}) => {
    // 插件的方法
  window.onNuxtReady(() => {
    createPersistedState({
        // 可以是任意的字符串，就像我们以前的localStorage('键'，'值') 里面的键一样，到时候取的时候，按照存的时候来取就行了
        key: 'store'
    })(store)
  })
}