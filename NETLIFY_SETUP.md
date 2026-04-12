# Decap CMS + Netlify 配置指南

## 第一步：在 Netlify 导入你的仓库

1. 登录 https://app.netlify.com
2. 点击 **Add new site** → **Import an existing project**
3. 选择 **GitHub**
4. 找到并选择 `DuanBoFei/personsite` 仓库
5. 配置构建设置：
   - **Branch to deploy**: `master`
   - **Base directory**: (留空)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. 点击 **Deploy site**

等待部署完成，Netlify 会给你一个类似 `https://xxxxxx.netlify.app` 的 URL。

## 第二步：启用 Identity 服务

1. 在 Netlify 站点控制台，点击 **Identity** 标签
2. 点击 **Enable Identity**
3. 点击 **Settings and usage**

### 注册偏好设置
- **Registration preferences**: 选择 **Invite only** (更安全，只有你邀请的用户可以注册)
- 或者选择 **Open** (任何人都可以注册)

### 启用 Git Gateway
1. 滚动到 **Services** 部分
2. 点击 **Enable Git Gateway**
3. 会弹出一个窗口要求授权 GitHub，点击授权

这一步会自动在你的 GitHub 账户创建一个 Personal Access Token。

## 第三步：添加外部身份验证（可选但推荐）

为了让用户可以用 GitHub 账号登录 CMS：

1. 在 Identity Settings 中，点击 **External providers**
2. 找到 **GitHub**，点击 **Enable**
3. 需要填写 GitHub 的 Client ID 和 Client Secret

### 获取 GitHub OAuth App 凭证

1. 访问 https://github.com/settings/developers
2. 点击 **New OAuth App**
3. 填写信息：
   - **Application name**: `Decap CMS for personsite`
   - **Homepage URL**: `https://你的netlify站点地址.netlify.app`
   - **Authorization callback URL**: `https://你的netlify站点地址.netlify.app/.netlify/identity/external?provider=github`
4. 点击 **Register application**
5. 复制 **Client ID** 和 **Client Secret**
6. 回到 Netlify，填入这两个值，点击 **Enable GitHub**

## 第四步：测试 CMS

1. 访问 `https://你的netlify站点地址.netlify.app/admin/`
2. 你应该能看到 Decap CMS 的登录界面
3. 点击 **Login with Netlify Identity** 或 **Login with GitHub**
4. 登录后应该能看到文章列表

## 第五步：更新代码中的 site_url（重要）

部署成功后，需要更新 `public/admin/config.yml` 中的 site_url 为 Netlify 地址。

## 故障排除

### 登录后显示 "Failed to load entry"
- 检查 Git Gateway 是否已启用
- 检查仓库是否有读写权限

### 无法保存文章
- 确保 Git Gateway 的 token 没有过期
- 在 Netlify Identity → Settings → Services 中重新 Enable Git Gateway

### 404 错误
- 确保 `public/admin/index.html` 和 `public/admin/config.yml` 已提交到仓库
- 检查是否部署了最新代码
