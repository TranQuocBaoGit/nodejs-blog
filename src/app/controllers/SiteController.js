class SiteController{

    // [GET] Job
    index(req, res){
        res.render('home')
    }
    
}

module.exports = new SiteController;