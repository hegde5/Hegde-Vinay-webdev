/**
 * Created by Vinay on 10/18/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService)
    {
        var vm = this;
        vm.login = login;

        function login(username, password)
        {
            var user = UserService.findUserByCredentials(username,password);
            if(user === null)
                vm.error = "No such user";
            else
                $location.url("user/" + user._id);
        }



    }

    function RegisterController()
    {
        var vm = this;
        vm.register = register;

        function register()
        {


        }


    }
    
    function ProfileController($routeParams, UserService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var user = UserService.findUserById(userId);

        if(user != null)
        {
            vm.user = user;
        }




    }
})();