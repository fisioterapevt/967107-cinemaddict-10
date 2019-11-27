const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`), // где искать сборку
    publicPath: `http://localhost:8080/`, // веб адрес сборки
    compress: true, // сжатие
    // автоматическая перезагрузка страницы
    // в случае отказа в работе по стандартному URL http://localhost:8080
    // записать http://localhost:8080/webpack-dev-server
    watchContentBase: true
  }
};
