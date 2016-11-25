/**
 * Created by Vinay on 11/25/2016.
 */

module.exports = function () {

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeHolder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    })

    return WidgetSchema;
};