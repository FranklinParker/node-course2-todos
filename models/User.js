const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, ' text is required.'],
        minlength: [10, 'must be at least 5 chars'],
        maxlength:[80,'must no longer than 20 chars'],
        trim:true
    },
});

const User = mongoose.model('User', UserSchema);

module.exports.UserModel = User;

const saveUser= (email)=>{
    const user = new this.UserModel({email:email});
    return user.save();
}
module.exports.userDatabase = {
    saveUser
}