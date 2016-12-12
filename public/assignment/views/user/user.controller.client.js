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
            //var promise = UserService.findUserByCredentials(username,password);
            var promise = UserService.login(username, password)
            promise
                .success(function(user){
                    if(user === '0')
                        vm.error = "No such user or the username,password does not match";
                    else
                        $location.url("user/");
                })
                .error(function (error) {
                    console.log(error);
                });
        }



    }

    function RegisterController($location, UserService, $rootScope)
    {
        var vm = this;
        vm.register = register;

        function register(user)
        {
            if(user === undefined)
            {
                vm.error = "Please fill out all the fields!";
                return;
            }
            else if(user.username === undefined || user.username === null)
            {
                vm.error = "Please enter a username";
                return;
            }

            else if(user.password === undefined || user.password === null)
            {
                vm.error = "Please enter a password";
                return;
            }


            else if(user.password != user.confirmPassword)
            {
                vm.error = "Passwords do not match!";
                return;
            }

            UserService
                .register(user)
                .success(function(userObj){
                    if(userObj == '0')
                    {
                        vm.error = "Please choose a different username, this username already exists!"
                    }
                    else
                    {
                        var userId = userObj._id;
                        $rootScope.currentUser = userObj;
                        $location.url('/user/');
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
        vm.logout = logout;

        console.log("Logged");
        UserService
            .findUser()
            .success(function (user) {
                // vm.userId = userId;
                // vm.updateProfile = updateProfile;

                console.log("user is");
                console.log(user);
                if(user != '0')
                {
                    vm.user = user;
                    vm.userId = user._id;
                    //vm.updateProfile = updateProfile;
                }
            })
            .error(function (error) {
                console.log(error);
            });

        function updateProfile()
        {

            UserService
                .updateUser(vm.user)
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

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");
                })
                .error(function (error) {
                   console.log(error);
                   console.log(error);
                   console.log(error);
                });
        }




    }
})();
