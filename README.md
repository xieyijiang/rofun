# rofun

rofun是一个基于 [Express](https://expressjs.com/) 的服务端应用，可根据函数文件路径自动生成对应的路由

[![Node.js Version](https://img.shields.io/badge/Node.js-10.0.0%2B-brightgreen.svg?logo=node.js&logoColor=white)](https://nodejs.org/)

## 简介

函数路径和路由的对应关系：

| filePath                               | route                  |
| -------------------------------------- | ---------------------- |
| `${project}/functions/hello.js`        | `${host}/hello`        |
| `${project}/functions/wechat/reply.js` | `${host}/wechat/reply` |

只需通过脚本创建函数

```shell
npm run fun <functionPath> [template]
```

应用在启动时会自动生成所有对应的路由

## 安装和使用

1. 克隆项目到本地：

   ```shell
   git clone https://github.com/xieyijiang/rofun.git
   ```

2. 进入项目并安装依赖：

   ```shell
   cd rofun && npm install
   ```

3. 运行

   ```shell
   #开发模式，nodemon实现热更新
   npm run dev
   #或者常规模式，无热更新
   npm run start
   ```

   