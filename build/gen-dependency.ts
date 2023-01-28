import path from 'path'
import fs from 'fs'
import { errorAndExit, yellow, green } from './utils'

const projRoot = path.resolve(__dirname, '../')

;(async () => {
  // 生成依赖
  yellow('Start gen name and dependencies')
  await genDeps()
  green('gen name and dependencies successfully')
})().catch((e: Error) => errorAndExit(e))

async function genDeps() {
  const NODE_ENV = process.env.NODE_ENV
  yellow('current NODE_ENV=' + NODE_ENV)
  const pkgPath = path.resolve(projRoot, './package.json')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkgJson = require(pkgPath)
  const { testDependencies, proDependencies } = pkgJson

  if (testDependencies === undefined) {
    throw new Error('testDependencies is undefined in package.json')
  }

  if (proDependencies === undefined) {
    throw new Error('proDependencies is undefined in package.json')
  }

  if (NODE_ENV === 'test') {
    pkgJson.dependencies = testDependencies
  } else {
    pkgJson.dependencies = proDependencies
  }
  try {
    await fs.promises.writeFile(pkgPath, JSON.stringify(pkgJson, null, 2), {
      encoding: 'utf-8'
    })
  } catch (e: any) {
    errorAndExit(e)
  }
}
