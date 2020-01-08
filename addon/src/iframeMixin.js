export default {
    data() {
        const host = 'https://vusion-templates.github.io';
        return {
            loading: true,
            src: this.getIframeSrc(host),
            host,
            connected: false,
            defaultPath: ''
        };
    },
    created() {
        this.messageHandler = (event) => {
            if (
                event.source === this.$refs.iframe.contentWindow
                && event.data === 'loaded'
            ) {
                this.connected = true;
            }
        };
        window.addEventListener('message', this.messageHandler);
    },
    destroyed() {
        window.removeEventListener('message', this.messageHandler);
    },
    methods: {
        redirectIframe(path) {
            const iw = this.$refs.iframe.contentWindow;

            if (!this.connected) {
                this.loadIframeFromSrc(path);
                return;
            }
            try {
                iw.postMessage({
                    type: 'route',
                    value: this.getPath(path),
                }, this.host);
            } catch (error) {
                this.loadIframeFromSrc(path);
            }
        },
        loadIframeFromSrc(path) {
            const src = this.getIframeSrc(this.host, path);
            this.connected = false;
            this.loading = true;
            this.src = src;
        },
        onLoad() {
            this.loading = false;
        },
        getPath(path) {
            return path || '/guide/essentials/suggest.html';
        },
        getIframeSrc(host, path) {
            return `${host}/cloud-admin-site` + this.getPath(path);
        },
    },
};