// 这个文件是实现用户管理的

// state 是仓库的数据
// mutations 同步修改state的数据

// export const state 是用来存数据的，就好比我们以前的收集表单认证
export const state = ()=>{
    return {
        userInfo:{
            token:'',
            user:{}
        }
    }
}

export const mutations = {
    // 设置用户信息，mutations 下的方法第一个参数固定式state
    // data 参数不是必须的，是调用方法时候传入的参数
    setUserInfo(state,data) {
        // data是后台返回的用户信息
        state.userInfo = data;
    },
    // 清空userInfo
    clearUserInfo(state) {
        state.userInfo = {
            token:'',
            user:{}
        }
}
}

