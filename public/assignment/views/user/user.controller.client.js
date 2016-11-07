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

            UserService
                .createUser(user)
                .success(function(userObj){
                    if(userObj == '0')
                    {
                        vm.error = "Please choose a different username, this username already exists!"
                    }
                    else
                    {
                        var userId = userObj._id;
                        $location.url('/user/'+userId);
                    }
                })
                .error(function (error) {

                });
        }


    }
    
    function ProfileController($routeParams, UserService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateProfile = updateProfile;
        vm.unregisterUser = unRegisterUser;

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

            UserService
                .updateUser(userId, vm.user)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Could not update the profile!";
                    }
                    else
                    {
                        vm.success = "Profile was successsfully updated";
                    }

                })
                .error(function () {

                });
        }

        function unRegisterUser()
        {
            UserService
                .deleteUser(vm.user._id)
                .success(function () {
                    $location.url('/login');
                })
                .error(function (error) {
                   console.log(error);
                });


        }





    }
})();
