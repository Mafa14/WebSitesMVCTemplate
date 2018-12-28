﻿$(document).ready(function () {
    ModalsInitialization();
    InitializeForms();
});

function ModalsInitialization() {
    $('.modal').on('hidden.bs.modal', function () {
        var currentForm = $(this).find('form');

        if (currentForm[0] !== undefined && currentForm[0] !== null) {
            currentForm.validate().resetForm();
            currentForm.find("input").removeClass("error");
            currentForm[0].reset();
        }
    });
}

function InitializeForms() {
    var loginForm = $('#loginForm'),
        registerForm = $('#registerForm'),
        logoutSubmit = $('#logoutSubmit');

    loginForm.validate({
        rules: {
            loginEmail: {
                required: true,
                email: true
            },
            loginPassword: {
                required: true,
                minlength: 6,
                maxlength: 100
            }
        },
        messages: {
            loginEmail: {
                required: "El Email es requerido",
                email: "El formato del Email es incorrecto"
            },
            loginPassword: {
                required: "La contraseña es requerida",
                minlength: "La contraseña debe tener mas de 6 caracteres",
                maxlength: "La contraseña debe tener menos de 20 caracteres"
            }
        }
    });

    registerForm.validate({
        rules: {
            registerDocumentId: {
                required: true,
                minlength: 6,
                maxlength: 100
            },
            registerUserName: {
                required: true,
                minlength: 2,
                maxlength: 256
            },
            registerEmail: {
                required: true,
                email: true
            },
            registerPassword: {
                required: true,
                minlength: 6,
                maxlength: 100
            },
            registerConfirmPassword: {
                required: true,
                equalTo: "#registerPassword"
            }
        },
        messages: {
            registerDocumentId: {
                required: "Documento de identidad es requerido",
                minlength: "Documento de identidad debe tener por lo menos 6 caracteres",
                maxlength: "Documento de identidad debe tener menos de 100 caracteres"
            },
            registerUserName: {
                required: "Nombre completo es requerido",
                minlength: "Nombre completo debe tener por lo menos 2 caracteres",
                maxlength: "Nombre completo debe tener menos de 256 caracteres"
            },
            registerEmail: {
                required: "El Email es requerido",
                email: "El formato del Email es incorrecto"
            },
            registerPassword: {
                required: "La contraseña es requerida",
                minlength: "La contraseña debe tener mas de 6 caracteres",
                maxlength: "La contraseña debe tener menos de 100 caracteres"
            },
            registerConfirmPassword: {
                required: "Repetir contraseña es requerida",
                equalTo: "Contraseña y repetir contraseña no coinciden, verificar que sean iguales"
            }
        }
    });

    loginForm.submit(Account.Login);
    registerForm.submit(Account.Register);
    logoutSubmit.click(Account.Logout);
}