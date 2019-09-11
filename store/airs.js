
export const state = () => {
    return {
        // 机票的信息对象
        infoData:{
            seat_infos:{}
        },

        // 总价格
        allPrice:0
    }
}

export const mutations = {
    // 修改机票信息
    setInfoData(state,data) {
        state.infoData = data;
    },

    setAllPrice(state,price) {
        state.allPrice = price;
    }
}