var TokenCookieName = 'Tauth';
var LoggedUserDataCookieName = 'Luser';
var ADMIN_ROLE_VALUE = 'Admin';
var CLIENT_ROLE_VALUE = 'Client';

var Account = {
    UserAccountOperations: function () {
        if (Cookies.get(TokenCookieName) !== undefined && Cookies.get(LoggedUserDataCookieName) !== undefined) {
            var userData = JSON.parse(Cookies.get(LoggedUserDataCookieName));
            $("#loggedUser").text(userData.UserName + ' - ' + userData.DocumentId);
            $(".nav-logout").show();
            $(".nav-login").hide();

            if (userData.Roles.includes(ADMIN_ROLE_VALUE)) {
                $(".nav-admin").show();
            }
        } else {
            $(".nav-logout").hide();
            $(".nav-login").show();
        }
    },
    Register: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#registerForm").valid()) {

            Common.ShowLoadingIndicator();

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
                Common.HideLoadingIndicator();
                toastr["success"](data);
            }).fail(function (jqXHR) {
                Common.HideLoadingIndicator();
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

            Common.ShowLoadingIndicator();

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
                Common.HideLoadingIndicator();
                toastr["success"](data.message);

                if (Cookies.get(TokenCookieName) !== undefined) {
                    Cookies.remove(TokenCookieName);
                }

                Cookies.set(TokenCookieName, data.token, { expires: 7 });

                if (Cookies.get(LoggedUserDataCookieName) !== undefined) {
                    Cookies.remove(LoggedUserDataCookieName);
                }

                Cookies.set(LoggedUserDataCookieName, {
                    Id: data.id,
                    UserName: data.userName,
                    Email: data.email,
                    DocumentId: data.documentId,
                    Roles: data.roles
                }, { expires: 7 });

                Account.UserAccountOperations();
            }).fail(function (jqXHR) {
                Common.HideLoadingIndicator();
                toastr["error"](jqXHR.responseText);
            }).always(function () {
                $('#loginModal').modal('toggle');
            });
        }
    },
    Logout: function (event) {
        event.preventDefault();

        Component.InitToastr();
        Common.ShowLoadingIndicator();

        $.ajax({
            url: "https://localhost:44397/api/accounts/logout",
            type: "POST",
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get(TokenCookieName));
            }
        }).done(function (data) {
            Common.HideLoadingIndicator();
            toastr["success"](data);

            if (Cookies.get(TokenCookieName) !== undefined) {
                Cookies.remove(TokenCookieName);
            }

            if (Cookies.get(LoggedUserDataCookieName) !== undefined) {
                Cookies.remove(LoggedUserDataCookieName);
            }

            Account.UserAccountOperations();
            window.location.href = $('#defaultRedirectionUrl').val();
        }).fail(function (jqXHR) {
            Common.HideLoadingIndicator();
            toastr["error"](jqXHR.responseText);
        });
    },
    ForgotPassword: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#forgotPasswordForm").valid()) {

            Common.ShowLoadingIndicator();

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
                Common.HideLoadingIndicator();
                toastr["success"](data);
            }).fail(function (jqXHR) {
                Common.HideLoadingIndicator();
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

            Common.ShowLoadingIndicator();

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
            }).done(function () {
                Common.HideLoadingIndicator();
                $("#resetPassword").prop("readonly", true);
                $("#resetConfirmPassword").prop("readonly", true);
                $("#resetSubmit").prop("disabled", true);
                window.location.href = $('#defaultRedirectionUrl').val();
            }).fail(function (jqXHR) {
                Common.HideLoadingIndicator();
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
                    changeNewPassword: {
                        required: true,
                        minlength: 6,
                        maxlength: 100
                    },
                    changeConfirmNewPassword: {
                        required: true,
                        equalTo: "#changeNewPassword"
                    }
                },
                messages: {
                    changeOldPassword: {
                        required: "La contraseña actual es requerida",
                        minlength: "La contraseña actual debe tener mas de 6 caracteres",
                        maxlength: "La contraseña actual debe tener menos de 100 caracteres"
                    },
                    changeNewPassword: {
                        required: "La nueva contraseña es requerida",
                        minlength: "La nueva contraseña debe tener mas de 6 caracteres",
                        maxlength: "La nueva contraseña debe tener menos de 100 caracteres"
                    },
                    changeConfirmNewPassword: {
                        required: "Confirmar nueva contraseña es requerida",
                        equalTo: "Nueva contraseña y confirmar nueva contraseña no coinciden, verificar que sean iguales"
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

            Common.ShowLoadingIndicator();

            var jsonObject = {
                Id: $("#changeId").val(),
                OldPassword: $("#changeOldPassword").val(),
                NewPassword: $("#changeNewPassword").val(),
                NewConfirmPassword: $("#changeConfirmNewPassword").val()
            };
            $.ajax({
                url: "https://localhost:44397/api/accounts/change",
                type: "POST",
                data: JSON.stringify(jsonObject),
                contentType: "application/json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get(TokenCookieName));
                }
            }).done(function () {
                Common.HideLoadingIndicator();
                $("#changeOldPassword").prop("readonly", true);
                $("#changeNewPassword").prop("readonly", true);
                $("#changeConfirmNewPassword").prop("readonly", true);
                $("#changeSubmit").prop("disabled", true);
                window.location.href = $('#defaultRedirectionUrl').val();
            }).fail(function (jqXHR) {
                Common.HideLoadingIndicator();
                toastr["error"](jqXHR.responseText);
            });
        }
    }
};