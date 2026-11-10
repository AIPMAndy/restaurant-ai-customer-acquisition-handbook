# 餐饮行业 AI 获客保姆级攻略 🍜

> **让附近的人找到店，愿意到店，真实成交，愿意复购。** 一个零预算也能开始、可离线使用的餐饮门店增长实战手册。
>
> **作者：AI 酋长 Andy** · **版本：v1.0.0（2026-11-10）** · **完全免费开源** · **平台事实核验基准：2026-11-10**

![餐饮 AI 获客保姆级攻略封面](site/assets/social-preview.svg)

**GitHub 仓库（已创建，在线版仍以 Actions 验收为准）：** `https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook`  
**GitHub Pages 目标地址（仓库公开并部署成功后才能访问）：** `https://aipmandy.github.io/restaurant-ai-customer-acquisition-handbook/`

**作者与合作：** [个人官网](https://metaver.vip/) · [AI 咨询与企业合作](https://metaver.vip/services) · [醒觉知识库](https://kb.metaver.vip/) · [星觉科技企业官网](https://www.a6no1.cn/) · 微信 **`AIPMAndy`**。教程永久免费，咨询或其他服务是独立的可选服务。

## 1分钟开始

1. 直接双击 [`site/index.html`](site/index.html)，进入已经生成好的**完整网站**（无需联网/账号/数据库/API Key）。
2. **餐饮老板：**从 [26章实操课程](HANDBOOK.md) → [7天闭环](site/guide/22.html) → [30天执行清单](PLAN-30-DAYS.md) 开始。打卡与利润计算在浏览器本地完成。
3. **想用AI：**复制 [18组实用提示词](PROMPTS.md)，但只能使用**真实且脱敏**的门店资料；输出必须由人审核。
4. **想算钱：**打开 [`site/tools.html`](site/tools.html) 的[单单贡献计算器](site/tools.html)，填写真实可核对的账单数据，而非演示数字。

## 为什么做这份攻略

在餐饮经营里，**播放量不是到店，到店不等于核销，核销不等于利润**。AI可以省下整理评论、写脚本、安排拍摄、复盘账本的重复劳动，但不能凭空创造真正的菜品、顾客和收入。

作者接触过家人经营的传统线下服务门店，观察到‘让顾客信任并愿意回来’的重要性。本项目不公开可反向识别的家庭信息，也不会将非餐饮业务包装成餐饮成功案例。所有数字示例均明确标注为**虚构教学演算**。

## 已完成交付与验收

| 部分 | 交付内容 | 使用方式 |
| --- | --- | --- |
| **26章课程** | 每章都有3个步骤：操作、虚构演练、完成凭证、失败回退、指标 | [网站课程](site/handbook.html) / [Markdown全文](HANDBOOK.md) |
| **4条门店路线** | 快餐粉面、茶饮咖啡、火锅正餐、社区小店 | [选择路线](site/routes.html) |
| **18组AI提示词** | 需求、菜单毛利、团购、短视频、小红书、评价、复盘、风控等 | [网页复制](site/prompts.html) / [Markdown版](PROMPTS.md) |
| **30天逐日计划** | 浏览器本地打卡、进度条、导出清单 | [交互计划](site/plan.html) / [Markdown版](PLAN-30-DAYS.md) |
| **14份CSV表格** | 渠道、菜单贡献、短视频、核销、客诉、投放及周报等 | [CSV模板目录](templates/) |
| **4份Markdown模板** | 7天行动卡、AI简报、达人合作卡、每周三行动 | [模板目录](templates/) |
| **单单贡献计算器** | 识别实收、成本、平台费、补贴、履约和获客成本 | [利润工具](site/tools.html) |
| **完整虚构案例** | 7天计划+单单贡献演示（明确非真实业绩） | [教学案例](examples/simulated-restaurant.md) |
| **官方资料及风控** | 平台入驻、广告法、隐私、AI标识、评价及食品安全 | [来源页](site/sources.html) / [资料文档](docs/SOURCES.md) |
| **自动检查/部署** | Python零依赖构建与测试、GitHub Actions Pages 工作流 | [发布说明](PUBLISH.md) |

## 哪类餐饮老板先学哪几章

| 门店 | 最先解决的问题 | 先读章节 |
| --- | --- | --- |
| 快餐/粉面/盒饭 | 午市效率、真实地址、出餐和接待容量 | 01、04、06、10、14 |
| 茶饮/咖啡/烘焙 | 真实SKU、低客单贡献、复购服务 | 02、04、08、10、19 |
| 火锅/烧烤/正餐 | 多人团购、订座/等位、核销与口碑 | 03、07、13、15、16 |
| 社区餐馆/夫妻店 | 周边可发现性、服务评价、长期回店 | 06、09、13、17、19 |

> 章节编号以 [完整目录](site/handbook.html) 为准。无需每个平台同时开通，先从最有经营基础的平台开始。

## 三个要守住的边界

**一、经济账。** 顾客实付额≠净收入，平台团购券售出≠有效核销。单单贡献=真实实收－可变成本－平台费用－商家补贴－新增履约成本－获客费；固定成本、税费和其他费用另行核算。计算器的默认数值仅供练习。

**二、真实内容。** 不虚构点评、探店、成交与食品安全资质；不买好评/刷单；菜品实物优先实拍，AI生成合成内容依规披露。参考[广告法](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2023/art_5474cf75173c45d6a0379730fb4e8d97.html)、[网络反不正当竞争暂行规定](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2024/art_80019fe59e464196bef173dc56678a42.html)及[AI生成合成内容标识办法](https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm)。

**三、隐私。** 不公开家人身份、门店地址、经营数字、顾客原始资料。网站不登录、不上传顾客数据，打卡状态仅保存在本机浏览器。手机与订单处理需符合[个人信息保护法](https://www.cac.gov.cn/2021-08/20/c_1631050028355286.htm)。

## 平台入驻官方资料

- [抖音生活服务商家与抖音来客角色](https://developer.open-douyin.com/docs/resource/zh-CN/developer/join/Role)：团购、短视频、直播和到店核销的官方入口说明。
- [美团餐饮商家入驻](https://ecom.meituan.com/emis/settle)：门店展示与到店营销入口。
- [小红书官方招商入口](https://zhaoshang.xiaohongshu.com/merchant/login?from=xhsweb)：实际本地生活入驻资格与服务以后台为准。

**注意：** 不同城市、行业、主体和账号权益可能不同。这里不承诺任何平台功能都一定可开通，也不承诺爆单、月入或盈利。

## 项目目录

```text
restaurant-ai-customer-acquisition-handbook/
├── README.md                    首屏、路径与品牌入口
├── HANDBOOK.md                  26章完整可读教程（构建生成）
├── PROMPTS.md                   18组提示词（构建生成）
├── PLAN-30-DAYS.md              30天行动清单（构建生成）
├── src/content.py               唯一可编辑内容源
├── src/content.json             由构建器自动导出的内容快照
├── assets/                      网站样式、交互脚本与原创SVG/PNG封面
├── site/                        35个可直接访问的静态HTML网页和索引资源
│   ├── guide/01.html ... 26.html
│   ├── index.html, handbook.html, prompts.html, plan.html, tools.html
│   ├── routes.html, sources.html, privacy.html, 404.html
│   └── sitemap.xml, llms.txt, assets/
├── templates/                   14个空白CSV + 4个Markdown模板
├── examples/simulated-restaurant.md  完全虚构教学案例
├── docs/SOURCES.md              官方来源与核验边界
├── docs/REVIEW.md               对抗式内容、财务与隐私审核
├── docs/CONTENT-PROMOTION.md    Threads/小红书/公众号发布稿
├── docs/PRIVACY-CHECKLIST.md    公开素材与家庭信息边界
├── scripts/build.py             Python零依赖静态网站构建器
├── scripts/check.py             页面与数据完整性检查
├── scripts/publish.sh           防误覆盖的一键推送脚本
├── tests/test_project.py        可复现单元测试
├── .github/workflows/pages.yml  GitHub Actions校验与Pages发布
├── PUBLISH.md                   从空仓库到上线的操作说明
└── LICENSE                      MIT（仅原创内容和代码）
```

## 本地构建与检查

Python 3.10+，无需 `pip install` / Node / 第三方API。

```bash
python3 scripts/build.py
python3 scripts/check.py
python3 -m unittest discover -s tests -v
python3 -m http.server 8080 --directory site
# 浏览器打开 http://localhost:8080
```

网站静态页面已经包含在压缩包中。支持 `file://` 离线打开，部分浏览器在 `file://` 下可能限制本地存储/剪贴板，可用上面的本地服务打开。

## 发布到 GitHub Pages

请先阅读 [PUBLISH.md](PUBLISH.md)。简述：在 `AIPMAndy` 下创建一个**新的 Public 空仓库** `restaurant-ai-customer-acquisition-handbook`（不要覆盖任何已有仓库）→ 上传本目录全部文件 → `main` 分支工作流检查成功 → Settings → Pages → Source 选择 **GitHub Actions** → 等待部署成功 → 实测网站访问、导航与手机布局。

**在线版发布说明：仓库已创建。由于当前发布通道无法读取原 ZIP 的全部二进制和构建文件，仓库保存完整课程 Markdown、提示词、30 天计划与从这些内容生成的静态网站；ZIP 原版的完整源码、测试和配套素材需要另行通过本地 `scripts/publish.sh` 同步。GitHub Pages 是否上线以 Actions 和 HTTP 访问核验为准。**

## 参与修改与授权

- [CONTRIBUTING.md](CONTRIBUTING.md)：提交纠错时附官方来源、核验日期及复现步骤。
- [docs/REVIEW.md](docs/REVIEW.md)：新手、店主、财务、合规、工程师五视角对抗式审核。
- 开源协议：[MIT License](LICENSE)。作者原创教程、设计和源码按 MIT 授权；任何第三方商标、网页、平台数据及素材不因此取得转授权。

---

**AI 酋长 Andy** · [官网](https://metaver.vip/) · [咨询及合作](https://metaver.vip/services) · [GitHub开源项目主页](https://github.com/AIPMAndy) · [星觉科技企业官网](https://www.a6no1.cn/) · 微信 `AIPMAndy`。