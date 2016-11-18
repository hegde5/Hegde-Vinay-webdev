/**
 * Created by Vinay on 10/30/2016.
 */

module.exports = function (app, model) {

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user', findUserByUsername);

    function createUser(req, res) {
        var user = req.body;
        delete user.confirmPassword;
        model
            .userModel
            .createUser(user)
            .then(
              function(newUser) {
                  //console.log(newUser);
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
