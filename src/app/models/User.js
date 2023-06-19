const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email.'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        minlength: [8, 'Minimum password length is 8 characters.'],
    },
    username: {
        type: String,
        required: [true, 'Please enter your name.'],
        maxlength: 255,
    },
    birthdate: {
        type: String,
    },
});

//fire a function AFTER the object is created and save to database
//post here is post save, not HTTP method post
User.post('save', function (obj, next) {
    console.log('New user was created: ', obj);

    //to enter next middleware NECCESSARY AT THE END IN ANY KIND OF HOOKS (MOOGOSE FOR EXAMPLE)
    next();
});

//fire a function BEFORE the object is created and save to database
User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const user = mongoose.model('User', User);
module.exports = user;
