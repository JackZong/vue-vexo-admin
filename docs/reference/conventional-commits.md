# 代码提交规范

规范的 Git 提交信息不仅能提升代码质量，还能让团队合作更高效。常见的 Git 提交规范有很多，下面是其中一种广泛使用的规范：Conventional Commits。

Conventional Commits 是一种约定式的提交信息规范，用于生成易读、结构化的提交历史记录，增强协作和自动化工具支持。以下是该规范的详细指南。

## 1. 提交信息格式

提交信息应符合以下结构：
```
<type>(<scope>): <message>
[optional body]

[optional footer]
```


### 1.1 **提交类型 (`type`)**
提交类型标明了当前提交的性质。常见的类型包括：

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（如：空格、缩进等，功能上没有变化）
- `refactor`: 代码重构（功能和 bug 无变化）
- `perf`: 性能优化
- `test`: 增加或修改测试代码
- `chore`: 杂项修改（如：构建工具、依赖更新等）
- `ci`: 持续集成相关修改
- `build`: 构建系统的修改

### 1.2 **提交范围 (`scope`)**
`scope` 是可选项，用于描述本次提交影响的模块或功能部分。示例：

```
feat(auth): add login functionality
fix(api): resolve error in user data fetch
```


### 1.3 **提交描述 (`message`)**
提交描述应简洁明了地说明该提交的作用，通常不超过 72 个字符。并且应避免使用模糊不清的描述，做到简洁直观。

### 1.4 **详细描述 (`body`)**
如果提交信息需要更详细的解释，或存在变更的背景，可以在提交信息的 `body` 部分进行补充。`body` 部分应尽量避免过于冗长，建议每行不超过 72 个字符。

### 1.5 **脚注 (`footer`)**
脚注通常用于记录 breaking change 或关联的 issue、任务、bug 等。例如：

```
BREAKING CHANGE: The login API now requires a JWT token.
Closes #123
```


## 2. 提交类型详解

### 2.1 `feat`
用于新增功能或特性：

```
feat(auth): add JWT authentication
```


### 2.2 `fix`
用于修复 bug：


```
fix(user): resolve issue with user profile update
```


### 2.3 `docs`
用于更新文档：

```
docs(readme): update installation instructions
```


### 2.4 `style`
用于修改代码格式（不影响功能）：

```
style(button): fix indentation for button component
```


### 2.5 `refactor`
用于代码重构，功能不变：

```
refactor(database): refactor DB query logic
```


### 2.6 `perf`
用于性能优化：

```
perf(search): optimize search query performance
```


### 2.7 `test`
用于增加或修改测试：

```
test(user): add unit tests for user service
```


### 2.8 `chore`
用于日常维护性任务：

```
chore(deps): update lodash to v4.17.21
```


### 2.9 `ci`
用于持续集成的配置修改：

```
ci(travis): add Node.js v16 to Travis CI
```


### 2.10 `build`
用于影响构建系统或外部工具的修改：

```
build(webpack): update webpack config for production build
```


## 3. BREAKING CHANGE（重大变更）

对于任何破坏向后兼容性的更改，都应在提交信息的 `footer` 部分标明 `BREAKING CHANGE`，格式如下：

```
BREAKING CHANGE: The login API now requires a JWT token.
```


如果涉及 `breaking change`，可以考虑将其加入 `body` 或 `footer` 中，以便在生成变更日志时能够自动捕捉。

## 4. 自动化工具支持

通过遵循 **Conventional Commits** 规范，你可以利用自动化工具进行以下任务：

- 自动生成 **CHANGELOG** 文件。
- 自动发布版本。
- 集成持续集成工具（CI）生成版本标签。

一些常见的工具包括：

- **Standard Version**: 自动化版本管理和 changelog 生成。
- **semantic-release**: 自动化版本发布和 changelog 生成。

## 5. 总结

遵循 **Conventional Commits** 规范有助于保持 Git 提交记录的清晰、易读，并能与自动化工具配合，提高团队的开发效率。建议团队内所有成员都遵循此规范进行提交，保证提交历史的一致性。
