<template>
  <div>
    <div class="user-header">
      用户管理
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form ref="$form" label-width="80px">
          <el-button type="primary" @click="addVisible = true" class="class-margin">新建</el-button>
          <el-input v-model="user.username" placeholder="请输入姓名" class="handle-input mr10 class-margin"></el-input>
          <el-input v-model="user.age" placeholder="请输入年龄" type="number" class="handle-input mr2 class-margin"></el-input>
          <el-select v-model="user.gender" placeholder="请选择性别" class="class-margin">
            <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="queryByUser">搜索</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="warning" class="class-canncel">撤销</el-button>
          <el-button type="danger" @click="batchDelete" class="class-canncel">批量删除</el-button>
        </el-form>
      </div>
      <el-table :data="userList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" prop="userId"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center" ></el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
          <template v-slot="scope">
            <span v-if="scope.row.gender === '1'">男</span>
            <span  v-else-if="scope.row.gender === '0'">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="address" label="详细地址" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button type="primary"  @click="getUser(scope.row)">编辑</el-button>
            <el-button type="danger"  @click="deleteById(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
<!--        <el-pagination background layout="total, prev, pager, next" :current-page="pager.page"-->
<!--                       :page-size="pager.limit" :total="pager.total" @current-change="queryByUser"></el-pagination>-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.page"
            :page-sizes="[10, 20, 50]"
            :page-size="pager.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pager.total">
        </el-pagination>
      </div>

<!--      弹框-->
      <el-dialog
          title="添加"
          v-model="addVisible"
          width="35%"
          destroy-on-close="true">
        <el-form inline>
            <el-form-item label="姓名">
              <el-input v-model="user.username"></el-input>
            </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="user.age" type="number"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="user.gender" placeholder="请选择性别" class="class-margin">
              <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-cascader
                v-model="user.preaddr"
                :options="options"
                @change="handleChange"
                placeholder="请选择区划"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="user.sufaddr" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="user.address" hidden></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addCanncel">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
        </template>
      </el-dialog>

      <el-dialog
          title="编辑"
          v-model="editVisible"
          width="35%"
          destroy-on-close="true">
        <el-form inline>
          <el-form-item label="姓名">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="user.age" type="number"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="user.gender" placeholder="请选择性别" class="class-margin">
              <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-cascader
                v-model="user.preaddr"
                :options="options"
                @change="handleChange"
                placeholder="请选择区划"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="user.sufaddr" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="user.address" hidden></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editCanncel">取 消</el-button>
                    <el-button type="primary" @click="updateUser">确 定</el-button>
                </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import {ref,reactive} from 'vue'
import userService from "@/api/user";
import {ElMessage, ElMessageBox} from "element-plus";
export default {
  name: "Result",
  setup(){
    //数据
    let genders = [
      {label:'女',value:'0'},
      {label:'男',value:'1'},
    ]

    let options = [
      {
        value:"广东省",
        label:"广东省",
        children:[
          {
            value:'广州市',
            label:'广州市',
            children:[
              {value:'番禺区',label:'番禺区'},
              {value:'越秀区',label:'越秀区'},
              {value:'花都区',label:'花都区'},
              {value:'海珠区',label:'海珠区'},
              {value:'天河区',label:'天河区'},
            ]
          }
        ]
      }
    ]

    let addVisible = ref(false)
    let editVisible = ref(false)
    let flag = ref(0)

    let ids = reactive([])

    let pager = reactive({
      page:1,
      limit:10,
      total:0,
      pages:-1
    })
    const $form = ref(null)
    let userList = ref([])
    let user = ref({
      username:'',
      age:'',
      gender:'',
      phone:'',
      preaddr:'',
      sufaddr:''
    })

    function reset() {
      user.value = {
        username:'',
        age:'',
        gender:'',
        phone:'',
        preaddr:'',
        sufaddr:''
      }
    }

    function queryByUser() {

      console.log(user)
      let data = {
        username:user.value.username == ''?null:user.value.username,
        age:user.value.age == ''?-1:user.value.age,
        gender:user.value.gender==''?null:user.value.gender
      }
      console.log(data)
      userService.queryByUser(data,pager).then((response)=>{
        console.log(response)
        userList.value = response.data.records
        pager.total = response.data.total
        pager.page = response.data.current
        pager.limit = response.data.size
        pager.pages = response.data.pages
      })
    }
    queryByUser()

    function deleteById(row){
      console.log(row.userId)
      ElMessageBox.confirm("确定要删除此数据吗?","警告",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        userService.deleteById(row.userId).then(response=>{
          ElMessage.success("删除成功")
          queryByUser()
        }).catch(error=>{
          ElMessage.success("删除失败")
        })
      })
    }

    function handleSelectionChange(idList){
      console.log(idList)
      ids = []
      for(var i = 0; i < idList.length; i++){
        ids.push(idList[i].userId)
      }
      console.log("ids:",ids)
    }

    function batchDelete(){
      if(ids.length == 0){
        ElMessage.warning("请选择要删除的数据")
        return
      }
      ElMessageBox.confirm("确定要删除当前选择的数据吗?","警告",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"警告"
      }).then(()=>{
        userService.batchDelete(ids).then(response=>{
          ids = []
          queryByUser()
          ElMessage.success("删除成功")
        })
      })
    }

    function addCanncel(){
      addVisible.value = false
      user.value = {
        username:'',
        age:'',
        gender:'',
        phone:'',
        address:'',
        preaddr:'',
        sufaddr:''
      }
    }

    function handleChange(value){
      console.log(value)
    }

    function addUser(){
      let arr = user.value.preaddr
      console.log(arr)
      user.value.address = arr[0]+arr[1]+arr[2]+user.value.sufaddr
      console.log(user.value.address)
      addVisible.value = false
      userService.saveUser(user).then(response=>{
        queryByUser()
        ElMessage.success("添加成功")
      }).catch(error=>{
        ElMessage.success("添加失败")
      })
    }

    function getUser(row){
      editVisible.value = true
      user.value = row
      let addr = user.value.address
      console.log("canshu",addr)
      const cityExp = ".+[市]",disExp = ".+[区]"
      const province = addr.substring(addr.indexOf("省")) // 省
      const city = addr.match(new RegExp(cityExp))[0].replace(province, ""); // 市
      const district = addr.match(new RegExp(disExp))[0].replace(province, "").replace(city, ""); // 区
      let index = addr.lastIndexOf("区")
      const detail = addr.substring(index+1)
      console.log(index)
      console.log(province)
      console.log(city)
      console.log(district)
      console.log(detail)
      // let addrarr = treeFindPath(options,data=>data.value == district,"label")
      user.value.preaddr = district
      user.value.sufaddr = detail
    }

    /**
     * 显示层级数据
     * @param tree {Array} 树数据
     * @param func {Function} 回调函数
     * @param field {String} 字段名称
     * @param path {Array} 路径数据
     * @returns {*[]|[]|*}
     */
    function treeFindPath(tree, func, field = "", path = []) {
      if (!tree) return []
      for (const data of tree) {
        field === "" ? path.push(data) : path.push(data[field]);
        if (func(data)) return path
        if (data.children) {
          const findChildren = treeFindPath(data.children, func, field, path)
          if (findChildren.length) return findChildren
        }
        path.pop()
      }
      return []
    }

    function updateUser(){
      let arr = user.value.preaddr
      console.log(arr)
      user.value.address = arr[0]+arr[1]+arr[2]+user.value.sufaddr
      console.log(user.value.address)
      editVisible.value = false
      console.log(user)
      userService.updateUser(user).then(response=>{
        reset()
        queryByUser()
        ElMessage.success("更新成功")
      }).catch(error=>{
        ElMessage.success("更新失败")
      })
    }

    function editCanncel(){
      editVisible.value = false
      reset()
    }

    function handleSizeChange(value){
      console.log("111",value)
      pager.limit = value
    }

    function handleCurrentChange(value){
      console.log("222",value)
      pager.page = value
      queryByUser()
    }


    return {
      reset,
      $form,
      userList,
      user,
      genders,
      queryByUser,
      pager,
      deleteById,
      addVisible,
      editVisible,
      flag,
      ids,
      handleSelectionChange,
      batchDelete,
      options,
      addCanncel,
      handleChange,
      addUser,
      getUser,
      updateUser,
      editCanncel,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.class-canncel{
  margin-left: 2000px;
}
.class-margin{
  margin-right: 10px;
}
.user-header{
  text-align: center;
  height: 50px;
  font-size: large;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 200px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.upload-demo {
  display: inline;
}
.el-upload {
  display: inline;
  text-align: center;
  cursor: pointer;
  outline: 0;
}
.info {
  text-align: center;
  padding: 35px 0;
}
.info-image {
  position: relative;
  margin: auto;
  width: 60px;
  height: 60px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}
.info-image img {
  width: 100%;
  height: 100%;
}
.info-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.info-edit i {
  color: #eee;
  font-size: 25px;
}
.info-image:hover .info-edit {
  opacity: 1;
}
</style>