module.exports = {
  entry: {
    app: "./public/js/app.js",
  },
  output: {
      path: `${__dirname}/public/build`,
      filename: "[name].js"
  },
};
