const path = require('path');
const fs = require('fs');
const prefix = require('../config').prefix;
module.exports = function (api) {
    const getPages = function() {
        const pages = require(api.resolve('pages.json'));
        return pages;
    };
    const getUI = function (root) {
        const uiRoot = path.join(root, 'ui');
        let uiIsNew = true;
        if (fs.existsSync(uiRoot) && fs.existsSync(api.resolve('ui/.version'))) {
            let uiLibs = fs.readFileSync(api.resolve('ui/.version')).toString();
            uiLibs = uiLibs.split('\n').map((item) => item.split('@'));
            try {
                uiLibs.forEach((uiLib) => {
                    const [name, version] = uiLib;
                    if (name && version) {
                        if (require(api.resolve(`node_modules/${name}/package.json`)).version !== version) {
                            uiIsNew = false;
                        }
                    }
                });
            } catch (error) {
                uiIsNew = false;
            }
        }
        return uiIsNew;
    };
    if (process.env.VUE_APP_CLI_UI_DEBUG) {
        api.addClientAddon({
            id: `${prefix}.client-addon`,
            url: 'http://localhost:8042/index.js',
        });
    } else {
        api.addClientAddon({
            id: `${prefix}.client-addon`,
            path: require('path').join(__dirname, '../addon/dist'),
        });
    }
    api.addView({
        id: `${prefix}.views.index`,
        name: `${prefix}.routes.index`,
        icon: '/_plugin/vue-cli-plugin-cloud-admin/logo.png',
        tooltip: 'Cloud Admin 工作台'
    });
    const map = {
        service: api.resolve('src/global/utils/services/index.js'),
        pageMixin: api.resolve('src/global/mixins/page/page.js'),
        components: api.resolve('src/global/components/index.js'),
        side: (page) => api.resolve(`src/views/${page}/modules.order.js`),
        router: (page) => api.resolve(`src/views/${page}/routes.js`),
        nav: (page) => api.resolve(`src/views/${page}/layout/views/index.vue/index.js`),
    };
    api.onAction(`${prefix}.open`, (params) => {
        let moduleKey = map[params.module];
        if (typeof moduleKey === 'function') {
            moduleKey = moduleKey(params.page);
        }
        const { launch } = require('@vue/cli-shared-utils');
        if (moduleKey) {
            launch(moduleKey);
        } else if (params.path) {
            launch(api.resolve(params.path));
        }
    });
    api.onViewOpen(({ view, cwd }) => {
        if (view.id === `${prefix}.views.index`) {
            api.setSharedData(`${prefix}.pages`, getPages());
            api.setSharedData(`${prefix}.uiIsNew`, getUI(cwd));
            api.setSharedData(`${prefix}.root`, cwd);
        }
    });
};