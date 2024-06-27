// hello.js

module.exports = {
  method: ['GET', 'POST'], // ['PUT', 'DELETE', 'PATCH']
  middleware: {
    global: ['auth'],
    get: [],
    post: []
  },
  // 主函数
  main: function(req, res) {
    
    res.send('Hello, this is hello.js!');
  }
}