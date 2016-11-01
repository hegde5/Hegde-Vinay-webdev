/**
 * Created by Vinay on 10/18/2016.
 */
(function (){

    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http)
    {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;


        function createUser(user)
        {
            var userObj = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/user", userObj);
        }

        function findUserById(userId)
        {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }

        function findUserByUsername(username)
        {
            var user = null;
            for(var i in users)
            {
                user = users[i];
                if(username === user.username)
                {
                    return user;
                }
            }
            return null;

        }

        function findUserByCredentials(username, password)
        {
            var url = '/api/user?username='+username+'&password='+password;
            return  $http.get(url);

        }

        function updateUser(userId, user)
        {
            var eachUser = null;
            for(var i in users)
            {
                eachUser = users[i];
                if(userId === eachUser._id)
                {
                    users[i] = user;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId)
        {
            var eachUser = null;
            for(var i in users)
            {
                eachUser = users[i];
                if(userId === eachUser._id)
                {
                    users.splice(i,1);
                }
            }
        }



    }

})();
