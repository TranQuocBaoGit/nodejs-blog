const authenRouter = require('./authen');
const siteRouter = require('./site');

function route(app) {
    app.use(authenRouter);
    app.use('/', siteRouter);
}
module.exports = route;
