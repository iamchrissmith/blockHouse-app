module.exports = {
  entry: {
    app: "./public/js/app.js",
  },
  output: {
      path: `${__dirname}/public/assets`,
      filename: "[name].js"
  },
};
