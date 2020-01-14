<template>
  <div>
    <div style="text-align:center;">
      <h4>请选择页面</h4>
      <VueFormField title>
        <span>
          <VueSelect v-model="page" style="width: 500px">
            <VueSelectButton v-for="item in pageList" :value="item" :key="item" :label="item" />
          </VueSelect>
          <VueButton class="primary" @click="openFile('pages.json')">查看配置文件</VueButton>
        </span>
      </VueFormField>
    </div>
    <template v-if="pages && page">
      <h4>{{ pages[page].title }}-详细信息</h4>
      <div class="grid col-2">
        <VueFormField title="入口文件">
          <span>
            <VueButton class="primary" @click="openFile(pages[page].entry)">查看</VueButton>
          </span>
        </VueFormField>
        <VueFormField title="html 模板">
          <span>
            <VueButton class="primary" @click="openFile(pages[page].template)">查看</VueButton>
          </span>
        </VueFormField>
        <VueFormField title="favicon">
          <span>
            <VueButton class="primary" @click="openFile(pages[page].favicon)">查看</VueButton>
          </span>
        </VueFormField>
        <VueFormField title="webpack dev server">
          <span>
            <VueButton class="primary" @click="openFile('webpack.dev-server.js')">查看</VueButton>
          </span>
        </VueFormField>
      </div>
      <div class="grid col-2">
        <VueFormField title="头部导航">
          <span>
            <VueButton class="primary" @click="openNav()">打开相关文件</VueButton>
          </span>
        </VueFormField>
        <VueFormField title="侧边栏导航顺序">
          <span>
            <VueButton class="primary" @click="openSideNav()">打开相关文件</VueButton>
          </span>
        </VueFormField>
        <VueFormField title="路由">
          <span>
            <VueButton class="primary" @click="openRouter()">打开相关文件</VueButton>
          </span>
        </VueFormField>
      </div>
    </template>
  </div>
</template>
<script>
import config from '../../config.json';
export default {
  sharedData() {
    return {
      ...mapSharedData(`${config.prefix}.`, {
        pages: "pages",
        uiIsNew: "uiIsNew",
        root: "root"
      })
    };
  },
  data() {
    return {
      page: ""
    };
  },
  computed: {
    pageList() {
      return this.pages ? Object.keys(this.pages) : [];
    }
  },
  watch: {
    pageList(pageList) {
      this.page = pageList[0];
    }
  },
  methods: {
    open(module) {
      this.$callPluginAction(`${config.prefix}.open`, {
        module,
        page: this.page
      });
    },
    openNav() {
      this.open("nav");
    },
    openSideNav() {
      this.open("side");
    },
    openFile(path) {
      this.$callPluginAction(`${config.prefix}.open`, {
        path,
        page: this.page
      });
    },
    openRouter() {
      this.open("router");
    }
  }
};
</script>