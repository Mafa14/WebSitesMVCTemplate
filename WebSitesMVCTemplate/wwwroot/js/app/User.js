var User = {
    InitializeProfileData: function () {

        Component.InitToastr();

        var profileForm = $("#profileForm");

        if (Cookies.get(TokenCookieName) !== undefined && Cookies.get(LoggedUserDataCookieName) !== undefined) {
            var userData = JSON.parse(Cookies.get(LoggedUserDataCookieName));

            $("#profileId").val(userData.Id);
            $("#profileEmail").val(userData.Email);
            $("#profileUserName").val(userData.UserName);
            $("#profileDocumentId").val(userData.DocumentId);
            $("#profilePhone").val(userData.PhoneNumber);
            $("#profileAddress").val(userData.Address);
            $("#profileBirthDate").val(userData.BirthDate);

            profileForm.validate({
                rules: {
                    profileDocumentId: {
                        required: true,
                        minlength: 6,
                        maxlength: 100
                    },
                    profileUserName: {
                        required: true,
                        minlength: 2,
                        maxlength: 256
                    },
                    profileEmail: {
                        required: true,
                        email: true
                    },
                    profilePhone: {
                        required: false,
                        minlength: 2,
                        maxlength: 50
                    },
                    profileAddress: {
                        required: false,
                        minlength: 2,
                        maxlength: 256
                    }
                },
                messages: {
                    profileDocumentId: {
                        required: "Documento de identidad es requerido",
                        minlength: "Documento de identidad debe tener por lo menos 6 caracteres",
                        maxlength: "Documento de identidad debe tener menos de 100 caracteres"
                    },
                    profileUserName: {
                        required: "Nombre completo es requerido",
                        minlength: "Nombre completo debe tener por lo menos 2 caracteres",
                        maxlength: "Nombre completo debe tener menos de 256 caracteres"
                    },
                    profileEmail: {
                        required: "El Email es requerido",
                        email: "El formato del Email es incorrecto"
                    },
                    profilePhone: {
                        minlength: "Telefono/Celular debe tener por lo menos 2 caracteres",
                        maxlength: "Telefono/Celular debe tener menos de 50 caracteres"
                    },
                    profileAddress: {
                        minlength: "Dirección debe tener por lo menos 2 caracteres",
                        maxlength: "Dirección debe tener menos de 256 caracteres"
                    }
                }
            });

            profileForm.submit(User.SaveProfile);
        } else {
            toastr["error"]("Error, tienes que estar loggeado para poder acceder a esta pagina.");

            profileForm.submit(function (event) {
                event.preventDefault();
            });
        }
    },
    SaveProfile: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#profileForm").valid()) {
            var jsonObject = {
                Id: $("#profileId").val(),
                UserName: $("#profileUserName").val(),
                Email: $("#profileEmail").val(),
                PhoneNumber: $("#profilePhone").val(),
                BirthDate: $("#profileBirthDate").val(),
                DocumentId: $("#profileDocumentId").val(),
                Address: $("#profileAddress").val(),
                ConfirmationUrl: $("#profileConfirmationUrl").val()
            };
            $.ajax({
                url: "https://localhost:44397/api/users",
                type: "PUT",
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