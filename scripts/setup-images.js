const fs = require('fs')
const path = require('path')

// 复制 example_photo 到 public 目录
const sourceDir = path.join(__dirname, '..', 'example_photo')
const destDir = path.join(__dirname, '..', 'public', 'example_photo')

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
      console.log(`Copied: ${entry.name}`)
    }
  }
}

if (fs.existsSync(sourceDir)) {
  console.log('Copying example_photo to public directory...')
  copyDir(sourceDir, destDir)
  console.log('✅ Images setup complete!')
} else {
  console.log('❌ example_photo directory not found. Please ensure it exists.')
}


