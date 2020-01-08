<template>
  <div id="cloud-admin-app">
    <VueTabs :tab-id.sync="tabId" style="height: 100%;position: relative;">
      <VueTab id="docs" label="文档">
        <div class="tab-content">
          <UDocs :path="path"></UDocs>
        </div>
      </VueTab>
      <VueTab id="project" label="项目">
        <div class="tab-content">
          <UProject @docs="seeDoc($event)"></UProject>
        </div>
      </VueTab>
      <VueTab id="pages" label="页面">
        <div class="tab-content">
          <UPages></UPages>
        </div>
      </VueTab>
    </VueTabs>
  </div>
</template>

<script>
import UDocs from "./u-docs";
import UProject from "./u-project";
import UPages from "./u-pages";
export default {
  name: "app",
  components: {
    UDocs,
    UProject,
    UPages
  },

  data() {
    return {
      tabId: "project",
      path: ""
    };
  },

  methods: {
    seeDoc(path) {
      this.path = path;
      this.$nextTick(() => {
        this.tabId = "docs";
      });
    }
  }
};
</script>

<style>
#cloud-admin-app .tab-content {
  padding: 24px;
}
#cloud-admin-app .grid {
  display: grid;
  grid-gap: 12px;
}
#cloud-admin-app .grid + .grid {
  margin-top: 20px;
}
#cloud-admin-app .grid.col-2 {
  grid-template-columns: repeat(2, 1fr);
}
</style>
