const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    dob: String,
    country: String,
    img: {
        data: Buffer,
        content: String,
    }
});

module.exports = mongoose.model('User', userSchema);