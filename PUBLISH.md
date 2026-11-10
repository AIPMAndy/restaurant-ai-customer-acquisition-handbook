# 发布说明｜独立仓库 + GitHub Pages

> 2026-11-10。**此项目在本地生成并完成校验不等于已经在线发布。**

## Step 1｜在 GitHub 新建空的公开仓库

1. 登录拥有 `AIPMAndy` 写入权限的 GitHub 账号，打开 https://github.com/new 。
2. Owner：`AIPMAndy`；Repository name：`restaurant-ai-customer-acquisition-handbook`；Visibility：`Public`。
3. **不要**勾选预初始化 README、.gitignore 或 License（这些文件已包含在压缩包里）。
4. 创建后复制仓库 HTTPS 地址，核对仓库名与上面完全一致。

## Step 2｜完整推送这个项目

将交付 ZIP 解压到电脑。进入解压后的项目根目录（与 README.md 同级）。**最简单的方式：先创建空仓库，再执行 `bash scripts/publish.sh`（会先测试、校验远端，最后安全推送，不会 `--force`）。**

如需手动逐行操作，可运行：

```bash
python3 scripts/build.py
python3 scripts/check.py
python3 -m unittest discover -s tests -v

git init
# 如果已经存在 .git，请勿重复初始化，也不要改变已有远端
git add .
git commit -m "feat: open-source restaurant AI customer acquisition handbook"
git branch -M main
git remote add origin https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook.git
git push -u origin main
```

如果本机尚未设置 Git 作者身份，按 Git 提示设置自己的用户名和邮箱。请确认 URL 指向 **新建的独立仓库**，避免覆盖旧项目。

## Step 3｜开启 Pages

1. 仓库页面进入 **Settings → Pages → Build and deployment**。
2. **Source：GitHub Actions**。
3. `main` 分支触发 `.github/workflows/pages.yml`，先运行 `verify`，后运行 `deploy`。
4. 进入 **Actions** 检查最近一次运行；两项均为 Success 后再打开网站。
5. 访问 https://aipmandy.github.io/restaurant-ai-customer-acquisition-handbook/ 。

**遇到因 Pages 尚未激活而导致部署失败：**确认 Pages Source 设置，再通过 Actions 重跑失败任务；不要更改已发布仓库或对其他仓库推送。工作流中不使用需要额外管理员权限的 `enablement: true`。

## Step 4｜上线前最终验收（每项亲手点）

- [ ] `README.md` 在仓库首页正常显示，SVG封面加载成功。
- [ ] 首页可访问（HTTP 200）且移动端 390px 不横向滚动。
- [ ] 课程目录有26章；任意打开第1、7、26章，内容完整。
- [ ] 18组提示词搜索与复制可用。
- [ ] 30天本地勾选、刷新后保留；清空与导出可用。
- [ ] 单单贡献默认示例 `69-27-5-6-0-8=23`；负数提示正确；无效输入拦截。
- [ ] 作者官网、咨询页、知识库和微信复制入口可用。
- [ ] `sources.html` 的官方来源可点击。
- [ ] `sitemap.xml`、`llms.txt` 可打开，站点规范URL指向当前项目。
- [ ] 网站无未经许可的家人门店名称、城市、关系和内部流水；模拟案例标识完整。
- [ ] GitHub仓库是 `Public`，未误提交 API Key、顾客信息、账号密码、`.env`。
- [ ] 社交分享预览：GitHub Settings → General → Social preview 手工上传项目内 `assets/social-preview.png`。

## Step 5｜外部传播前改发布状态

只有完成上述步骤后，才能把 README 中的‘计划创建’和‘当前发布状态’改为‘已发布’，并正式向粉丝分享 GitHub / Pages 链接。若 GitHub Pages 最终无法开启，仍可使用源码 ZIP 或其他合规托管方案，但不能声称 GitHub Pages 已上线。