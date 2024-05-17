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
npm run fun <functionName | path/to/functionName> [template]
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
   # 开发模式，nodemon实现热更新
   npm run dev
   
   # 或者常规模式，无热更新
   npm run start
   ```
   

根据控制台提示访问应用，默认：http://localhost:3000

## 常用命令

```shell
# 创建函数
npm run fun <functionName | path/to/functionName> [template]

# 创建类/模型
npm run mod <modelName | path/to/modelName> [template]

# 创建数据库相关配置和初始代码
npm run db [template]
```



## 文件结构

- `functions` 存放函数文件，支持多几路径
- `scripts` 存放脚本文件，比如通过模板快速生成函数
- `templates` 存放模板文件
  - `function` 函数模板
  - `model` 类/模型模板
  - `middleware` 中间件模板
  - `database` 数据库初始化脚本模板
- `config` 存放配置文件，例如 mysql 的相关配置，
- `database` 存放数据库模型或实例，例如导出 mysql 的连接池
- `models` (非必要) 存放类/模型文件
- `middlewares` (非必要) 存放中间件文件
- `.env` 存放环境变量，比如token、密码等敏感数据

## 约定

- 函数和中间件用小驼峰式命名，例如：`functions/fetchData.js`
- 每个函数文件导出一个对象，对象至少包含两个属性，分别是名为 `method` 的**数组类型**和名为 `main` 的**函数类型**
  - `method` 数组元素对应5种HTTP请求方法，当数组为空时，不会自动生成路由
  - `main` 函数即为处理路由请求的主函数，没有路由时（即 `method` 为空数组）亦可作为独立函数在内部调用
- 模板用蛇形命名，例如：`templates/function/.js`
- 模板文件中需要替换的占位变量名用 `_` 作前缀，例如：`_functionName`
- 类/模型用大驼峰式命名，例如：`models/User.js`