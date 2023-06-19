const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errorMes = { email: '', password: '', username: '' };

    //duplicate email code
    if (err.code === 11000) {
        errorMes.email = 'This email has already been registered.';
        return errorMes;
    }
    //validation errors
    if (err.message.includes('User validation failed')) {
        //Object.values(err.errors) get value of the object errors inside err
        Object.values(err.errors).forEach((eachError) => {
            let errorPath = eachError.properties.path;
            errorMes[errorPath] = eachError.properties.message;
        });
    }

    return errorMes;
};

//create json web token to used as cookie
const maxAge = 3 * 24 * 60 * 60; //3 days (count in sec)
const createToken = (id) => {
    return jwt.sign({ id }, 'any secret message', {
        expiresIn: maxAge,
    });
};

class AuthenController {
    //[GET] for login and signup
    login_get(req, res) {
        res.render('login');
    }

    signup_get(req, res) {
        res.render('signup');
    }

    //[POST] for login and signup
    async login_post(req, res) {
        const { email, password, username, birthdate } = req.body;
        res.send('user login');
    }

    async signup_post(req, res) {
        const { email, password, username, birthdate } = req.body;
        try {
            const user = await User.create({
                email,
                password,
                username,
                birthdate,
            });
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ user: user._id });
        } catch (error) {
            const errorMes = handleErrors(error);
            res.status(400).json({ errorMes });
        }
    }
}

module.exports = new AuthenController();
