using System.ComponentModel.DataAnnotations;

namespace WebSitesMVCTemplate.Models
{
    public class RegisterViewModel
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "{0} es requerido.")]
        [StringLength(100, ErrorMessage = "{0} debe tener un maximo de {1} y un minimo de {2} caracteres.", MinimumLength = 6)]
        [Display(Name = "Documento de identidad")]
        public string DocumentId { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "{0} es requerido.")]
        [StringLength(256, ErrorMessage = "{0} debe tener un maximo de {1} y un minimo de {2} caracteres.", MinimumLength = 2)]
        [Display(Name = "Nombre completo")]
        public string UserName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "{0} es requerido.")]
        [EmailAddress(ErrorMessage = "{0} es incorrecto.")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "{0} es requerida.")]
        [StringLength(100, ErrorMessage = "{0} debe tener un maximo de {1} y un minimo de {2} caracteres.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar contraseña")]
        [Compare("Password", ErrorMessage = "Contraseña y Confirmar contraseña no coinciden, verificar que sean iguales.")]
        public string ConfirmPassword { get; set; }
    }
}
