<template>
  <div>
    <h4>必须设置</h4>
    <div class="grid col-2">
      <VueFormField title="全局拦截处理错误请求">
        <span>
          <VueButton class="primary" @click="openService()">打开相关文件</VueButton> 修改后，可忽略此选项
        </span>
      </VueFormField>
      <VueFormField title="全局组件">
        <span>
          <VueButton class="primary" @click="openComponents()">打开相关文件</VueButton> 修改后，可忽略此选项
        </span>
      </VueFormField>
    </div>
    <h4>推荐使用</h4>
    <div class="grid col-2">
      <VueFormField subtitle="可以方便快捷的完成列表需求" title="列表 mixin">
        <span>
          <VueButton class="primary" @click="openPageMixin()">查看相关实现</VueButton>
        </span>
      </VueFormField>
      <VueFormField subtitle="可以方便的新增一个模块、组件、页面" title="script:add">
        <span>
          <VueButton class="primary" @click="seeDoc()">查看相关文档</VueButton>
        </span>
      </VueFormField>
    </div>
    <h4>项目检查</h4>
    <div class="grid col-2">
      <VueFormField title="UI 版本">
        <template v-if="!uiIsNew">
          <span>
            <VueButton class="danger" icon-left="info" @click="updateUI()">更新</VueButton>UI 版本未和 package.json 保持一致，请更新
          </span>
        </template>
        <template v-else>
          <span>UI 版本和 package.json 一致，无需更新</span>
        </template>
      </VueFormField>
      <VueFormField title="Vue 版本">
        <span>
          更新 Vue 版本后，需要运行 `npm run dll`
          <VueButton class="primary" @click="updateDLL()">点此运行</VueButton>
        </span>
      </VueFormField>
    </div>
  </div>
</template>
<script>
export default {
  sharedData() {
    return {
      ...mapSharedData("org.vusion.cloud-admin.", {
        pages: "pages",
        uiIsNew: "uiIsNew",
        root: "root"
      })
    };
  },
  methods: {
    updateUI(force) {
      this.$router.push(
        `/tasks/${encodeURIComponent(this.root)}:update:ui${
          force ? ":force" : ""
        }`
      );
    },
    updateDLL() {
      this.$router.push(`/tasks/${encodeURIComponent(this.root)}:dll`);
    },
    open(module) {
      this.$callPluginAction("org.vusion.cloud-admin.open", {
        module
      });
    },
    openPageMixin() {
      this.open("pageMixin");
    },
    openService() {
      this.open("service");
    },
    openComponents() {
      this.open("components");
    },
    seeDoc() {
      this.$emit("docs", "/guide/advanced/template.html");
    }
  }
};
</script>
<style >
</style>