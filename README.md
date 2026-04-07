# Theme Astro Starter

面向 [Halo](https://www.halo.run/) 的主题脚手架：以 **Astro** 作为预渲染框架，将组件与页面编译为干净的 HTML，交由 **Thymeleaf** 在运行时完成数据渲染。

官方主题开发指南：<https://docs.halo.run/developer-guide/theme/prepare>

## 为什么选择 Astro？

Halo 主题采用 Thymeleaf 纯后端渲染方案，传统上只能在 HTML 文件里直接写 Thymeleaf 语法。这对简单主题足够用，但若需要 Vue / React 组件或复杂的前端交互，就会很局限。

Astro 的特点恰好弥补了这一短板：

- **输出干净的 HTML**：Astro 不同于 SPA 框架，其默认产物是纯 HTML 文件，而不是 JS 包。Thymeleaf 的属性（`th:text`、`th:if`、`th:replace` 等）会作为普通 HTML 属性原样保留，两者互不干扰。
- **Island 架构**：仅在真正需要交互的地方注入客户端 JS（Vue / React 组件），其余部分零 JS 开销。
- **组件化开发体验**：通过 Astro 组件的 `slot` 与 `props` 在 **编译阶段** 组织布局与复用，最终产物是 Thymeleaf 可直接使用的 HTML 模板。

## 何时选择此 Starter？

| 场景                                                    | 推荐                                                                          |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 主题有较多前端交互，希望用 Vue / React 编写 Island 组件 | **本 Starter**                                                                |
| 主题以静态展示为主，前端交互需求较少                    | [halo-dev/theme-vite-starter](https://github.com/halo-dev/theme-vite-starter) |

## 技术栈

| 类别    | 说明                                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 运行时  | Halo 使用 **Thymeleaf** 渲染主题；模板变量与 Finder API 随 Halo 版本演进，请以[官方文档](https://docs.halo.run/developer-guide/theme/prepare)为准 |
| 预渲染  | **Astro**，将 `src/` 下的页面与组件编译为 `templates/` 下的纯 HTML                                                                                |
| UI 框架 | **Vue 3**（通过 `@astrojs/vue` 集成，用于编写 Island 组件）                                                                                       |
| 语言    | TypeScript（Astro 组件 frontmatter 支持）                                                                                                         |
| 包管理  | **pnpm**                                                                                                                                          |

## 核心概念：Astro 编译期 vs Thymeleaf 运行期

理解这两个阶段的边界是使用本 Starter 的关键：

```
开发时                           构建后                    Halo 运行时
─────────────────────────────    ──────────────────────    ──────────────────────────
src/pages/index.astro        →   templates/index.html  →   Thymeleaf 注入数据渲染
  Astro 组件 / slot / props         干净的 HTML +              th:text / th:if 生效
  Vue Island 组件                   Thymeleaf 属性原样          客户端 JS 激活 Island
```

**重要限制**：

- `slot`、`props` 是 Astro **编译期**的概念，Thymeleaf 运行时感知不到它们，也无法向 Astro 组件传递动态数据。
- 在 Astro 组件中可以直接写 `th:text`、`th:if`、`th:replace` 等 Thymeleaf 属性——Astro 会将其视为普通 HTML 属性原样输出，Thymeleaf 在运行时才会处理它们。
- Vue / React Island 组件（`client:*`）的数据来源是客户端（例如调用 Halo API），无法直接使用 Thymeleaf 的服务端变量。

## 目录结构

```
.
├── src/
│   ├── pages/           # Astro 页面（编译为 templates/ 下的 HTML）
│   │   ├── index.astro
│   │   ├── post.astro
│   │   ├── category.astro
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro # 全局布局组件
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeSwitcher.vue  # Vue Island 示例
│   │   └── ...
│   └── styles/          # 全局样式
├── public/              # 原样复制到 templates/：静态资源或纯 Thymeleaf 模板均可放此处
│   └── fragments/       # 纯 Thymeleaf 片段示例（不经 Astro 编译，直接输出）
├── templates/           # Astro 构建产物（Halo 实际读取的模板目录）
├── theme.yaml           # 主题元数据（必填）
├── settings.yaml        # 控制台主题设置表单（可选）
├── astro.config.mjs
└── package.json
```

> **`templates/` 是构建产物**，不要直接在此目录手动修改；请修改 `src/` 后重新构建。

## 开发

```bash
git clone https://github.com/halo-sigs/theme-astro-starter.git ~/halo2-dev/themes/astro-starter
cd ~/halo2-dev/themes/astro-starter
pnpm install
pnpm dev
```

`pnpm dev` 会启动 Astro 开发服务器并监听 `src/` 变更，实时重新生成 `templates/`。

将主题目录链接或复制到 Halo 的 `themes/astro-starter/` 后，在控制台安装并启用主题即可预览。建议同时关闭 Thymeleaf 缓存以便热更新调试：

```yaml
# application.yaml
spring:
  thymeleaf:
    cache: false
```

或通过环境变量：`SPRING_THYMELEAF_CACHE=false`

## 构建

```bash
pnpm build
```

执行 Astro 构建，将 `src/` 编译输出到 `templates/`。构建完成后可将主题目录（含 `templates/`、`theme.yaml`、`settings.yaml` 等）打包为 ZIP 上传到 Halo 控制台，或使用 [`@halo-dev/theme-package-cli`](https://github.com/halo-dev/theme-package-cli) 完成打包。

## 其他脚本

| 命令          | 作用                    |
| ------------- | ----------------------- |
| `pnpm format` | Prettier 格式化所有文件 |

## 注意事项

- Astro 配置中 `base` 需与 `theme.yaml` 的 `metadata.name` 保持一致（当前为 `astro-starter`），这决定了静态资源的引用路径。
- `public/` 目录不仅可以存放图片、字体等静态资源，也可以存放**纯 Thymeleaf 模板**（例如 `public/fragments/post-list.html`）。这些文件会被 Astro 原样复制到 `templates/` 对应路径，不经过任何编译处理，适合编写不需要 Astro 组件化的 Thymeleaf 片段。
- Vue Island 组件可通过 Halo 提供的 [API Client](https://www.npmjs.com/package/@halo-dev/api-client) 在客户端获取数据。
