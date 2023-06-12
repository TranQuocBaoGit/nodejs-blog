const jobRouter = require('./job');
const siteRouter = require('./site');

function route(app) {
    app.use('/job', jobRouter);
    app.use('/', siteRouter);
}
module.exports = route;
