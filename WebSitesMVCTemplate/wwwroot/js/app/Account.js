var Account = {
    UserAccountOperations: function () {
        var userAuthenticated = localStorage.getItem("token");
        var userCredentials = localStorage.getItem("loggedUser");
        if (userAuthenticated !== null && userCredentials !== null) {
            $("#loggedUser").text(userCredentials);
            $(".nav-logout").show();
            $(".nav-login").hide();
        } else {
            $(".nav-logout").hide();
            $(".nav-login").show();
        }
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
                ConfirmPassword: $("#registerConfirmPassword").val()
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
                toastr["success"](data);
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
            localStorage.removeItem("token");
            localStorage.removeItem("loggedUser");

            UserAccountOperations();
        }).fail(function (jqXHR) {
            toastr["error"](jqXHR.responseText);
        }).always(function () {
            $('#loginModal').modal('toggle');
        });
    }
};