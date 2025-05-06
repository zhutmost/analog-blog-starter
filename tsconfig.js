const fs = require('fs')

const baseConfig = {
  extends: '@tsconfig/next/tsconfig.json',
  compilerOptions: {
    baseUrl: './',
    target: 'es6',
    forceConsistentCasingInFileNames: true,
    composite: true,
    paths: {
      '@/*': ['./src/*'],
      '@/content-collections': ['./.content-collections/generated'],
      '@/data/*': ['./data/*'],
    },
  },
}

const userDataDir = [process.env.USER_DATA_DIR ? `${process.env.USER_DATA_DIR}/*` : './data-demo/*']

baseConfig.compilerOptions.paths = {
  ...baseConfig.compilerOptions.paths,
  '@/data/*': userDataDir,
}

fs.writeFileSync(
  'tsconfig.json',
  JSON.stringify(
    baseConfig,
    (key, value) => {
      return value === undefined ? undefined : value
    },
    2
  )
)

console.log('tsconfig.json generated with:', { DATA_DIR: userDataDir })
