/**
 * Created by Vinay on 11/16/2016.
 */
module.exports = function () {
    var mongoose =  require('mongoose');
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dateCreated: Date
    }, {collection:"user"});
    return UserSchema;
}