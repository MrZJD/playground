# graphql-demo
use graphql

## 从0开始

## devDependencies

数据持久化mem-fs-editor
Web服务框架Koa
vue graphql数据管理框架vue-apollo

## parcel

```bash
npm install -D parcel-bundler

parcel index.html -p <port>

parcel watch index.html
```

## parcel介绍

内置转换器，不需要其他配置进行启动

```bash
1. babel // 安装预设及插件 如babel-preset-env .babelrc
2. PostCSS // 安装插件 如postcss-modules autoprefixer .postcssrc
3. ts // 默认支持 无需额外的配置
4. PostHTML // 安装插件 如posthtml-img-autosize .posthtmlrc
```

## parcel代码分割

```js
// 基于 import() <Promise>

import('./page/index.js').then(page => {})
```

## parcel构建

```bash
parcel build index.html -d build/output --public-url ./ --no-minify --no-cache

set NODE_ENV=production&&parcel build index.html
```