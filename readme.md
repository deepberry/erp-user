# Titan2

## Dev

### 准备工作

私有包安装请先参考此[设置](https://github.com/deepberry/docs/blob/master/packages/install.md)  
本项目将依赖[@deepberry/titan-web-components](https://github.com/deepberry/titan-web-components)、[@deepberry/common](https://github.com/deepberry/common)等公共库

### 本地开发

#### cmd

```shell
npm install
## 纯前端开发模式
npm run serve
## 接口访问本地服务
npm run dev
```

#### contents

— `assets`

-   `css` 样式文件
-   `img` 图片文件
-   `components` 组件模块
-   `constants` 常量设置
-   `extensions` 扩展（第三方）
-   `hooks` 钩子函数
-   `locale` 多语言
-   `pages` 多页面
-   `router` 路由
-   `service` API 请求
-   `store` 状态
-   `types` ts 声明文件
-   `utils` 工具函数
-   `views` 子页面

## Deploy

1. 默认请在`dev`分支开发
2. master 分支在收到 push 推送时，将自动构建至`dist`分支，同时部署至预览测试环境（web hook 通知测试服务器）
3. master 分支在收到 release 时，将自动部署至 oss（开启 oss 自动更新 cdn）
