# theme-astro-starter(Experimental)

Halo 2.0 基于 [Astro](https://astro.build) 和 [Thymeleaf](https://www.thymeleaf.org/) 的主题快速开始模板。

> 目前还处于实验和探索的阶段。

## 原理

1. Astro 作为 SSG 渲染框架，用于组件封装、页面框架组织、静态页面生成、静态资源的构建。
2. Thymeleaf 作为后端页面渲染框架，并且负责提供数据进行页面数据的渲染。由于 Thymeleaf 的语法是基于 HTML 元素的 Attributes 扩展，所以理论上并不会破坏 HTML 的结构。那么就可以在 Astro 组件中使用 Halo 提供的数据和页面进行绑定。这样就实现了在开发环境并不依赖于 Halo 后端，可以在开发过程中保留 hmr。并且可以做到在构建之后可以直接给 Halo 使用。

## 特性

1. 得益于 Astro 框架，可以使用现代的前端技术栈开发页面。包括但不限于 Vue React Svelte 等，意味着可以使用这些现代前端框架进行组件开发。
2. 在开发环境可以实现 hmr。
3. 在构建页面之后，会自动处理构建产物的资源地址，转换为 Thymeleaf 可识别的语法。
4. 最终构建的产物可通过 HTML 直接访问，也可以部署在任何静态页面服务器，可作为页面预览原型。但因为没有经过 Halo 进行数据绑定，所以没有数据填充。

## 开发

项目结构：

```text
├── astro.config.mjs                                        Astro 配置文件
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── components
│   │   ├── Card.astro
│   │   └── PostCard.vue                                    Vue 3 组件
│   ├── layouts                                             Astro 布局组件
│   │   └── Layout.astro
│   └── pages
│       ├── index.astro                                     Astro 页面组件
│       └── post.astro
├── templates
│   ├── assets                                              bundle 之后的静态资源文件
│   │   ├── 4669d51c.dbc606a6.css
│   │   ├── PostCard.42ac9187.js
│   │   ├── chunks
│   │   │   └── runtime-core.esm-bundler.e59bb94c.js
│   │   └── client.e67fc49c.js
│   ├── favicon.ico
│   ├── index.html                                          构建之后的静态页面，作为 Thymeleaf 渲染模板
│   └── post.html
├── theme.yaml                                              主题描述文件
└── tsconfig.json
```

```bash
git clone https://github.com/ruibaby/theme-astro-starter

pnpm install

# 启动 Vite 开发环境
pnpm dev

# 构建最终产物，构建之后可以直接在 Halo 当中安装使用
pnpm build
```
