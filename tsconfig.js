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
      // '@/data/*': ['./data/*'],
      '@/content-collections': ['./.content-collections/generated'],
    },
  },
  include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
}

const userDataDirEnv = process.env.USER_DATA_DIR
const dataDir = userDataDirEnv
  ? [userDataDirEnv.endsWith('/*') ? userDataDirEnv : `${userDataDirEnv}/*`]
  : ['./data/*']

baseConfig.compilerOptions.paths = {
  ...baseConfig.compilerOptions.paths,
  '@/data/*': dataDir,
}

fs.writeFileSync('tsconfig.json', JSON.stringify(baseConfig, null, 2))
