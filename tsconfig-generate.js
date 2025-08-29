import fs from 'node:fs'

const tsConfig = {
  compilerOptions: {
    baseUrl: './',
    composite: true,
    target: 'ESNext',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'ESNext',
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    incremental: true,
    plugins: [
      {
        name: 'next',
      },
    ],
    paths: {
      '@/*': ['./src/*'],
      '@/coco-generated': ['./.content-collections/generated'],
    },
  },
  include: [
    'next-env.d.ts',
    'src/**/*.ts',
    'src/**/*.tsx',
    '.next/types/**/*.ts',
    'content-collections.ts',
    '*.config.mjs',
  ],
  exclude: ['node_modules'],
}

const userDataDir = process.env.USER_DATA_DIR ?? 'data/demo'

tsConfig.compilerOptions.paths = {
  ...tsConfig.compilerOptions.paths,
  '@/data/*': [`./${userDataDir}/*`],
}

tsConfig.include.push(`${userDataDir}/**/*.ts`, `${userDataDir}/**/*.tsx`)

fs.writeFileSync(
  'tsconfig.json',
  JSON.stringify(
    tsConfig,
    (_key, value) => {
      return value === undefined ? undefined : value
    },
    2
  )
)

console.log('Generate tsconfig.json with:', { DATA_DIR: userDataDir })
