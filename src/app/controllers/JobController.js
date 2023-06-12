class JobController{

    // [GET] Job
    index(req, res){
        res.render('job')
    }
}

module.exports = new JobController;