import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
  loading: false,
  UserList: [111,222,333], //用户列表
  themeObj: 0,//主题
  headBg: 'http://image.nosum.cn/20140612202753_u4nG5.jpeg',
  headPortrait : 'http://image.nosum.cn/github_34ec864a-c670-436a-aaa4-76008e91e8ab.jpg',
  rightPortrait : 'http://image.nosum.cn/Fh7t1A373aEiP0DqLpULNjhsfCco',
  bottomImg:'http://image.nosum.cn/footer01.png',
  aboutmeObj:'',//关于我的信息
  username:'nosum',
  host:"http://"+window.location.host+"/port/",//接口路径
  keywords:'',//关键词
  errorImg: 'this.onerror=null;this.src="' + require('../../static/img/tou.jpg') +'"'
}

export default new Vuex.Store({
    state,
})
