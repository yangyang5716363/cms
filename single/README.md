# 开箱即用的多页面webpack脚手架
最近接手一个新项目，公司官网，官网为了对爬虫友好，不合适做单页面，更不大适合用react，vue这样的框架。本来觉得几个简单的页面还需要配置webpack挺麻烦，直接ES5，css，html写写就ok，可是一旦下手开始写，离开了前端的各种得心应手的工具，回到了刀耕火种的时代。痛不欲生，即使写完了，以后的迭代维护同样痛苦。 还不如创建一个脚手架，以后遇到这种官网多页面的需求的时候拿来即用，岂不美哉。

好了，背景就是这些，本脚手架适合做官网之类的多页面的应用。本脚手架已经支持使用ES6，less，模块化，热加载，eslint等功能


## Build Setup

``` bash
# 安装依赖
npm install

# 开发的时候在本地启localhost:8080，并开始热加载
npm run dev

# production的发布时打包
npm run build

```


## 目录结构

```

└─src                                      // src 文件夹
│    ├─pages                               // 页面文件夹
│    │  ├─about
│    │  │      about.html
│    │  │      about.js
│    │  │      about.less
│    │  │
│    │  ├─contact
│    │  │      contact.css
│    │  │      contact.html
│    │  │      contact.js
│    │  │
│    │  └─home
│    │          index.html
│    │          index.js
│    │          index.less
│    │
│    └─tools                          // 工具文件夹
│            utils.js
│
│  .babelrc                         // babel的配置文件
│  .eslintignore
│  .eslintrc.js                     // eslint的配置文件
│  .gitignore
│  ecosystem.config.js              // pm2 deploy的配置文件
│  package.json
│  page.config.js                   // 页面的配置文件
│  README.md
│  webpack.config.dev.js            // 开发环境的webpack配置文件
│  webpack.config.prod.js           // 生成环境的webpack配置文件
         

```

## 开发流程

如果增加新页面，只需两步，不需要改webpack等配置文件

1. 在pages中新增一个文件夹
2. 在page.config.js中添加这个页面的信息即可

比如
```
  {
    name: 'contact',
    html: 'contact/contact.html',
    jsEntry: 'contact/contact.js'
  }

```




```
ssh root@xxx.xx.xx.xx

```
经验证发现登录成功，没要求输入密码。此时免密登录的设置完成



```

