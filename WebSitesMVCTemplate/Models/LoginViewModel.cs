using System.ComponentModel.DataAnnotations;

namespace WebSitesMVCTemplate.Models
{
    public class LoginViewModel
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "{0} es requerido.")]
        [EmailAddress(ErrorMessage = "{0} es incorrecto.")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "{0} es requerida.")]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }

        //[Display(Name = "Recuerdame?")]
        //public bool RememberMe { get; set; }
    }
}
