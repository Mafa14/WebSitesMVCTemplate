var User = {
    InitializeProfileData: function () {

        Component.InitToastr();
        Common.ShowLoadingIndicator();

        var profileForm = $("#profileForm");

        profileForm.submit(function (event) {
            event.preventDefault();
        });

        if (Cookies.get(TokenCookieName) !== undefined && Cookies.get(LoggedUserDataCookieName) !== undefined) {
            var userData = JSON.parse(Cookies.get(LoggedUserDataCookieName)),
                birthDatePicker = $("#profileBirthDate");

            birthDatePicker.datepicker({ dateFormat: 'dd/mm/yy' });

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

            $.ajax({
                url: "https://localhost:44397/api/users?id=" + userData.Id,
                type: "GET",
                contentType: "application/json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get(TokenCookieName));
                }
            }).done(function (data) {
                Common.HideLoadingIndicator();

                $("#profileId").val(data.id);
                $("#profileEmail").val(data.email);
                $("#profileUserName").val(data.userName);
                $("#profileDocumentId").val(data.documentId);
                $("#profilePhone").val(data.phoneNumber);
                $("#profileAddress").val(data.address);

                if (new Date(data.birthDate) > DATE_MIN_VALUE) {
                    birthDatePicker.datepicker("setDate", new Date(data.birthDate));
                }

                profileForm.submit(User.SaveProfile);
            }).fail(function (jqXHR) {
                Common.HideLoadingIndicator();
                toastr["error"](jqXHR.responseText);
            });
        } else {
            toastr["error"]("Error, tienes que estar loggeado para poder acceder a esta pagina.");
        }
    },
    SaveProfile: function (event) {
        event.preventDefault();

        Component.InitToastr();

        if ($("#profileForm").valid()) {

            Common.ShowLoadingIndicator();

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
                contentType: "application/json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get(TokenCookieName));
                }
            }).done(function () {
                Common.HideLoadingIndicator();
                window.location.href = $('#defaultRedirectionUrl').val();
            }).fail(function (jqXHR) {
                Common.HideLoadingIndicator();
                toastr["error"](jqXHR.responseText);
            });
        }
    },
    InitializeUserList: function () {

        Component.InitToastr();

        var usersTable = $("#usersTable");

        usersTable.find('tfoot th').each(function () {
            $(this).html('<input type="text" placeholder="" />');
        });

        var table = usersTable.DataTable({
            'processing': true,
            'serverSide': true,
            'ordering': true,
            'paging': true,
            'searching': true,
            'dom': 'lrtip',
            'ajax': {
                'url': 'https://localhost:44397/api/users/all',
                'type': 'POST',
                'contentType': 'application/json',
                'beforeSend': function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get(TokenCookieName));
                    Common.ShowLoadingIndicator();
                },
                'data': function (d) {
                    return JSON.stringify(d);
                },
                'dataSrc': function (json) {
                    Common.HideLoadingIndicator();

                    if (json.error != '') {
                        toastr["error"](json.error);
                        return '';
                    }

                    return json.data;
                }
            },
            'columns': [
                { 'data': 'userName', 'name': 'UserName' },
                { 'data': 'documentId', 'name': 'DocumentId' },
                { 'data': 'email', 'name': 'Email' },
                { 'data': 'phoneNumber', 'name': 'PhoneNumber' }
            ]
        });

        table.columns().every(function () {
            var currentColumn = this;

            $('input', this.footer()).on('keyup change', function () {
                if (currentColumn.search() !== this.value) {
                    currentColumn.search(this.value).draw();
                }
            });
        });
    }
};