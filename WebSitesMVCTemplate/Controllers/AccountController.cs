using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using WebSitesMVCTemplate.Helpers;
using WebSitesMVCTemplate.Models;

namespace WebSitesMVCTemplate.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        [HttpGet]
        [AllowAnonymous]
        public IActionResult ConfirmEmail(string id, string token = null)
        {
            if (id == null || token == null)
            {
                throw new ApplicationException("El usuario y token son requeridos para reiniciar la contraseña.");
            }

            if (WebAPICaller.ConfirmEmailCall(id, token))
            {
                return RedirectToAction("Index", "Home");
            }

            throw new ApplicationException("El usuario y/o token son incorrectos.");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string id, string token = null)
        {
            if (id == null || token == null)
            {
                throw new ApplicationException("El usuario y token son requeridos para reiniciar la contraseña.");
            }

            return View(new ResetPasswordViewModel { Id = id, Token = token });
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ChangePassword()
        {
            return View();
        }
    }
}