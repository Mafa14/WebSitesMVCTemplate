var TokenCookieName = 'Tauth';
var LoggedUserDataCookieName = 'Luser';

var Account = {
    UserAccountOperations: function () {
        if (Cookies.get(TokenCookieName) !== undefined && Cookies.get(LoggedUserDataCookieName) !== undefined) {
            var userData = JSON.parse(Cookies.get(LoggedUserDataCookieName));
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

            Account.UserAccountOperations();
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
                toastr["success"](data.message);

                Account.Token(data.email, data.password);

                if (Cookies.get(LoggedUserDataCookieName) !== undefined) {
                    Cookies.remove(LoggedUserDataCookieName);
                }

                Cookies.set(LoggedUserDataCookieName, {
                    Id: data.id,
                    UserName: data.userName,
                    Email: data.email,
                    PhoneNumber: data.phoneNumber,
                    BirthDate: data.birthDate,
                    DocumentId: data.documentId,
                    Address: data.address
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

            Account.UserAccountOperations();
        }).fail(function (jqXHR) {
            toastr["error"](jqXHR.responseText);
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
                $("#resetPassword").prop("readonly", true);
                $("#resetConfirmPassword").prop("readonly", true);
                $("#resetSubmit").prop("disabled", true);
            }).fail(function (jqXHR) {
                toastr["error"](jqXHR.responseText);
            });
        }
    },
    InitializeChangePassword: function () {

        Component.InitToastr();

        var changeForm = $("#changeForm");

        if (Cookies.get(TokenCookieName) !== undefined && Cookies.get(LoggedUserDataCookieName) !== undefined) {
            var userData = JSON.parse(Cookies.get(LoggedUserDataCookieName));

            $("#changeId").val(userData.Id);

            changeForm.validate({
                rules: {
                    changeOldPassword: {
                        required: true,
                        minlength: 6,
                        maxlength: 100
                    },
                    changePassword: {
                        required: true,
                        minlength: 6,
                        maxlength: 100
                    },
                    changeConfirmPassword: {
                        required: true,
                        equalTo: "#changePassword"
                    }
                },
                messages: {
                    changeOldPassword: {
                        required: "La contraseña actual es requerida",
                        minlength: "La contraseña actual debe tener mas de 6 caracteres",
                        maxlength: "La contraseña actual debe tener menos de 100 caracteres"
                    },
                    changePassword: {
                        required: "La nueva contraseña es requerida",
                        minlength: "La nueva contraseña debe tener mas de 6 caracteres",
                        maxlength: "La nueva contraseña debe tener menos de 100 caracteres"
                    },
                    changeConfirmPassword: {
                        required: "Confirmar contraseña es requerida",
                        equalTo: "Nueva contraseña y confirmar contraseña no coinciden, verificar que sean iguales"
                    }
                }
            });

            changeForm.submit(Account.ChangePassword);
        } else {
            toastr["error"]("Error, tienes que estar loggeado para poder acceder a esta pagina.");

            changeForm.submit(function (event) {
                event.preventDefault();
            });
        }
    },
    ChangePassword: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#changeForm").valid()) {
            var jsonObject = {
                Id: $("#changeId").val(),
                OldPassword: $("#changeOldPassword").val(),
                NewPassword: $("#changePassword").val(),
                NewConfirmPassword: $("#changeConfirmPassword").val()
            };
            $.ajax({
                url: "https://localhost:44397/api/accounts/change",
                type: "POST",
                data: JSON.stringify(jsonObject),
                contentType: "application/json"
            }).done(function (data) {
                // TODO: Go to Home/Index, send a callback that initialize a toastr with a message.
            }).fail(function (jqXHR) {
                toastr["error"](jqXHR.responseText);
            });
        }
    }
};