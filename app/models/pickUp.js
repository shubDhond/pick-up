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
    date: Date,
    time: String,
    going: Number
});

mongoose.model('PickUp', pickUpSchema);