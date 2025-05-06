import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const TARGET_DATA_DIR = './data'
const DEFAULT_DATA_DIR = './example-data'

const __filename = fileURLToPath(import.meta.url)
const projectRoot = path.dirname(__filename)

function createSafeSymlink() {
  const dataDir = process.env.USER_DATA_DIR ?? DEFAULT_DATA_DIR

  try {
    if (fs.existsSync(TARGET_DATA_DIR) || fs.lstatSync(TARGET_DATA_DIR).isSymbolicLink()) {
      fs.unlinkSync(TARGET_DATA_DIR)
    }
  } catch (err) {
    /* empty */
  }

  try {
    // 创建规范化绝对路径
    const sourcePath = path.resolve(
      dataDir.startsWith('.') ? path.join(projectRoot, dataDir) : dataDir
    )

    // 验证源路径存在
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Data directory ${sourcePath} does not exist`)
    }

    fs.symlinkSync(
      sourcePath,
      path.resolve(projectRoot, TARGET_DATA_DIR),
      'junction' // Windows compatibility
    )

    console.log(`Created symlink: ${TARGET_DATA_DIR} → ${sourcePath}`)
  } catch (err) {
    console.error('Symlink creation failed:', err.message)
    process.exit(1)
  }
}

createSafeSymlink()
