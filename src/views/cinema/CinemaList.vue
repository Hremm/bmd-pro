<template>
  <div>
    <!-- 地图容器 -->
    <div id="main" style="height: 260px; border: 1px solid #666"></div>
    <el-divider content-position="left">电影院列表</el-divider>

    <!-- 表格 -->
    <el-table>
      <el-table-column width="150px" label="影院名称"></el-table-column>
      <el-table-column label="影院地址"></el-table-column>
      <el-table-column width="250px" label="影院位置"></el-table-column>
      <el-table-column width="250px" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import httpApi from "@/http/index";

export default {
  data() {
    return {
      cinemas: [],
    };
  },
  methods: {
    // 初始化地图
    initMap() {
      AMapLoader.load({
        key: "7bc653e04678082d08022d65625bad6e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("main", {
          //设置地图容器id
          viewMode: "3D", //是否为3D地图模式
          zoom: 11, //初始化地图级别
          center: [116.397202, 39.905075], //初始化地图中心点位置
        });
        // 为地图对象绑定点击事件
        this.map.on("click", (e) => {
          let lng = e.lnglat.getLng();
          let lat = e.lnglat.getLat();
          console.log(`经纬度：[${lng}, ${lat}]`);
          // 调用高德地图的web服务接口，查询当前经纬度的坐标
          let geocoder = new AMap.Geocoder();
          geocoder.getAddress([lng, lat], (status, result) => {
            console.log(status, result);
            // 将数据回填到表单
            let info = result.regeocode.addressComponent;
            this.form.address = result.regeocode.formattedAddress;
            this.form.city = info.city;
            this.form.province = info.province;
            this.form.district = info.district;
            this.form.latitude = lat;
            this.form.longitude = lng;
          });
        });
      });
    },
  },

  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
</style>