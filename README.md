# Koa + Mysql + Swagger 项目模板说明

该模板旨在提供一个基于 Koa、Mysql 和 Swagger 的项目脚手架，方便开发者快速搭建和开发后端服务。

# 项目目录说明

```
koa-template
├─ .env                          # 配置文件，可设置环境变量 host 和 port
├─ public                        # 公共资源目录
│  ├─ client                     # 客户端资源目录
│  └─ server                     # 服务端资源目录
│     ├─ avatars                 # 存储头像图片的目录
│     ├─ emojis                  # 根据自身需求定义目录 不需要可删除
│     └─ wallpapers              # 根据自身需求定义目录 不需要可删除
├─ README.md                     # 项目文档或说明文件
├─ SQL                           # SQL 目录
│  └─ koa-data.sql               # 包含 Koa 项目数据的 SQL 文件
└─ src                           # 项目源代码目录
   ├─ app                        # 应用程序目录
   │  ├─ database.js             # 数据库配置文件
   │  ├─ index.js                # 主应用程序文件
   │  └─ swagger.js              # Swagger 文档配置文件
   ├─ config                     # 项目配置目录
   │  ├─ database.js             # 数据库配置
   │  ├─ error.js                # 错误处理配置
   │  ├─ keys                    # 存储密钥的目录
   │  │  ├─ private.key          # 私钥文件
   │  │  └─ public.key           # 公钥文件
   │  ├─ path.js                 # 路径配置
   │  ├─ screct.js               # 密钥配置
   │  └─ service.js              # .env获取服务配置
   ├─ controller                 # 控制器目录 返回客户端数据
   │  ├─ file.js                 # 文件相关操作的控制器
   │  └─ user.js                 # 用户相关操作的控制器
   ├─ logs                       # 日志目录
   │  └─ requestError.log        # 记录请求错误的日志文件
   ├─ main.js                    # Koa 应用程序的主入口点
   ├─ middleware                 # 中间件目录
   │  ├─ apiPrefix.js            # 设置 API 前缀的中间件
   │  ├─ file.js                 # 文件相关操作的中间件
   │  ├─ logger.js               # 记录日志的中间件
   │  ├─ response.js             # 处理响应的中间件
   │  └─ user.js                 # 用户相关操作的中间件
   ├─ router                     # 路由目录 文件必须.router.js结尾 否则无法加载 自动注册路由
   │  ├─ file.router.js          # 文件相关路由
   │  ├─ index.js                # 主路由文件 实现自动注册路由
   │  └─ user.router.js          # 用户相关路由
   ├─ services                   # 服务目录 操作数据库
   │  ├─ file.js                 # 文件相关操作的服务
   │  └─ user.js                 # 用户相关操作的服务
   └─ utils                      # 工具目录
      ├─ handle-error.js         # 处理错误的工具
      └─ sha3-password.js        # sha3 密码哈希的工具 使用 SHA3-256 算法

```

# 项目功能介绍

- ☀️目前就简单实现用户注册，登录，头像上传。这三个接口。根据自身需求更改。
- 🔍项目中使用了 swagger 文档，方便查看接口文档。
- ❄️jsonwebtoken 生成 token，使用 RSA 算法对 token 进行签名和验证。

  > ⚡注意： 使用了非对称加密安全性更高。但是生成 token 时，需要提供私钥，验证 token 时，需要提供公钥。所以需要生成一对密钥：
  > 建议在git bash终端生成密钥
  > 在config/keys目录下执行以下命令

  ```shell
  openssl genrsa -out private.key 1024
  openssl rsa -in private.key -pubout -out public.key
  ```

      1. 私钥（private key）：用于发布令牌；
      2. 公钥（public key）：用于验证令牌；

- 🔐使用 sha3 对密码进行哈希，保证密码的安全性。(MD5 已经不安全了)
- ⛵koa-static 可以把图片放在 public/client目录下，通过 url 访问图片。http**\***/\*\*.jpg
- 📝日志记录：全局监听请求错误的日志文件，方便查看错误信息。 logs/requestError.log
- ⛽全局错误状态码集中处理 详见：utils/handle-error.js 文件 使用koa的emit方法触发error事件
- ✈️cross-env 运行命令设置环境变量 dotenv 加载环境变量
- ⚓router目录下的index.js文件实现自动注册路由 必须以.router.js结尾 否则无法加载

# 安装和运行

**请确保已安装 node 14.0+，mysql 8.0+ 以上版本**

> 在 **SQL** 目录下

1. `koaData.sql` 是数据库文件 只有表结构，数据自行添加

   - user 用户表
   - file 文件表

1. 克隆项目
1. 创建数据库并导入 sql 文件
1. 根据自己环境修改 `config` 目录下的 `database.js` 文件只修改以下内容
   ```js
     database: '******',
     user: '******',
     password: '******',
   ```
1. 根据自己环境修改根目录下的 `.env` 文件只修改以下内容

   ```js
      # 服务器配置
        SERVER_HOST=localhost
        SERVER_PORT=8000

      # 数据库配置
        MYSQL_HOST=localhost
        MYSQL_PORT=3306
   ```

1. 进入项目根目录执行：

```shell
// 安装依赖
npm i

// 开发环境运行
npm run dev

// 检查代码风格 prettier 和 eslint
npm run lint
npm run format
```

# Swagger接口文档

项目启动后，访问：
`http://127.0.0.1:8000/api/swagger`
