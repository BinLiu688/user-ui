// export default{
//     //开启命名空间
//     namespaced:true,
//
//     //数据
//     state: ()=>({
//         token:uni.getStorageSync('token') || '',
//         //用户信息对象
//         userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
//         //重定向对象
//         redirectInfo:null,
//         openid:uni.getStorageSync('openid') || ''
//     }),
//
//     //方法
//     mutations:{
//         //更新用户信息
//         updateUserInfo(state,userinfo){
//             state.userinfo = userinfo
//             this.commit('m_user/saveUserInfoToStorage')
//         },
//         //保存用户信息到state
//         saveUserInfoToStorage(state){
//             uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
//         },
//
//         //更新token
//         updateToken(state,token){
//             state.token = token
//             this.commit('m_user/saveTokenToStorage')
//         },
//         saveTokenToStorage(state){
//             uni.setStorageSync('token',state.token)
//         },
//
//         //更新redirectInfo信息
//         updateRedirectInfo(state,redirectInfo){
//             state.redirectInfo = redirectInfo
//             this.commit('m_user/saveRedirectInfoToStorage')
//         },
//
//         saveRedirectInfoToStorage(state){
//             uni.setStorageSync('redirectInfo',state.redirectInfo)
//         },
//
//         //更新openid
//         updateOpenid(state,openid){
//             state.openid = openid
//             this.commit('m_user/saveOpenidToStorage')
//         },
//         saveOpenidToStorage(state){
//             uni.setStorageSync('openid',state.openid)
//         }
//     },
//
//     getters:{}
// }