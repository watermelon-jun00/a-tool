# GitHub Pages 部署步骤

这个项目是纯静态网页，已经整理好可发布目录：`docs/`。

## 发布目录内容

`docs/` 里只放公网网页需要的文件：

- `index.html`
- `style.css`
- `app.js`
- `student-import-template.xlsx`
- `.nojekyll`

根目录里的 SQL、需求文档、原始表格、启动脚本不会作为 GitHub Pages 网站内容发布。

## 第一次部署

1. 确认本地修改已经提交并推送到 GitHub。
2. 打开仓库：`https://github.com/watermelon-jun00/a-tool`
3. 进入 `Settings`。
4. 左侧进入 `Pages`。
5. 在 `Build and deployment` 里选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/docs`
6. 点击 `Save`。
7. 等 GitHub Pages 构建完成。

部署成功后，默认访问地址通常是：

`https://watermelon-jun00.github.io/a-tool/`

## 后续更新

以后功能继续调整时，不需要更换网址。

1. 修改根目录里的 `index.html`、`style.css`、`app.js`。
2. 运行 `sync-github-pages-docs.command`，把需要发布的文件同步到 `docs/`。
3. 提交并推送到同一个 GitHub 仓库。
4. GitHub Pages 会自动更新同一个网址。

## 数据提醒

网页数据保存在每个浏览器自己的 `localStorage`。

- 你的本地数据不会自动出现在别人电脑上。
- 别人打开公网网址后，会使用他自己浏览器里的本地数据。
- 如果要迁移数据，先在旧页面导出 JSON，再在新页面导入。
- 如果未来换域名，`localStorage` 也会变，需要导出/导入，或先做云端同步。

## 费用

使用 GitHub Pages 默认网址不需要购买。

只有在你想绑定自己的域名时，才需要购买域名。
