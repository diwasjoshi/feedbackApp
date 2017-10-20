const mongoose = require('mongoose');
var { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('user', userSchema);
