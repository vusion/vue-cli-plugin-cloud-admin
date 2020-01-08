module.exports = function (api) {
    api.describeTask({
        // 用于匹配脚本命令的 RegExp 对象，来选择要被描述的任务
        match: /shx rm -rf ui/,
        description: '强制打包 UI',
    });
    api.describeTask({
        match: /^plop$/,
        description: '新增一个页面、模块、组件',
    });
    api.describeTask({
        match: /webpack.dll.config.js/,
        description: '用于加速构建',
    });
    api.describeTask({
        match: /lint/,
        description: '代码格式化',
    });
    api.describeTask({
        match: /test:unit -- --watch/,
        description: '以 watch 模式运行 Jest 单元测试',
    });  
};