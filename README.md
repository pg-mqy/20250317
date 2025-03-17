# PDFRotator 组件说明

## 1. 功能概述

PDFRotator 组件是一个用于在线旋转和预览 PDF 文件的 React 组件，支持单页旋转、全部页面旋转、缩放预览以及旋转后下载修改后的 PDF 文件。

## 2. 主要技术栈

React + Next.js

react-pdf：用于解析和渲染 PDF 文件。

pdf-lib：用于操作 PDF，旋转页面。

react-dropzone：支持拖拽上传 PDF 文件。

Ant Design：组件库。

next-intl：用于i18n。

## 3. `node version  18.20.1`
安装依赖
```bash
npm i
```
启动命令

```bash
    "local:test": "dotenv -e .env.test next dev",
    "local:prod": "dotenv -e .env.prod next dev",
```



