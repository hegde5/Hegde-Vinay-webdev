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
            if(username === undefined || password === undefined)
            {
                vm.error = "Please enter Username and Password";
                return;
            }
            var promise = UserService.findUserByCredentials(username,password);
            promise
                .success(function(user){
                    if(user === '0')
                        vm.error = "No such user or the username,password does not match";
                    else
                        $location.url("user/" + user._id);
                })
                .error(function (error) {
                    console.log(error);
                });
        }



    }

    function RegisterController($location, UserService)
    {
        var vm = this;
        vm.register = register;

        function register(user)
        {
            if(user === undefined)
            {
                vm.error = "Please fill out all the fields!";
            }
            else if(user.username === undefined || user.username === null)
                vm.error = "Please enter a username";
            else if(user.password === undefined || user.password === null)
                vm.error = "Please enter a password";

            else if(user.password != user.confirmPassword)
            {
                vm.error = "Passwords do not match!";
            }
            else
            {
                if(UserService.createUser(user))
                {
                    var updatedUser = UserService.findUserByUsername(user.username);
                    var userId = updatedUser._id;
                    $location.url('/user/'+userId);
                }
                else
                {
                    vm.error = "Please choose a different username, this username already exists!"
                }

            }
        }


    }
    
    function ProfileController($routeParams, UserService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var promise = UserService.findUserById(userId);
        promise
            .success(function (user) {
                vm.userId = userId;
                vm.updateProfile = updateProfile;

                if(user != '0')
                {
                    vm.user = user;
                }
            })
            .error(function (error) {
                console.log(error);
            });

        function updateProfile()
        {
            if(UserService.updateUser(userId,vm.user))
            {
                vm.success = "Profile was successsfully updated";
            }
            else
            {
                vm.error = "Could not update the profile!";
            }

        }





    }
})();
