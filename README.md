# rofun

**自用兜底**

rofun = router + function

基于 [Express](https://expressjs.com/) ，可根据函数文件路径自动生成路由，获得类似云函数的体验

[![Node.js Version](https://img.shields.io/badge/Node.js-10.0.0%2B-brightgreen.svg?logo=node.js&logoColor=white)](https://nodejs.org/)



## 简介

函数文件路径和路由的对应关系：

| filePath                               | route                  |
| -------------------------------------- | ---------------------- |
| `${project}/functions/hello.js`        | `${host}/hello`        |
| `${project}/functions/wechat/reply.js` | `${host}/wechat/reply` |

可执行脚本快速创建函数，支持多级路径和模板，应用在启动时自动生成路由

```shell
npm run add:fun <name | path> [template]
```



## 快速开始

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
   

访问应用：http://localhost:3000，访问 `hello` 函数：http://localhost:3000/hello

创建一个新函数

```shell
npm run add:fun wechat/reply
```

访问新函数：http://localhost:3000/wechat/reply



## 常用命令

```shell
# 创建函数
npm run add:fun <name | path> [template]

# 创建类/模型
npm run add:mod <name | path> [template]

# 创建处理器
npm run add:hdlr <name | path> [template]

# 创建数据库相关配置和初始代码
npm run add:db [template]

# 创建通信相关配置和初始代码
npm run add:tpt [template]
```



## 项目结构

- `functions` 函数文件，支持多级路径
- `scripts` 脚本文件，可快速生成代码原型
- `templates` 模板文件
  - `function` 函数
  - `model` 类/模型
  - `handler` 处理器
  - `middleware` 中间件
  - `database` 数据库初始化脚本
- `.env`  (可选) 环境变量，比如密钥、密码等敏感数据
- `config`  (可选) 配置文件，例如 mysql 的相关配置，
- `databases`  (可选) 数据库模型实例，例如 mysql 连接池实例
- `handlers` (可选) 处理器程序，例如处理 socket 事件
- `models`  (可选) 自定义类/模型文件
- `middlewares`  (可选) 中间件文件
- `transports` (可选) 通讯协议相关，例如mqtt实例



## 约定

- 函数、中间件、处理器用小驼峰式命名，例如：`functions/fetchData.js`
- 每个函数文件导出一个对象，对象至少包含两个属性，分别是名为 `method` 的**数组类型**和名为 `main` 的**函数类型**
  - `method` 数组元素对应5种HTTP请求方法，当数组为空时，不会自动生成路由
  - `main` 函数即为处理路由请求的主函数，没有路由时（即 `method` 为空数组）亦可作为独立函数在内部调用
- 模板用蛇形命名，例如：`templates/function/demo_template.js`
- 模板文件中需要替换的占位变量名用 `_` 作前缀，例如：`_functionName`
- 配置文件用蛇形命名，例如: `config/mysql_config.js`
- 类/模型用大驼峰式命名，例如：`models/User.js`



## 存疑

- 跨域设置需要优先执行，若执行顺序晚于某些特定程序，会导致跨域失效，有待验证



## 局限性

脚本和模板能快速生成代码原型，缩短 "施法前摇" ，但它并不智能，实际开发时仍然需要手动debug，往好的方面想: 一切都是可控的
