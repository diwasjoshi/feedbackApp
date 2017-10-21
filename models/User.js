const mongoose = require('mongoose');
var { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type:Number, default:0}
});

mongoose.model('user', userSchema);
