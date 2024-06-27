// _functionName.js
const axios = require('axios').default;
const config = require('@config/emqx_config');

module.exports = {
  method: ['GET', 'POST'], // ['PUT', 'DELETE', 'PATCH']
  middleware: {
    global: [],
    get: [],
    post: []
  },
  // 主函数
  main: async function (req, res) {
    try {
      const response = await axios.get(
        'http://localhost:18083/api/v5/clients',
        {
          auth: {
            username: config.apiKey,
            password: config.secretKey
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      res.json(response.data)
    } catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
    }
  }
}