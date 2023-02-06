//用于导出生产环境（远程）或测试环境（本地）下的接口前缀
const URL_envent = {
  //开发测试
  DEV: {
    bmdURL: "http://localhost:3010",
    uploadURL: "http://localhost:9000",
  },
  //生产
  PRO: {
    bmdURL: "https://web.codeboy.com/bmdapi",
    uploadURL: "https://web.codeboy.com/bmduploadapi",
  },
};
export default URL_envent.DEV; //需要哪个环境就导出哪个
