<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="电影院名称">
        <el-input type="text" v-model="cinema_name"></el-input>
      </el-form-item>
      <el-form-item label="选择位置">
        <div id="container" style="height: 200px; border: 1px solid #666"></div>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input type="text" v-model="address"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-input type="text" v-model="province"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input type="text" v-model="city"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <el-input type="text" v-model="district"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input type="text" v-model="longitude"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input type="text" v-model="latitude"></el-input>
      </el-form-item>
      <el-form-item label="选择标签">
        <el-select v-model="form.tags">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.tagname"
            :value="item.tagname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">新增电影院</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import httpApi from "@/http";
export default {
  data() {
    return {
      tags: [],
      //此处不声明 map 对象，可以直接使用 this.map赋值或者采用非响应式的普通对象来存储。
      //map:null,
      form: {
        cinema_name: "",
        address: "",
        province: "",
        city: "",
        district: "",
        cinemlongitudea_name: "",
        latitude: "",
        tags: "",
      },
    };
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "7bc653e04678082d08022d65625bad6e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          //设置地图容器id
          viewMode: "3D", //是否为3D地图模式
          zoom: 12, //初始化地图级别
          center: [113.659404, 34.772296], //初始化地图中心点位置
        });
        this.map.on("click", (e) => {
          let lng = e.lnglat.getLng();
          let lat = e.lnglat.getLat();
          console.log(`经纬度:[${lng},${lat}]`);
          //调用高德地图的web服务接口,查询当前经纬度坐标
          let geocoder = new AMap.Geocoder();
          geocoder.getAddress([lng, lat], (status, result) => {
            console.log(status, result);
            let info = result.regeocode.addressComponent;
            this.form.address = info.address;
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
    //DOM初始化完成进行地图初始化
    this.initMap();
    httpApi.cinemaApi.queryTypes().then((res) => {
      console.log("加载电影标签列表", res);
      this.tags = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>