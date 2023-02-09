<template>
  <div>
    当前是
    <span style="color: #3f9dff; font-weight: bold">{{
      roomInfo.cinema_name
    }}</span>
    的
    <span style="color: #3f9dff; font-weight: bold"
      >{{ roomInfo.cinema_room_name }}({{ roomInfo.cinema_room_type }})</span
    >
    排片计划列表
    <el-divider content-position="left"></el-divider>

    <el-table :data="plans">
      <el-table-column
        label="电影名称"
        align="center"
        prop="title"
      ></el-table-column>
      <el-table-column
        label="放映时间"
        align="center"
        prop="showingon_date"
      ></el-table-column>
      <el-table-column
        label="场次"
        align="center"
        prop="showingon_time"
      ></el-table-column>
      <el-table-column label="票价" align="center">
        <template slot-scope="scope">{{ scope.row.price }}元</template>
      </el-table-column>
      <el-table-column label="是否已发布" align="center">
        <template slot-scope="scope"
          ><el-switch
            active-value="1"
            inactive-value="0"
            v-model="scope.row.status"
          ></el-switch
        ></template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button size="small" type="danger" icon="el-icon-delete" circle>
          </el-button> </template
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import httpApi from "@/http";
export default {
  data() {
    return {
      roomInfo: {}, //保存放映厅的基本信息
      plans: [],
    };
  },
  methods: {
    //初始化放映厅的数据
    initRoomData() {
      let id = this.$route.params.roomId;
      httpApi.cinemaRoomApi.queryById({ id }).then((res) => {
        console.log("加载当前放映厅的数据", res);
        this.roomInfo = res.data.data;
      });
    },
    //加载放映厅的排片计划列表
    initPlans() {
      //room下划线id是接口需要,没有下划线是自己定义的
      let params = { room_id: this.$route.params.roomId };
      httpApi.showingonPlanApi.queryByRoomId(params).then((res) => {
        console.log("查询到排片计划列表如下", res);
        this.plans = res.data.data;
      });
    },
  },

  mounted() {
    this.initRoomData();
    this.initPlans();
  },
};
</script>

<style lang="scss" scoped>
</style>