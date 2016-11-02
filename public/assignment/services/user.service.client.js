/**
 * Created by Vinay on 10/18/2016.
 */
(function (){

    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http)
    {
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
            var url = "/api/user/" + userId;
            $http.put(url, user);
        }

        function deleteUser(userId)
        {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }



    }

})();
