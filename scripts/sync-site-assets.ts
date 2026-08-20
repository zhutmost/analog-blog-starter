import fs from "node:fs"
import path from "node:path"

const CONTENT_DIRECTORIES = new Set(["_posts", "_authors", "_pages"])
const EXCLUDED_CONTENT_EXTENSIONS = new Set([".md", ".mdx"])

const projectRoot = process.cwd()
const siteDir = path.resolve(projectRoot, process.env.SITE_DIR ?? "sites/demo")
const relativeSiteDir = path.relative(projectRoot, siteDir)

const srcPublicDir = path.join(siteDir, "public")
const destPublicDir = path.join(projectRoot, "public")

const generatedAssetsDir = path.join(destPublicDir, "_assets")
const destAssetsDir = path.join(generatedAssetsDir, relativeSiteDir)

function cleanGeneratedAssets(): void {
  fs.rmSync(generatedAssetsDir, {
    recursive: true,
    force: true,
  })
}

function assertSiteDirectory(): void {
  const relativePath = path.relative(projectRoot, siteDir)

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`SITE_DIR must be inside the project root: ${siteDir}`)
  }

  if (!fs.existsSync(siteDir) || !fs.statSync(siteDir).isDirectory()) {
    throw new Error(`SITE_DIR is not a directory: ${siteDir}`)
  }
}

function copyDirectory(
  srcDir: string,
  destDir: string,
  filterFile: (filePath: string) => boolean = () => false
): void {
  if (!fs.existsSync(srcDir)) {
    return
  }
  fs.mkdirSync(destDir, { recursive: true })

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    // Do not follow symlinks. This prevents accidentally copying files outside the configured site directory.
    if (entry.isSymbolicLink()) {
      continue
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, filterFile)
      continue
    }

    if (entry.isFile() && !filterFile(srcPath)) {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function isContentAsset(filePath: string): boolean {
  return EXCLUDED_CONTENT_EXTENSIONS.has(path.extname(filePath).toLowerCase())
}

function syncSiteAssets(): void {
  assertSiteDirectory()

  cleanGeneratedAssets()

  // Site-level public files are copied into the root public directory.
  // Existing unrelated root public files are preserved.
  copyDirectory(srcPublicDir, destPublicDir)

  for (const directory of CONTENT_DIRECTORIES) {
    copyDirectory(
      path.join(siteDir, directory),
      path.join(destAssetsDir, directory),
      isContentAsset
    )
  }
}

syncSiteAssets()

// oxlint-disable-next-line no-console
console.log(`Synchronized site assets from ${siteDir} to ${destPublicDir}`)
