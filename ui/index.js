const describeTask = require('./describeTask');
const view = require('./view');
module.exports = api => {
    describeTask(api);
    view(api); 
}