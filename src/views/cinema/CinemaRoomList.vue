<template>
  <div>
    <el-button @click="dialogFormVisible = true" plain type="primary"
      >新增放映厅</el-button
    >
    <el-divider content-position="left">放映厅列表</el-divider>

    <!-- 放映厅列表数据 -->
    <el-table>
      <el-table-column label="放映厅名称" align="center"></el-table-column>
      <el-table-column label="放映厅类型" align="center"></el-table-column>
      <el-table-column label="放映厅座位数" align="center"></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>

    <!-- 新增放映厅表单 对话框 -->
    <el-dialog title="新增放映厅" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          label="放映厅名称"
          :label-width="formLabelWidth"
          v-model="form.room_name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="放映厅类型"
          :label-width="formLabelWidth"
          v-model="form.room_type"
        >
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpApi from "@/http";
export default {
  data() {
    return {
      dialogFromVisible: false,
      form: {
        room_name: "",
        room_type: "",
        movie_cinema_id: this.$route.params.cinemaId,
      },
    };
  },

  methods: {
    initRoomTypes() {
      httpApi.cinemaRoomApi.queryAllTypes().then((res) => {
        console.log("查询到的放映厅列表", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>