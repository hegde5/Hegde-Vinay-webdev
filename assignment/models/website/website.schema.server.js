/**
 * Created by Vinay on 11/18/2016.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        name: String,
        description: String,
        //pages: [{type: mongoose.Schema.Types.ObjectId, ref:"PageModel"}],
        dateCreated: Date
    });
    return WebsiteSchema;
};