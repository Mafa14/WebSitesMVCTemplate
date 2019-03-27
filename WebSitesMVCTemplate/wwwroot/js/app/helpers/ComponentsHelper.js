var DATES_COMMON_SEPARATOR = '/';

var Component = {
    InitToastr: function () {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "4000",
            "timeOut": "4000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    },
    ToDate: function (value) {
        var from = value.split(DATES_COMMON_SEPARATOR)
        return new Date(from[2], from[1] - 1, from[0])
    }
}