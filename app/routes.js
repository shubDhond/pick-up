/**
 * Created by sdhond on 2015-07-25.
 */
var mongoose = require('mongoose');
var userSchema = require('./models/user.js');
var pickUpSchema = require('./models/pickUp.js');
var User = mongoose.model('User');
var PickUp = mongoose.model('PickUp');
var bodyParser = require('body-parser');

module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index.html');
    });

    app.get('/App', isLoggedIn, function (req, res) {
        res.render('pickUpApp.html', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/pickUps', isLoggedIn, function(req, res){
        mongoose.model('PickUp').find(function(err,pickUps){
            mongoose.model('PickUp').populate(pickUps,{path: 'host'}, function(err, docs){
                res.json(docs);
            });
        });
    });

    app.post('/pickUps',isLoggedIn, function(req, res){
       var pickUp = req.body;
        console.log(pickUp);
       PickUp.create(pickUp, function(err,pUp){
            if(err!=null){
                console.log('pick up saved');
            }
       });
    });

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/App',
            failureRedirect: '/'
        }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}