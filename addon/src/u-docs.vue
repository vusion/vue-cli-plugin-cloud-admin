<template>
    <div>
        <VueLoadingIndicator class="primary" v-if="loading" />
          <iframe v-show="!loading" @load="onLoad" ref="iframe" class="cloud-admin-iframe" :src="src" frameborder="0"></iframe>
    </div>
</template>
<script>
import iframeMixin from "./iframeMixin";
export default {
    props: {
        path: String,
    },
    mixins: [iframeMixin],
    watch: {
        path(path) {
            if (path) {
                this.redirectIframe(path);
            }
        },
    },
}
</script>
<style >
.cloud-admin-iframe {
  position: absolute;
  height: calc(100% - 44px - 24px * 2);
  width: calc(100% - 24px * 2);
}
</style>