const { clientAddonConfig } = require('@vue/cli-ui')

module.exports = {
  ...clientAddonConfig({
    id: 'org.vusion.cloud-admin.client-addon',
    // 开发环境端口 (默认值 8042)
    port: 8042
  })
}