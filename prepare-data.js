const fs = require('fs')
const path = require('path')

const TARGET_DATA_DIR = './data'
const DEFAULT_DATA_DIR = './example-data'

const projectRoot = __filename

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
    // create absolute path for the source directory
    const sourcePath = path.resolve(
      dataDir.startsWith('.') ? path.join(projectRoot, dataDir) : dataDir
    )

    // check if the source directory exists
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
