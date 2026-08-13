# RiskAtlas China Measures API Kit

[简体中文](#简体中文) · [English](#english)

## 简体中文

### 项目背景

全球制裁与出口管制持续影响跨境贸易、投资和供应链合规，但中国发布的反制措施、出口管制和不可靠实体等信息长期缺少统一、可检索、便于程序调用的公开接口。本项目由 RiskAtlas 全球制裁与出口管制数据平台发起，提供一个与平台 API v1 保持一致的开源调用入口，帮助研究者和开发者快速接入中国措施数据；如需多法域覆盖、实体模糊匹配、历史状态、行业标签、持续监控和机构级 API 服务，请访问 [RiskAtlas 平台](https://atlas.scholarforce.ai/)。

面向研究者、开发者与合规团队的中国措施 API 开源调用包。数据以中国政府官方公开文件为事实依据，但完整数据不随本仓库发布，仅通过 RiskAtlas 受控 API 提供。

本仓库只发布接口规范、参考代理、校验工具和文档，不包含完整中国措施数据、RiskAtlas 的其他法域数据、生产数据库、客户数据、访问密钥或内部运行配置。

### 快速开始

```bash
npm run validate
RISKATLAS_API_URL='https://atlas.scholarforce.ai' npm run serve
curl 'http://127.0.0.1:8787/api/v1/china-measures?locale=zh'
```

接口与 RiskAtlas `v1` 中国措施端点保持兼容，并支持 `locale=zh|en`。生产调用须使用申请的 API Key；参考代理默认限流每个来源地址每分钟 60 次，可通过环境变量调整。

### 数据边界

- 官方中文文件是事实与法律文本的权威版本；完整正文和主体记录不在 GitHub 仓库中。
- 英文文本为结构化翻译；每个事件均带 `translations.en.isComplete`。该字段为 `false` 时，不应把英文内容视作完整替代官方中文原文。
- `in_force`、`suspended`、`stopped` 表示公告账本中的措施状态，不替代个案法律适用判断。
- 后续公告未再次出现某对象，不自动视为撤销或停止。
- 数据以官方公告事件为统计粒度；同一主体可能出现在多个公告中。

### 商业服务衔接

本仓库的路径、字段命名和错误语义与 RiskAtlas API v1 保持一致。多法域实体检索、监控、批量筛查、历史变更、行业分析和受控 API 集成属于独立服务，详情见 [RiskAtlas](https://atlas.scholarforce.ai/)。

### 机构与服务

- 平台：[RiskAtlas 全球制裁与出口管制数据平台](https://atlas.scholarforce.ai/)
- 支持机构：[中央财经大学国家财经战略研究院](https://nafes.cufe.edu.cn/)
- API 申请、机构合作与学术使用说明：请通过平台页面联系。

### 许可与署名

- 代码与接口示例：采用 [MIT License](LICENSE)。受控 API 返回的数据按实际授权条款使用，不能因本仓库开源而推定完整数据可再分发。
- 原始官方文件可能具有其自身的使用条款；请同时遵守发布机关网站的适用规则。

## English

### Project background

Sanctions and export controls increasingly affect cross-border trade, investment and supply-chain compliance, while China-issued countermeasures and trade-control information has lacked a consistent, searchable and developer-friendly interface. This project is initiated by the RiskAtlas global sanctions and export-control data platform as an open integration entry point compatible with RiskAtlas API v1. For multi-jurisdiction coverage, entity matching, historical status, industry labels, monitoring and institutional API access, visit the [RiskAtlas platform](https://atlas.scholarforce.ai/).

An open API kit for China-issued measures. The complete dataset is not committed to GitHub; authorized clients retrieve it from the controlled RiskAtlas API.

The repository contains interface code, validation tools and documentation only. It does not include the complete dataset, production databases, customer data, credentials or internal runtime configuration.

### Quick start

```bash
npm run validate
RISKATLAS_API_URL='https://atlas.scholarforce.ai' npm run serve
curl 'http://127.0.0.1:8787/api/v1/china-measures?locale=en'
```

Chinese official text remains authoritative. English fields are structured translations and must be read with the event-level `isComplete` indicator. The dataset does not provide legal advice.

Platform: [RiskAtlas](https://atlas.scholarforce.ai/). Supporting institution: [National Academy of Financial and Economic Strategy, Central University of Finance and Economics](https://nafes.cufe.edu.cn/).

## Repository layout

```text
data/                         Intentionally empty; release data is not committed
docs/API.md                     API contract and examples
docs/DATA_DICTIONARY.md         Field definitions and language policy
docs/UPDATE_POLICY.md           Update and correction policy
docs/OPEN_SOURCE_BOUNDARY.md    What is and is not published
docs/schema.json                JSON Schema
scripts/                        Validator, release builder, reference server
```
