import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ICONS_DIR = path.join(process.cwd(), 'src-tauri', 'icons');
const SOURCE_ICON = path.join(ICONS_DIR, 'icon.png');

const sizes = [
  { name: '32x32.png', size: 32 },
  { name: '128x128.png', size: 128 },
  { name: '128x128@2x.png', size: 256 },
];

const windowsStoreSizes = [
  { name: 'Square30x30Logo.png', size: 30 },
  { name: 'Square44x44Logo.png', size: 44 },
  { name: 'Square71x71Logo.png', size: 71 },
  { name: 'Square89x89Logo.png', size: 89 },
  { name: 'Square107x107Logo.png', size: 107 },
  { name: 'Square142x142Logo.png', size: 142 },
  { name: 'Square150x150Logo.png', size: 150 },
  { name: 'Square284x284Logo.png', size: 284 },
  { name: 'Square310x310Logo.png', size: 310 },
];

async function generateIcons() {
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error(`错误: 找不到源图标文件: ${SOURCE_ICON}`);
    console.log('请将你的原始 logo.png 文件放在 src-tauri/icons 目录下');
    process.exit(1);
  }

  console.log('开始生成图标...');
  console.log(`源文件: ${SOURCE_ICON}\n`);

  const allSizes = [...sizes, ...windowsStoreSizes];

  for (const { name, size } of allSizes) {
    const outputPath = path.join(ICONS_DIR, name);
    try {
      await sharp(SOURCE_ICON)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ 生成 ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ 生成 ${name} 失败:`, error.message);
    }
  }

  console.log('\n图标生成完成！');
  console.log('注意: icon.ico 和 icon.icns 需要使用专门的工具生成');
  console.log('- Windows .ico: 可以使用 https://convertico.com/ 或 ImageMagick');
  console.log('- macOS .icns: 可以使用 iconutil (macOS 自带) 或在线工具');
}

generateIcons().catch(console.error);