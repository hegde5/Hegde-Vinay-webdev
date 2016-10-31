/**
 * Created by Vinay on 10/30/2016.
 */

module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get('/api/user', createUser1);
    app.get('/api/user/:uid', findUserById);

    function createUser1(req, res) {
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
        //res.send(users);
    }

    function findUserByUsername(req, res)
    {
        var username = req.query.username;
        var user = null;
        for(var i in users)
        {
            user = users[i];
            if(username === user.username)
            {
                res.send(user);
                return;
            }
        }
        res.send('0');
    }


    function findUserByCredentials(req, res)
    {
        var username = req.query.username;
        var password = req.query.password;
        var user = null;
        for(var i in users)
        {
            user = users[i];
            if(user.username === username && user.password === password)
            {
                res.send(user);
                return;

            }
        }
        res.send('0');
    }


    function findUserById(req, res)
    {
        var userId =  req.params.uid;
        var user = null;
        for(var i in users)
        {
            user = users[i];
            if(userId === user._id)
            {
                res.send(user);
                return;
            }
        }
        res.send('0');
    }


    function createUser(user)
    {
        res.send(users);
        var eachUser = null;
        for(var i in users)
        {
            eachUser = users[i];
            if(eachUser.username === user.username)
            {
                //User already exists.
                return false;
            }
        }
        user._id = (new Date().getTime()).toString();
        delete user.confirmPassword;
        users.push(user);
        return true;
    }


}