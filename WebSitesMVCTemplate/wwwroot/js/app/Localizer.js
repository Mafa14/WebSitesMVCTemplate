var Localizer = {
    GetLocalizedMessage: function (language) {
        if (language.includes("es")) {
            return Localizaion_es;
        }

        if (language.includes("en")) {
            return Localizaion_en;
        }

        // Default language
        return Localizaion_en;
    }
};