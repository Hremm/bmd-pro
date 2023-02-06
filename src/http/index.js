//提供访问具体某接口模块对象
import actorAPI from "./APIS/actorAPI";
import directorAPI from "./APIS/directorAPI";
import movieAPI from "./APIS/movieAPI";
const httpApi = {
  actorAPI,
  movieAPI,
  directorAPI,
};
export default httpApi;
