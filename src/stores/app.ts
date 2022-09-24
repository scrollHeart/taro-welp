import { defineStore } from 'pinia'

const useApp = defineStore({
  id: 'app',
  state: () => ({
    screenLoading: false,
    userInfoBool: false, // 信息补全是否完成
  }),
  actions: {
    startScreenLoading() {
      this.screenLoading = true
    },
    cancelScreenLoading() {
      this.screenLoading = false
    },
    setuserInfoBool(userInfoBool: boolean) {
      this.userInfoBool = userInfoBool
    }
  }
})
export { useApp }
