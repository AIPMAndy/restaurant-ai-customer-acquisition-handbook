# v1.0.0｜2026-11-10｜餐饮行业 AI 获客保姆级攻略

**状态：本地可交付发行包；未完成 GitHub 新仓库创建和 Pages 正式上线。**

## 已完成

- 26章独立实操课程与可检索目录；每章都有3步、实例、完成凭证、失败回退和指标。
- 4条餐饮门店路线，18组AI提示词、30天逐日任务。
- 14份空白经营 CSV 模板，4份Markdown行动模板，1份明确虚构的单店教学案例。
- 浏览器本地贡献计算器、30天打卡与导出、章节进度与内容搜索。
- 35个独立静态HTML页面、站点地图、官方来源链接、隐私与合规说明。
- 个人官网 `https://metaver.vip/`、个人咨询 `https://metaver.vip/services`、星觉科技官网 `https://www.a6no1.cn/`、GitHub账号与微信 `AIPMAndy`。
- GitHub Pages Actions 工作流、零依赖构建/校验脚本、隐私保护审核清单、发布宣传素材。

## 本地测试（实际执行）

- `python3 scripts/build.py`：**PASS**（生成35页）。
- `python3 scripts/check.py`：**PASS**（页面SEO与站内链接、课程数量、资源存在性、电话格式扫描、无远程脚本传输调用）。
- `python3 -m unittest discover -s tests -v`：**PASS，9项测试**。
- `node --check assets/app.js`：**PASS**（JavaScript语法）。
- `bash -n scripts/publish.sh`：**PASS**（安全发布脚本语法）。

## 尚未完成（必须如实列出）

- 新 GitHub Public 仓库的创建、main推送、Actions部署及GitHub Pages实际在线访问。
- 浏览器E2E：当前执行环境的Chromium/Playwright访问 localhost 和 `file://` 都返回管理员阻止，因此未完成交互验收；须在真实浏览器或部署后补测。
- 390px移动端真实浏览器布局、剪贴板授权、社交分享预览、外部官方链接及跨平台实际可用性。
- **无真实餐饮用户测试、无真实订单/转化/盈利数据。** 文中演示数字全部虚构。

## 发布与验收

先读 [PUBLISH.md](PUBLISH.md)。只有在远端仓库与实际页面验证完成后，才能对外宣称项目网站已经上线。