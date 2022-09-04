# 使用 Taro3 + Vue3 + NutUi + echarts + ts + pinia 开发微信小程序

## 前言

目前此项目仅支持微信小程序



## 目标功能

- 集成 vue3，使用 `script setup` 语法开发
- 集成 `Typescript`
- 代码检查和格式优化
- 全局状态管理
- 小程序分包配置
- 样式封装，兼容刘海儿屏等样式问题
- http 方法封装
- NutUi按需引入和自定义主题
- echarts按需引入和使用
- iconfont图标字体css引入和使用

## 主要技术栈

- Taro3
- Vue3
- TypeScript
- NutUi
- Pinia

## 项目常用目录描述
----- config                      ---------- 项目构建和环境配置等

----- src

--------- assets                  ---------- 静态文件

---------------fonts              ---------- iconfont文件

---------------icons              ---------- icon图标图片文件

---------------images             ---------- 图片文件

---------------styles             ---------- 公共样式文件

--------- common                  ---------- 公共ts文件

--------- config                  ---------- 业务公共配置文件

--------- hooks                   ---------- 公共hooks文件

--------- pages                   ---------- 主包文件

--------- pagesSub                ---------- 分包文件

--------- services                ---------- 接口相关文件

--------- stores                  ---------- stores文件

--------- app.config.ts           ---------- app路由，tabBar等配置

--------- app.ts                  ---------- 项目入口文件

--------- types                   ---------- types全局文件


## vscode 需安装插件

- Eslint
- Prettier
- Volar

与`vetur`相同，`volar`是一个针对 vue 的 vscode 插件，不过与 vetur 不同的是，volar 提供了更为强大的功能。

[Volar 介绍](https://juejin.cn/post/6966106927990308872)

## 搭建项目架构

### 初始化项目

初始化项目之前，需安装 taro，请参考 [Taro 文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)，完成 taro 安装

使用命令创建模板项目：

```shell
taro init myApp
```



安装 cli 用来执行构建等操作，之后启动项目，会生成一个 dist 目录

```shell
yarn add @tarojs/cli
yarn dev:weapp
```

> 打开微信开发工具 工程目录需要指向构建出来的 dist 文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/012d563407294fa8aba5e3d4584c33e9~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23af519f936548ab83ecfc27d791fba8~tplv-k3u1fbpfcp-watermark.image?)

Hello world 出现，项目成功跑起来了！

### 设置代码规范

- 代码规范 ESlint
- 代码格式化 Prettier
- 提交前检查 husky


安装依赖

```shell
yarn add @vue/eslint-config-prettier @vue/eslint-config-typescript eslint-plugin-prettier vue-tsc husky -D
```

设置代码规范和格式化规则

.eslintrc.js

```
module.exports = {
  root: true,

  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },

  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier', '@vue/typescript'],

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        arrowParens: 'avoid',
        printWidth: 100
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

```

.prettierrc

```
{
  "tabWidth": 2,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "endOfLine": "auto",
  "printWidth": 100
}
```

在 package.json 中 script 添加 Ts 检查命令和 Eslint 检查命令

```json
"scripts":{
  "tsc": "vue-tsc --noEmit --skipLibCheck",
  "lint": "eslint --ext .vue --ext .js --ext .ts src/"
}
```

添加 [husky](https://github.com/typicode/husky) 触发 Git 钩子，代码提交前检查

```
npx husky install
```

编辑 pre-commit 执行 Eslint 检查和 Ts 检查

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "---eslint start---"
npm run lint
echo "---eslint end---"

echo "---ts lint start---"
npm run tsc
echo "---ts lint end---"

```

至此，项目的代码规范和格式规范配置完毕，多人协作也不是问题了。

### 引入 NutUI

```shell
yarn add @nutui/nutui-taro
```

按需引入，安装插件 babel-plugin-import

```shell
yarn add babel-plugin-import -D
```

样式处理 因为 nutui 的设计稿是 375 的 所以将框架的设计尺寸调整为 375

项目配置文件 config/index.js 中配置:

```js
designWidth: 375
```

app.ts

```
import { createApp } from 'vue';
import { Button } from '@nutui/nutui-taro';

const app = createApp();

app.use(Button);
```

index.vue 中，nut-button 组件直接在 template 中写，不用再引入

```
<template>
  <view class="index">
    <text>{{ msg }}</text>
    <nut-button type="primary">主要按钮</nut-button>
  </view>
</template>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b485827220f4baaa15e6c7c6077ab33~tplv-k3u1fbpfcp-watermark.image?)

### 小程序分包配置

小程序主包超过 2M，就无法真机预览了，为了提前做好准备在一开始就进行分包处理。比如下面这个小程序的配置，分了四个包。

app.config.ts

```
pages: ['pages/create/index', 'pages/find/index', 'pages/my/index'],
subpackages: [
{
  root: 'pages/featureA',
  pages: ['index/index']
},
{
  root: 'pagesSub/search',
  pages: ['index']
},
{
  root: 'pagesSub/my',
  pages: ['detail/index', 'about/index']
},
{
  root: 'pagesSub/book',
  pages: ['detail/index', 'person/list/index', 'person/detail/index']
}
],
```

可以在小程序开发工具编辑器里的代码依赖分析，查看主包和分包的大小

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da38b9e6463c411792a7ca244782fa12~tplv-k3u1fbpfcp-watermark.image?)

### 使用 script setup 语法封装小程序页面生命周期方法

hooks/life.ts


### 安装 [Pinia](https://pinia.vuejs.org/introduction.html) 进行状态管理

```shell
yarn add pinia
yarn add taro-plugin-pinia

```

项目配置文件 config/index.js 中配置:

```js
plugins: ['taro-plugin-pinia']
```
### 请求方法封装
-- services
-- --- apis
-- --- ---- xxx.ts
-- --- http.ts
-- --- request.ts


请求方法封装还是用到了 `axios`，只是用的是 `axios-miniprogram` ，写法和 web 端基本一致，

### 样式封装

iPhoneX 底部横线适配

-- assets/styles/common.scss

刘海儿屏适配

-- assets/styles/hairline.scss


多行文字省略

-- assets/styles/ellipsis.scss



### 参考资料

[taro3-vue3-template](https://github.com/Yill625/taro3-vue3-template)
[taro 文档](https://taro-docs.jd.com/taro/docs/vue3)
[NutUI](https://nutui.jd.com/#/intro)
[Pinia](https://pinia.vuejs.org/introduction.html)
[Pinia 快速入门](https://juejin.cn/post/6986847203885056036)
[Volar 介绍](https://juejin.cn/post/6966106927990308872)
[网页适配 iPhoneX，就是这么简单](https://jelly.jd.com/article/6006b1055b6c6a01506c87fd)
[vant-weapp](https://github.com/youzan/vant-weapp/packages/common/style/hairline.less)
