import chalk from 'chalk'

export function yellow(str: string) {
  console.log(chalk.cyan(str))
}

export function green(str: string) {
  console.log(chalk.green(str))
}

export function red(str: string) {
  console.error(chalk.red(str))
}

export function errorAndExit(e: Error) {
  red(e.message)
  process.exit(1)
}
