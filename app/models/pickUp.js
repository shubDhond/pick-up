/**
 * Created by sdhond on 2015-07-25.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pickUpSchema = new Schema({
    host:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    sport: String,
    location: String,
    date: String,
    time: String,
    going: Number
});

module.exports = mongoose.model('PickUp', pickUpSchema);