# SteerLine 官网部署手册

按本文完成中英文内容检查、本地构建和 Cloudflare Pages 上传，再验证正式域名，即可完成一次发布。所有命令都在官网仓库根目录执行，示例使用 PowerShell。

维护日期：2026-10-27。部署方式、域名或构建配置发生变化时，同步更新本文；README 只保留部署入口。

## 当前部署配置

| 项目 | 当前约定 | 配置来源 |
| --- | --- | --- |
| 官网仓库 | `https://github.com/erranliu/SteerLineWebSite` | Git remote |
| 框架 | Astro + Starlight，静态站点 | `package.json`、`astro.config.mjs` |
| 正式域名 | `https://steerline.dev` | `astro.config.mjs` 的 `site` |
| 托管服务 | Cloudflare Pages | README 的现有部署约定 |
| Pages 项目名 | `steerline` | README 的现有部署约定 |
| 生产分支 | `main` | 现有部署命令；发布前核对 Pages 项目设置 |
| 构建命令 | `npm run build` | `package.json` |
| 上传目录 | `dist/` | Astro 默认静态构建输出 |
| 默认语言 | 英文，根路径 `/` 跳转到 `/en/` | `astro.config.mjs`、`public/_redirects` |
| 中文入口 | `/zh-cn/` | 路由和语言配置 |
| CI | PR 和 `main` 推送时检查构建，也可手动触发 | `.github/workflows/ci.yml` |

**目前采用本地构建、Wrangler Direct Upload 发布。GitHub Actions 不会自动部署。** 合并 PR 或推送 `main` 后，仍需要执行上传步骤。

Cloudflare 账号、Account ID 和项目实际的 `*.pages.dev` 地址，以管理后台和登录后的项目列表为准。项目名相同不代表默认域名一定是 `steerline.pages.dev`。

## 发布前对齐中英文

### 内容和元数据

中文首写，英文翻译并审查后同步发布。对应文章位于：

```text
src/content/docs/zh-cn/<栏目>/<文章>.md
src/content/docs/en/<栏目>/<文章>.md
```

两份文件使用相同的 `contentId`，语言切换组件依靠它查找对应文章，而不只依靠文件名。首页的双语文案在 `src/pages/[lang]/index.astro` 中维护；界面文案还涉及 `src/content/i18n/zh-CN.json`，术语参照 `docs/glossary.md`。

| 字段 | 发布要求 |
| --- | --- |
| `contentId` | 中英文相同；同一语言内不能重复 |
| `title`、`description` | 使用各自语言，并与最终正文一致 |
| `translationStatus` | 中文原文通常为 `current`；英文跟上中文后才设为 `current` |
| `updated` | 记录该语言页面实际更新日期，格式为 `YYYY-MM-DD` |
| `version` | 教程保留版本号；中英文内容对齐时使用相同的内容版本，不能只复制版本号而不翻译 |
| `sidebar` | 译名、排序和层级与实际目录对应 |

一次双语发布按以下顺序处理：

1. 完成中文正文和审查，更新日期；实质内容变化时递增文章版本。
2. 已有英文未同步时，将**英文文件**标记为 `translationStatus: needs-sync`。
3. 翻译最终中文内容，检查结论、示例、命令、链接和术语，更新英文日期及对应版本。
4. 审查完成后，将英文恢复为 `translationStatus: current`。
5. 检查中英文正文都完整，切换语言能到达同一篇文章。

### 中文先发布和历史占位页

中文可以先发布。已有英文正文但尚未同步时，保留 `needs-sync`，页面会显示等待同步的提示；这次发布应明确记为“中文更新，英文待同步”，不能视为双语已对齐。

新文章尚未翻译时，不要为了凑齐文件而新建空的英文占位页。没有对应英文文件时，语言切换组件会提示英文版尚未翻译。仓库中已有一些只含元数据的历史英文占位页，`needs-sync` 状态下会显示等待补充英文内容的提示；本次发布涉及这些文章时，要检查并明确保留待翻译状态，或补全正文，不能批量改成 `current`。

可以先列出所有待同步页面，再逐篇检查本次发布涉及的文章：

```powershell
Get-ChildItem src/content/docs/en -Recurse -File -Include *.md,*.mdx |
  Select-String -Pattern '^translationStatus:\s*needs-sync'
```

### 自动检查的范围

`npm run build` 依次运行内容检查、`astro check` 和静态构建。内容检查会检查必要元数据、同语言内 `contentId` 重复，以及每篇英文是否存在中文原文。

它**不会**自动验证翻译质量、中英文版本号是否一致、正文是否为空、所有链接是否有效，也不会禁止 `needs-sync` 页面发布。构建通过后，仍需按上述规则审查内容，并在预览中检查导航、搜索和语言切换。

## 准备发布环境和源码

### 选择可追溯的提交

正式发布使用已审查、已提交并推送的源码，通常与远端 `main` 一致。先在准备发布的检出目录中运行：

```powershell
git rev-parse --show-toplevel
git status --short
git log -1 --format="%H %s"
git fetch origin
if ($LASTEXITCODE -ne 0) { throw '获取远端提交失败，停止发布' }
git rev-list --left-right --count HEAD...origin/main
```

`git status --short` 应无输出；与 `origin/main` 比较应为 `0 0`。有未提交内容、待合并分支或领先/落后的提交时，先处理完，再进入正式发布。不要用重置或清理命令覆盖正在编辑的内容。Codex worktree 可能处于 detached HEAD，核对提交是否正确即可，不必强行切换分支。

**Wrangler 上传的是当前目录构建出来的文件。`--branch main` 只指定 Pages 的发布环境，不会切换 Git 分支、拉取远端源码或检查当前代码是否已经合并。**

### Node 和依赖

使用 Node.js 22.12 或以上版本；建议使用 Node.js 22，与仓库 CI 的主版本保持一致。安装 Git，确保终端能访问 npm registry 和 Cloudflare。

```powershell
node --version
npm --version
git --version
npm ci --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw '安装依赖失败，停止发布' }
```

发布时使用 `npm ci`，按 `package-lock.json` 安装依赖。不要为解决安装问题直接删掉锁文件或升级所有依赖；依赖升级应单独完成并验证。

### 登录并核对 Cloudflare 项目

本文使用 Wrangler 4 命令。仓库尚未将 Wrangler 锁定为本地依赖，`npx` 首次运行时会下载工具，需要网络；每次发布记录实际版本，需要复现时将 `wrangler@4` 替换为记录中的完整版本号。后续升级到新主版本时，先更新并验证本手册。

```powershell
npx wrangler@4 --version
if ($LASTEXITCODE -ne 0) { throw 'Wrangler 不可用，停止发布' }
npx wrangler@4 login
if ($LASTEXITCODE -ne 0) { throw 'Cloudflare 登录失败，停止发布' }
npx wrangler@4 whoami
```

登录时在浏览器授权。已登录且授权有效时可跳过 `login`。根据 `whoami` 和 Cloudflare 后台，确认拥有 `steerline` 项目的账号；将下面的占位值替换为该账号真实的 Account ID：

```powershell
$env:CLOUDFLARE_ACCOUNT_ID = '<拥有 steerline 项目的 Account ID>'
npx wrangler@4 pages project list
if ($LASTEXITCODE -ne 0) { throw '查询 Pages 项目失败，停止发布' }
```

在 [Cloudflare 后台](https://dash.cloudflare.com/) 的 Workers & Pages 中确认：项目为 `steerline`，生产分支为 `main`，Custom domains 中有 `steerline.dev` 且状态为 Active。记录项目实际的默认 Pages 域名，以及当前正常的生产 Deployment ID，供验证和回滚使用。

找不到项目时，先检查账号与权限。不要因查询失败就在另一个账号中创建同名项目。Account ID 可以写入本次发布记录，API Token 和 OAuth 凭证不能写入仓库或发布记录。

## 构建和本地验收

```powershell
npm run build
if ($LASTEXITCODE -ne 0) { throw '构建失败，停止发布' }
Get-Item dist/index.html,dist/en/index.html,dist/zh-cn/index.html,dist/_redirects
npm run preview -- --host 127.0.0.1 --port 4321
```

打开终端给出的本地地址，检查以下内容后，用 `Ctrl+C` 停止预览：

- 英文首页 `/en/`、中文首页 `/zh-cn/` 都能打开，首页文案和导航正确。
- 本次修改的中英文文章正文完整，标题、版本号、日期和翻译提示正确。
- 文章语言切换到达对应文章；没有译文时显示未翻译提示。
- 侧边栏、正文链接、图片、代码块和移动端布局正常。
- 搜索能找到本次新增或修改的内容。

本地预览的根路径由 HTML 跳转；Cloudflare Pages 上的 HTTP 302 由 `dist/_redirects` 实现，上线后另行验证。修改了任何源码，都应重新构建和验收，再上传新生成的 `dist/`。构建失败时不能上传上一次残留的产物。

## 上传和正式发布

Cloudflare Pages Direct Upload 发布的是预先构建好的静态目录，无需在云端再执行安装和构建。参见 [Cloudflare Direct Upload 文档](https://developers.cloudflare.com/pages/get-started/direct-upload/)。

### 可选的云端预览

需要先在 Cloudflare 环境检查时，上传到非生产分支：

```powershell
npx wrangler@4 pages deploy dist --project-name steerline --branch release-preview
if ($LASTEXITCODE -ne 0) { throw '预览上传失败' }
```

确认 `release-preview` 不是项目的生产分支。使用命令返回的预览 URL 完成上节检查；预览可能公开可访问。预览成功不等于正式域名已更新。

### 发布生产版本

确认内容审查和构建验收完成，且当前源码仍是同一份干净提交：

```powershell
if (git status --porcelain) { throw '存在未提交内容，停止正式发布' }
$releaseCommit = git rev-parse HEAD
if ($LASTEXITCODE -ne 0) { throw '无法读取发布提交，停止发布' }
npx wrangler@4 pages deploy dist --project-name steerline --branch main --commit-hash $releaseCommit
if ($LASTEXITCODE -ne 0) { throw '正式上传失败，检查 Pages 后台状态' }
```

此命令会更新生产环境。只上传 `dist/`，不要上传仓库根目录，也不要使用面向 Workers 的 `wrangler deploy` 替代。命令参数说明参见 [Wrangler Pages 命令](https://developers.cloudflare.com/workers/wrangler/commands/pages/)。

保存 Wrangler 返回的 Deployment ID 和部署 URL，在后台确认该记录属于 Production 且发布成功。上传超时或连接中断时，先查 Deployments，确认是否已经成功，避免盲目重复上传。

## 正式域名验证

### 每次发布都要检查

```powershell
curl.exe -I --max-time 30 https://steerline.dev/
curl.exe -I --max-time 30 https://steerline.dev/en/
curl.exe -I --max-time 30 https://steerline.dev/zh-cn/
```

根路径预期返回 `302`，`Location` 指向 `/en/`；两个语言首页预期返回 `200`。随后在浏览器打开正式域名上的本次修改页面，检查正文确实是新版本，并完成语言切换、导航和搜索验证。仅看到状态码成功，不能证明新内容已经上线。

默认 Pages 域名和正式域名都应检查。若部署 URL 已更新而正式域名仍是旧内容，先核对是否误发到了预览环境，再检查生产部署、域名绑定和浏览器/CDN 缓存。

### 首次绑定或修复域名

日常内容发布无需重复修改 DNS。需要恢复域名配置时，按以下步骤操作：

1. 在拥有 Pages 项目的 Cloudflare 账号中管理 `steerline.dev` zone，并按 Cloudflare 要求配置域名注册商处的 nameservers。
2. 打开 Workers & Pages → `steerline` → Custom domains，通过 Set up a domain 添加 `steerline.dev`。
3. 按后台提示确认 DNS，等待域名状态为 Active，HTTPS 证书可用。
4. 确认 `astro.config.mjs` 的 `site` 仍为 `https://steerline.dev`，再验证根路径和两个语言入口。

必须通过 Pages 的域名绑定流程关联域名，不能只手工加一条 CNAME。DNS 目标使用后台显示的实际 Pages 域名。根域名接入和 DNS 规则参见 [Cloudflare 自定义域名文档](https://developers.cloudflare.com/pages/configuration/custom-domains/)。

`www.steerline.dev` 不属于仓库当前约定的正式入口。若需要支持它，先单独添加并验证域名绑定，再配置到 `https://steerline.dev` 的跳转，不能假定它已生效。

## 故障处理和回滚

| 现象 | 处理方法 |
| --- | --- |
| `astro` 不是可识别的命令 | 在仓库根目录成功执行 `npm ci` 后重试构建，不依赖全局 Astro |
| npm 下载或 Cloudflare 请求失败 | 检查 DNS、网络和代理，恢复后重试；不要通过修改依赖版本解决连通性问题 |
| 内容校验失败 | 按输出修复元数据、重复 `contentId` 或缺少中文原文的问题 |
| 英文空白或内容过期，但构建成功 | 检查英文正文和 `translationStatus`；这些不属于构建的自动验收范围 |
| 构建通过，但正文链接或语言切换错误 | 核对路径、`contentId` 和实际输出，修正后重新构建 |
| Cloudflare 登录有效但找不到项目 | 检查账号、`CLOUDFLARE_ACCOUNT_ID` 和 Pages 权限 |
| 上传成功但正式站没更新 | 检查部署环境是否为 Production、生产分支是否为 `main`、域名绑定及缓存 |
| 默认 Pages 域名正常，正式域名异常 | 检查 Custom domains、DNS、nameservers 和证书 |

生产页面出现严重问题时，优先恢复上一份正常部署：在 `steerline` 项目的 Deployments 列表中，找到已验证的生产部署，打开操作菜单，选择 **Rollback to this deployment** 并确认。预览部署不能作为生产回滚目标。参见 [Cloudflare 回滚文档](https://developers.cloudflare.com/pages/configuration/rollbacks/)。

回滚后重新验证正式域名和关键页面，并记录回滚目标。Cloudflare 回滚不会修改 Git 源码；后续应修复或撤销有问题的提交，再按完整流程发布，避免把问题版本再次上传。

## 发布完成记录

每次发布在 PR、发布日志或团队约定的记录位置留下以下信息：

```text
发布时间与时区：
源码提交 SHA：
Node / npm / Wrangler 完整版本：
Cloudflare 账号及 Account ID：
Pages 项目：steerline
环境 / 分支：Production / main
Deployment ID 与部署 URL：
正式域名：https://steerline.dev
中英文状态：已对齐 / 中文先发（列出待同步文章）
构建、本地验收和正式域名验证结果：
上一个正常的生产 Deployment ID：
```

发布完成的标准是：源码可追溯、内容状态清楚、构建通过、Cloudflare 生产部署成功，且正式域名已验证新内容。
