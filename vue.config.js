module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // chainWebpack: config => {},
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path.split("/api/")[1].split("/").join("_");
            const mock = require(`./mock/${name}`); // 此处模块会被缓存
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)]; // 清除缓存
            return res.send(result);
          }
        },
      },
    },
  },
};
