# rofun

rofun是一个基于 [Express](https://expressjs.com/) 的服务端应用，可根据函数文件路径自动生成路由，获得类似云函数的体验

[![Node.js Version](https://img.shields.io/badge/Node.js-10.0.0%2B-brightgreen.svg?logo=node.js&logoColor=white)](https://nodejs.org/)

## 简介

函数路径和路由的对应关系：

| filePath                               | route                  |
| -------------------------------------- | ---------------------- |
| `${project}/functions/hello.js`        | `${host}/hello`        |
| `${project}/functions/wechat/reply.js` | `${host}/wechat/reply` |

只需通过脚本创建函数，支持多级路径和函数模板

```shell
npm run fun <functionName> [templateName]

#例如
npm run fun hello
#或者
npm run fun wechat/reply mysql
```

应用在启动时会自动生成路由

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


根据控制台提示即可访问应用，默认链接：http://localhost:3000

## 约定

- 函数放在 `functions` 文件夹下，用小驼峰式命名，例如：`getToken.js`
- 函数模板放在 `templates` 文件夹下，用蛇形命名，例如：`mysql_pool.js`
- 每个函数文件导出一个对象，对象至少包含两个属性，分别是名为 `method` 的**数组类型**和名为 `main` 的**函数类型**
  - `method` 数组元素对应5种HTTP请求方法，当数组为空时，不会自动生成路由
  - `main` 函数即为处理路由请求的主函数，没有路由时（即 `method` 为空数组）亦可作为独立函数供应用内部调用
- 函数模板名称与实际的函数模板文件名对应，例如：函数模板文件为 `mysql_pool.js`，创建函数的命令行可以是 `npm run fun dbPool mysql_pool`，任何人都可以编写函数模板