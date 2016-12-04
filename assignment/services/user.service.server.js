/**
 * Created by Vinay on 10/30/2016.
 */

module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/user', register);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user', findUserByUsername);


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function localStrategy(username, password, done)
    {

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user)
                    {
                        return done(null, user);
                    }
                    else{
                        return done(null, false);
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }


            );
    }
    
    function login(req, res) {
        // var user = req.body;
        // var username = user.username;
        // var password = user.password;
        //
        // model
        //     .userModel
        //     .findUserByCredentials(username, password)
        //     .then(
        //         function (user) {
        //             if(user)
        //             {
        //                 res.send(user);
        //             }
        //             else{
        //                 res.send('0');
        //             }
        //
        //         },
        //         function (error) {
        //             res.sendStatus(400).send(error);
        //         }
        //
        //
        //     );
        var user = req.user;
        res.send(user);


    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);

                },
                function (err) {
                    done(err, null);
                }
            );

    }
    
    function register(req, res) {
        var user = req.body;
        delete user.confirmPassword;
        model
            .userModel
            .createUser(user)
            .then(
              function(newUser) {
                  //console.log(newUser);
                  req.login(newUser, function (err) {
                     if(err){
                         res.statusCode(400).send(err);
                     }
                     else{
                         res.json(newUser);
                     }

                  });
                  res.send(newUser);
              },
                function(error) {
                  res.sendStatus(400).send(error);
                }
            );
        //res.send(user);

    }


    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username)
        {
            findUserByCredentials(req, res);
        }
        else if(query.username)
        {
            findUserByUsername(res,req);
        }

    }


    function findUserByUsername(req, res)
    {
        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (users) {
                    if(users){
                        res.json(users[0]);
                    }
                    else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findUserByCredentials(req, res)
    {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user)
                    {
                        res.send(user);
                    }
                    else{
                        res.send('0');
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
                
                
            );

    }


    function findUserById(req, res)
    {
        var userId =  req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function(user) {
                    if(user){
                        res.send(user);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateUser(req, res)
    {
        var user =  req.body;
        var uid = req.params.uid;

        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            )

    }

    function deleteUser(req, res)
    {
        var uid = req.params.uid;

        model
            .userModel
            .removeUser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
                
            );
    }
}
