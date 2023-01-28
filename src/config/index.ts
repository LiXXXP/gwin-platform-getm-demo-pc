import { Config } from './interface'
import development from './config.development'
import test from './config.test'
import production from './config.production'

const configs: Record<string, Config> = {
  development: development,
  test: test,
  production: production
}
console.log('------------run mode: ' + import.meta.env.MODE)
export default configs[import.meta.env.MODE]
