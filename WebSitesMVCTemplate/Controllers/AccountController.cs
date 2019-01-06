using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using WebSitesMVCTemplate.Helpers;
using WebSitesMVCTemplate.Models;

namespace WebSitesMVCTemplate.Controllers
{
    [Route("[controller]/[action]")]
    [Authorize]
    public class AccountController : Controller
    {
        [HttpGet]
        [AllowAnonymous]
        public IActionResult ConfirmEmail(string id, string token)
        {
            if (id == null || token == null)
            {
                throw new ApplicationException("El usuario y token son requeridos reiniciar la contraseña.");
            }

            if (WebAPICaller.ConfirmEmailCall(id, token))
            {
                return RedirectToAction(nameof(HomeController.Index));
            }

            throw new ApplicationException("El usuario y/o token son incorrectos.");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string id, string token = null)
        {
            if (id == null || token == null)
            {
                throw new ApplicationException("El usuario y token son requeridos reiniciar la contraseña.");
            }

            return View(new ResetPasswordViewModel { Id = id, Token = token });
        }
    }
}