# 图标生成指南

## 快速开始

### 方法一：使用 PowerShell 脚本（推荐，Windows）

1. 将你的原始 logo 文件重命名为 `icon.png`
2. 将 `icon.png` 放到 `src-tauri/icons` 目录下
3. 在项目根目录运行：
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1
   ```

### 方法二：使用 Node.js 脚本

1. 安装依赖：
   ```bash
   npm install sharp --save-dev
   ```

2. 将你的原始 logo 文件重命名为 `icon.png`
3. 将 `icon.png` 放到 `src-tauri/icons` 目录下
4. 运行脚本：
   ```bash
   node scripts/generate-icons.js
   ```

## 生成 icon.ico 和 icon.icns

脚本会生成所有 PNG 格式的图标，但 `icon.ico` 和 `icon.icns` 需要使用专门的工具生成：

### 生成 icon.ico（Windows）

**在线工具（推荐）：**
1. 访问 https://convertico.com/
2. 上传 `icon.png`
3. 下载生成的 `.ico` 文件
4. 重命名为 `icon.ico`
5. 放到 `src-tauri/icons` 目录下

**本地工具：**
- ImageMagick: `magick convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico`

### 生成 icon.icns（macOS）

**在线工具：**
1. 访问 https://cloudconvert.com/png-to-icns
2. 上传 `icon.png`
3. 下载生成的 `.icns` 文件
4. 放到 `src-tauri/icons` 目录下

**macOS 本地工具：**
```bash
# 创建 iconset 文件夹
mkdir icon.iconset

# 生成不同尺寸的图标
sips -z 16 16     icon.png --out icon
.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256
256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png

# 生成 icns 文件
iconutil -c icns icon.iconset

# 清理
rm -rf icon.iconset
```

## 生成的图标列表

### 核心应用图标
- `32x32.png` - Windows 任务栏、系统托盘
- `128x128.png` - 应用窗口、文件管理器
- `128x128@2x.png` - 高分辨率屏幕
- `icon.ico` - Windows 可执行文件
- `icon.icns` - macOS 应用图标

### Windows Store 应用图标
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

## 注意事项

1. **原始图标要求：**
   - 建议使用正方形的高分辨率图片（至少 1024x1024）
   - PNG 格式，支持透明背景
   - 设计简洁，在小尺寸下也能清晰识别

2. **测试图标：**
   - 生成后可以在不同尺寸下预览
   - 确保在小尺寸下仍然清晰可辨
   - 测试不同背景下的显示效果

3. **更新图标：**
   - 修改原始 `icon.png` 后重新运行脚本
   - 所有 PNG 图标会自动更新
   - `icon.ico` 和 `icon.icns` 需要手动重新生成