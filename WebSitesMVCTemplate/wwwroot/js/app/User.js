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

                var formattedDate = Component.ToDate(data.birthDate);
                if (formattedDate > DATE_MIN_VALUE) {
                    birthDatePicker.datepicker("setDate", formattedDate);
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

        if (Cookies.get(TokenCookieName) !== undefined && Cookies.get(LoggedUserDataCookieName) !== undefined) {
            var usersTable = $("#usersTable");
            var userData = JSON.parse(Cookies.get(LoggedUserDataCookieName))

            usersTable.find('tfoot th').each(function () {
                if (!$(this).hasClass('no-search')) {
                    $(this).html('<input type="text" placeholder="" />');
                }
            });

            var deleteButton = '<button class="btn btn-primary delete-btn" alt="Borrar"><i class="fa fa-trash"></i></button>';
            var reservesButton = '<button class="btn btn-primary reserves-btn" alt="Reservas"><i class="fa fa-book"></i></button>';

            var table = usersTable.DataTable({
                'processing': true,
                'serverSide': true,
                'ordering': true,
                'paging': true,
                'searching': true,
                'dom': 'lrtip',
                'ajax': {
                    'url': 'https://localhost:44397/api/users/all/' + userData.Id,
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
                    },
                    'error': function (jqXHR, textStatus, errorThrown) {
                        Common.HideLoadingIndicator();

                        if (jqXHR.responseText != '') {
                            toastr["error"](jqXHR.responseText);
                        }

                        $('.dataTables_processing').hide()

                        return '';
                    }
                },
                'columns': [
                    {
                        'data': 'id',
                        'name': 'Id',
                        'visible': false,
                        'searchable': false,
                        'orderable': false
                    },
                    { 'data': 'userName', 'name': 'UserName' },
                    { 'data': 'documentId', 'name': 'DocumentId' },
                    { 'data': 'email', 'name': 'Email' },
                    { 'data': 'phoneNumber', 'name': 'PhoneNumber' },
                    {
                        'data': 'options',
                        'name': 'Options',
                        'searchable': false,
                        'orderable': false
                    }
                ],
                'columnDefs': [
                    {
                        'targets': -1,
                        'data': null,
                        'defaultContent': deleteButton + reservesButton
                    }
                ],
                'language': {
                    'lengthMenu': 'Mostrar _MENU_ registros por página',
                    'zeroRecords': 'Ningún registro encontrado',
                    'info': 'Viendo página _PAGE_ de _PAGES_',
                    'infoEmpty': 'Ningún registro disponible',
                    'infoFiltered': '(filtrando de un total _MAX_ de registros)',
                    'loadingRecords': 'Cargando...',
                    'processing': 'Procesando...',
                    'paginate': {
                        'first': 'Primero',
                        'last': 'Último',
                        'next': 'Siguiente',
                        'previous': 'Anterior'
                    }
                }
            });

            table.columns().every(function () {
                var currentColumn = this;

                $('input', this.footer()).on('keyup change', function () {
                    if (currentColumn.search() !== this.value) {
                        currentColumn.search(this.value).draw();
                    }
                });
            });

            usersTable.find('tbody').on('click', 'button', function () {
                var options = this.className;
                var data = table.row($(this).parents('tr')).data();

                if (options.indexOf('delete-btn') >= 0) {
                    User.DeleteUser(data['id']);
                } else if (options.indexOf('reserves-btn') >= 0) {
                    User.GetUserReserves(data['id']);
                }
            });
        } else {
            toastr["error"]("Error, tienes que estar loggeado para poder acceder a esta pagina.");
        }
    },
    DeleteUser: function (userId) {
        event.preventDefault();

        Component.InitToastr();

        Common.ShowLoadingIndicator();

        $.ajax({
            url: "https://localhost:44397/api/users/delete/" + userId,
            type: "DELETE",
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get(TokenCookieName));
            }
        }).done(function () {
            Common.HideLoadingIndicator();
            location.reload();
        }).fail(function (jqXHR) {
            Common.HideLoadingIndicator();
            toastr["error"](jqXHR.responseText);
        });
    },
    GetUserReserves: function (userId) {
        event.preventDefault();

        // TODO: We will implement after discussing with the client
        alert(userId);
    }
};