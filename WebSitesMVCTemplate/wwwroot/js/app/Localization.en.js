var Localizaion_en = function (fieldName) {

    switch (fieldName) {
        case "documentId":
            return {
                required: "Document Id is required",
                minlength: "Document Id has to be at least 6 chatacters long"
            };
        case "userName":
            return {
                required: "User Name is required",
                maxlength: "User Name has to be less than 256 characters long"
            };
        case "email":
            return {
                required: "Email format is invalid"
            };
        case "password":
            return {
                required: "Password is required",
                minlength: "Password has to be more than 6 characters long",
                maxlength: "Password has to be less than 20 characters long",
                equalTo: "Password and Repeat password do not match, check they are equal"
            };
    }
};