var Localizaion_es = function (fieldName) {

    switch (fieldName) {
        case "documentId":
            return {
                required: "Documento de identidad es requerido",
                minlength: "Documento de identidad debe tener por lo menos 6 caracteres"
            };
        case "userName":
            return {
                required: "Nombre completo es requerido",
                maxlength: "Nombre completo debe tener menos de 256 caracteres"
            };
        case "email":
            return {
                required: "El formato del Email es incorrecto"
            };
        case "password":
            return {
                required: "La contraseña es requerida",
                minlength: "La contraseña debe tener mas de 6 caracteres",
                maxlength: "La contraseña debe tener menos de 20 caracteres",
                equalTo: "Contraseña y Repetir contrseña no coinciden, verificar que sean iguales"
            };
    }
};