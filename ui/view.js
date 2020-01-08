const path = require('path');
const fs = require('fs');
module.exports = function (api) {
    const root = api.getCwd();
    const getPages = function() {
        const pages = require(api.resolve('pages.json'));
        return pages;
    };
    const getUI = function () {
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
            id: 'org.vusion.cloud-admin.client-addon',
            url: 'http://localhost:8042/index.js',
        });
    } else {
        api.addClientAddon({
            id: 'org.vusion.cloud-admin.client-addon',
            path: require('path').join(__dirname, '../addon/dist'),
        });
    }
    api.addView({
        id: 'org.vusion.cloud-admin.views.index',
        name: 'org.vusion.cloud-admin.routes.index',
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
    api.onAction('org.vusion.cloud-admin.open', (params) => {
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
        if (view.id === 'org.vusion.cloud-admin.views.index') {
            api.setSharedData('org.vusion.cloud-admin.pages', getPages());
            api.setSharedData('org.vusion.cloud-admin.uiIsNew', getUI());
            api.setSharedData('org.vusion.cloud-admin.root', root);
        }
    });
};