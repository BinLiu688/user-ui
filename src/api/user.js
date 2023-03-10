import request from '../utils/request'

const api_name = `http://localhost:8888`

export default {

    queryByUser(user,pager){
        console.log("参数：",user)
        console.log("参数：",pager)
        return request({
            method:"post",
            url: `${api_name}/queryByUser/${user.username}/${user.age}/${user.gender}/${pager.page}/${pager.limit}`,
            // ContextType:"application/json;charset=UTF-8",
        })
    },

    deleteById(userId){
        return request({
            method:"post",
            url:`${api_name}/deleteById/${userId}`
        })
    },

    batchDelete(ids){
        console.log("参数",ids)
      return request({
          method:"post",
          url:`${api_name}/batchDelete`,
          data:ids
      })
    },

    saveUser(user){
        console.log("参数：",user)
        console.log(JSON.stringify(user.value))
        let data = user.value
        return request({
            method:'post',
            url:`${api_name}/saveUser/${data.username}/${data.age}/${data.gender}/${data.phone}/${data.address}`,
        })
    },

    updateUser(user){
        console.log("参数：",user)
        console.log(JSON.stringify(user.value))
        let data = user.value
        return request({
            method:'post',
            url:`${api_name}/updateUser/${data.userId}/${data.username}/${data.age}/${data.gender}/${data.phone}/${data.address}`,
        })
    }

}
