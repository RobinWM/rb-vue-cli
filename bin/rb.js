#! /usr/bin/env node
const { program } = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

// 配置create命令
program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    require('../lib/create.js')(name, options)
  })

program.on('--help', () => {
  // 使用 figlet 绘制 Logo
  console.log(
    '\r\n' +
      figlet.textSync('rb vue', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })
  )
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`rb <command> --help`)} for detailed usage of given command\r\n`)
})

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 解析用户执行命令传入参数
// eslint-disable-next-line no-undef
program.parse(process.argv)
