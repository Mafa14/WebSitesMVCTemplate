var TokenCookieName = 'Tauth';
var LoggedUserDataCookieName = 'Luser';

var Account = {
    UserAccountOperations: function () {
        if (Cookies.get(TokenCookieName) !== undefined && Cookies.get(LoggedUserDataCookieName) !== undefined) {
            var userData = Cookies.get(LoggedUserDataCookieName);
            $("#loggedUser").text(userData.UserName + ' - ' + userData.DocumentId);
            $(".nav-logout").show();
            $(".nav-login").hide();
        } else {
            $(".nav-logout").hide();
            $(".nav-login").show();
        }
    },
    Token: function (email, password) {
        Component.InitToastr();

        var jsonObject = {
            Email: email,
            Password: password
        };
        $.ajax({
            url: "https://localhost:44397/api/tokens",
            type: "POST",
            data: JSON.stringify(jsonObject),
            contentType: "application/json"
        }).done(function (data) {
            if (Cookies.get(TokenCookieName) !== undefined) {
                Cookies.remove(TokenCookieName);
            }

            Cookies.set(TokenCookieName, data, { expires: 7 });
        }).fail(function (jqXHR) {
            toastr["error"](jqXHR.responseText);
        });
    },
    Register: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#registerForm").valid()) {
            var jsonObject = {
                DocumentId: $("#registerDocumentId").val(),
                UserName: $("#registerUserName").val(),
                Email: $("#registerEmail").val(),
                Password: $("#registerPassword").val(),
                ConfirmPassword: $("#registerConfirmPassword").val(),
                ConfirmationUrl: $("#registerConfirmationUrl").val()
            };
            $.ajax({
                url: "https://localhost:44397/api/accounts/register",
                type: "POST",
                data: JSON.stringify(jsonObject),
                contentType: "application/json"
            }).done(function (data) {
                toastr["success"](data);
            }).fail(function (jqXHR) {
                toastr["error"](jqXHR.responseText);
            }).always(function () {
                $('#registerModal').modal('toggle');
            });
        }
    },
    Login: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#loginForm").valid()) {
            var jsonObject = {
                Email: $("#loginEmail").val(),
                Password: $("#loginPassword").val()
            };
            $.ajax({
                url: "https://localhost:44397/api/accounts/login",
                type: "POST",
                data: JSON.stringify(jsonObject),
                contentType: "application/json"
            }).done(function (data) {
                toastr["success"](data.Message);

                this.Token(data.UserId, data.Password);

                if (Cookies.get(LoggedUserDataCookieName) !== undefined) {
                    Cookies.remove(LoggedUserDataCookieName);
                }

                Cookies.set(LoggedUserDataCookieName, {
                    Email: data.Email,
                    UserName: data.UserName,
                    DocumentId: data.DocumentId
                }, { expires: 7 });
            }).fail(function (jqXHR) {
                toastr["error"](jqXHR.responseText);
            }).always(function () {
                $('#loginModal').modal('toggle');
            });
        }
    },
    Logout: function (event) {
        event.preventDefault();

        Component.InitToastr();

        $.ajax({
            url: "https://localhost:44397/api/accounts/logout",
            type: "POST",
            contentType: "application/json"
        }).done(function (data) {
            toastr["success"](data);

            if (Cookies.get(TokenCookieName) !== undefined) {
                Cookies.remove(TokenCookieName);
            }

            if (Cookies.get(LoggedUserDataCookieName) !== undefined) {
                Cookies.remove(LoggedUserDataCookieName);
            }

            UserAccountOperations();
        }).fail(function (jqXHR) {
            toastr["error"](jqXHR.responseText);
        }).always(function () {
            $('#loginModal').modal('toggle');
        });
    },
    ForgotPassword: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#forgotPasswordForm").valid()) {
            var jsonObject = {
                Email: $("#forgotPasswordEmail").val(),
                ConfirmationUrl: $("#forgotPasswordConfirmationUrl").val()
            };
            $.ajax({
                url: "https://localhost:44397/api/accounts/forgot",
                type: "POST",
                data: JSON.stringify(jsonObject),
                contentType: "application/json"
            }).done(function (data) {
                toastr["success"](data.Message);
            }).fail(function (jqXHR) {
                toastr["error"](jqXHR.responseText);
            }).always(function () {
                $('#forgotPasswordModal').modal('toggle');
            });
        }
    },
    ResetPassword: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#resetForm").valid()) {
            var jsonObject = {
                Id: $("#resetId").val(),
                Token: $("#resetToken").val(),
                Password: $("#resetPassword").val(),
                ConfirmPassword: $("#resetConfirmPassword").val()
            };
            $.ajax({
                url: "https://localhost:44397/api/accounts/reset",
                type: "POST",
                data: JSON.stringify(jsonObject),
                contentType: "application/json"
            }).done(function (data) {
                toastr["success"](data);
                $("#resetHomeLink").show();
            }).fail(function (jqXHR) {
                toastr["error"](jqXHR.responseText);
            });
        }
    }
};