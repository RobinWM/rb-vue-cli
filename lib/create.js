const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')

module.exports = async function (name, options) {
  // 执行创建命令

  // 1.获取当前目录
  const cwd = process.cwd()
  // 2.拼接创建项目的地址
  const targetDir = path.join(cwd, name)
  // 3.判断以上目录是否存在
  if (fs.existsSync(targetDir)) {
    // 强制创建
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return
      } else {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetDir)
      }
    }
  }
  // 4.创建项目
  const generator = new Generator(name, targetDir)
  generator.create()
}
