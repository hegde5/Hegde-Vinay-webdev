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
            register : register,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function login(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post("/api/login", user);

        }

        function register(user)
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
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password)
        {
            var url = '/api/user?username='+username+'&password='+password;
            return  $http.get(url);

        }

        function updateUser(userId, user)
        {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId)
        {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }



    }

})();
