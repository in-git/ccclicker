# Auto Clicker - Tauri + Vue3 + TypeScript + UnoCSS + SCSS

基于 Tauri + Vue3 + TypeScript + UnoCSS + SCSS 构建的桌面自动连点器应用示例。

## 技术栈

- **Tauri**: 跨平台桌面应用框架
- **Vue3**: 渐进式 JavaScript 框架
- **TypeScript**: JavaScript 的超集，提供类型安全
- **UnoCSS**: 即时原子原子化 CSS 引擎
- **SCSS**: CSS 预处理器
- **Vite**: 下一代前端构建工具

## 项目结构

```
autoClicker/
├── src/                    # 前端源代码
│   ├── App.vue            # 主应用组件
│   ├── main.ts            # 应用入口
│   └── assets/            # 静态资源
├── src-tauri/             # Tauri 后端代码
│   ├── src/
│   │   ├── lib.rs         # Rust 命令定义
│   │   └── main.rs        # Rust 入口
│   └── tauri.conf    # Tauri 配置
├── scripts/                # 工具脚本
│   └── generate-icons.ps1  # 图标生成脚本
├── docs/                   # 官网文档
├── uno.config.ts          # UnoCSS 配置
├── vite.config.ts         # Vite 配置
└── package.json           # 项目依赖
```

## 安装依赖

```bash
npm install
```

## 开发运行

### Windows 环境配置

由于 Tauri 需要 C++ 编译器，在 Windows 上需要先配置 Visual Studio 环境：

**方法 1：使用批处理文件（推荐）**

项目已创建 `run-dev.bat` 文件，直接双击运行即可：

```bash
.\run-dev.bat
```

**方法 2：使用 PowerShell 手动配置**

```powershell
# 在 VS Code 中打开终端后，运行以下命令
& "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat"
npm run tauri:dev
```

**方法 3：使用 Developer Command Prompt**

1. 按 `Win` 键，搜索 "Developer Command Prompt for VS 2022"
2. 打开该终端
3. 导航到项目目录
4. 运行：`npm run tauri:dev`

### 启动开发服务器

启动开发服务器（自动编译 Rust 和前端代码）：

```bash
npm run tauri:dev
```

注意：使用 `tauri:dev` 而不是 `tauri dev`，因为项目配置为使用 GNU 工具链。

## 构建打包

构建生产版本：

```bash
npm run tauri build
```

构建后的应用位于 `src-tauri/target/release/bundle/` 目录。

## 图标生成

### 快速开始

1. 将你的原始 logo 文件重命名为 `icon.png`
2. 将 `icon.png` 放到 `src-tauri/icons`` 目录下
3. 在项目根目录运行：

```bash
npm run generate-icons
```

### 生成 icon.ico 和 icon.icns

脚本会生成所有 PNG 格式的图标，但 `icon.ico` 和 `icon.icns` 需要使用专门的工具生成：

#### 生成 icon.ico（Windows）

**在线工具（推荐）：**
1. 访问 https://convertico.com/
2. 上传 `icon.png`
3. 下载生成的 `.ico` 文件
4. 重命名为 `icon.ico`
5. 放到 `src-tauri/icons` 目录下

#### 生成 icon.icns（macOS）

**在线工具：**
1. 访问 https://cloudconvert.com/png-to-icns
2. 上传 `icon.png`
3. 下载生成的 `.icns` 文件
4. 放到 `src-tauri/icons` 目录下

### 生成的图标列表

#### 核心应用图标
- `32x32.png` - Windows 任务栏、系统托盘
- `128x128.png` - 应用窗口、文件管理器
- `128x128@2x.png` - 高分辨率屏幕
- `icon.ico` - Windows 可执行文件
- `icon.icns` - macOS 应用图标

#### Windows Store 应用图标
- `Square30x30Logo.png`
- `Square44x44Logo.png`
- `Square71x71Logo.png`
- `Square89x89Logo.png`
- `Square107x107Logo.png`
- `Square142x142Logo.png`
- `Square150x150Logo.png`
- `Square284x284Logo.png`
- `Square310x310Logo.png`
- `StoreLogo.png`

### 注意事项

1. **原始图标要求：**
   - 建议使用正方形的高分辨率图片（至少 1024x1024）
   - PNG 格格式，支持透明背景
   - 设计简洁，在小尺寸下也能清晰识别

2. **测试图标：**
   - 生成后可以在不同尺寸下预览
   - 确保在小尺寸下仍然清晰可辨
   - 测试不同背景下的显示效果

3. **更新图标：**
   - 修改原始 `icon.png` 后重新运行脚本
   - 所有 PNG 图标会自动更新
   - `icon.ico` 和 `icon.icns` 需要手动重新生成

## 核心功能

- ✅ Vue3 组合式 API (setup script)
- ✅ TypeScript 类型安全
- ✅ UnoCSS 原子化样式
- ✅ SCSS 样式支持
- ✅ Tauri 原生 API 调用
- ✅ 固定窗口大小（500x700）
- ✅ 连点器基础布局（开始/停止/重置按钮）

## Tauri 命令

在 `src-tauri/src/lib.rs` 中定义的 Rust 命令：

```rust
#[tauri::command]
fn get_app_info() -> AppInfo
```

前端调用方式：

```typescript
const info = await invoke('get_app_info')
```

## 环境要求

- Node.js >= 18
- Rust >= 1.70
- 系统依赖（根据操作系统不同）

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)