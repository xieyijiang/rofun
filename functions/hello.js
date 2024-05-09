// hello.js

module.exports = {
  method: ['GET', 'POST'], // ['PUT', 'DELETE', 'PATCH']
  // 主函数
  main: function(req, res) {
    res.send('Hello, this is hello.js!');
  }
}