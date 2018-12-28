using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebSitesMVCTemplate.Controllers
{
    [Route("[controller]/[action]")]
    [Authorize]
    public class AccountController : Controller
    {
        //private static readonly string DefaultReturnUrl = "/Home/Index";
        //private readonly UserManager<ApplicationUser> _userManager;
        //private readonly SignInManager<ApplicationUser> _signInManager;
        //private readonly IAppLogger<AccountController> _logger;
        //private readonly IEmailSender _emailSender;

        public AccountController()
            //UserManager<ApplicationUser> userManager,
            //SignInManager<ApplicationUser> signInManager,
            //IAppLogger<AccountController> logger,
            //IEmailSender emailSender)
        {
            //_userManager = userManager;
            //_signInManager = signInManager;
            //_logger = logger;
            //_emailSender = emailSender;
        }

        //[HttpPost]
        //[Route("register")]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Register(RegisterViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = new ApplicationUser { DocumentId = model.DocumentId, UserName = model.Email, Email = model.Email };

        //        try
        //        {
        //            var result = await _userManager.CreateAsync(user, model.Password);
        //            if (result.Succeeded)
        //            {
        //                await _signInManager.SignInAsync(user, isPersistent: false);
        //            }
        //        }
        //        catch (SqlException sqlex)
        //        {
        //            return StatusCode(
        //                (int)HttpStatusCode.InternalServerError,
        //                new
        //                {
        //                    Message = "Error comunicandose con la base de datos, ver los registros para mas detalles.",
        //                    Errors = sqlex.Message
        //                });
        //        }
        //        catch (Exception ex)
        //        {
        //            return BadRequest(new
        //            {
        //                Message = "Un error ocurrio al crear el usuario, ver los registros para mas detalles.",
        //                Errors = ex.Message
        //            });
        //        }

        //        var emailConfirmationToken = _userManager.GenerateEmailConfirmationTokenAsync(user);
        //        var tokenVerificationUrl = Url.Action(
        //            "VerifyEmail", "Account",
        //            new
        //            {
        //                user.Id,
        //                token = emailConfirmationToken
        //            },
        //            Request.Scheme);
        //        await _emailSender.SendEmailAsync(model.Email, "Verifique su email",
        //            $"Click en <a href='{HtmlEncoder.Default.Encode(tokenVerificationUrl)}'>here</a> para verificar tu email.");

        //        return Ok($"Registro completado, por favor verifique su email - {model.Email}");
        //    }

        //    return BadRequest("Los datos ingresados no son correctos, por favor verificar e intentar nuevamente.");
        //}

        //[HttpPost]
        //[Route("login")]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Login(LoginViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, lockoutOnFailure: false);
        //            if (result.Succeeded)
        //            {
        //                if (CookiesManager.GetCookie(HttpContext, Constants.LOGGEDUSER_COOKIENAME) != null)
        //                {
        //                    var user = await _userManager.FindByEmailAsync(model.Email);
        //                    CookiesManager.RemoveCookie(HttpContext, Constants.LOGGEDUSER_COOKIENAME);
        //                    CookiesManager.SetCookie(HttpContext, Constants.LOGGEDUSER_COOKIENAME, user.UserName + " - " + user.DocumentId, DateTime.Today.AddHours(1));
        //                }

        //                // TODO: Verify the token generation logic
        //                if (CookiesManager.GetCookie(HttpContext, Constants.TOKEN_COOKIENAME) != null)
        //                {
        //                    // Generate a Token
        //                    CookiesManager.RemoveCookie(HttpContext, Constants.TOKEN_COOKIENAME);
        //                    CookiesManager.SetCookie(HttpContext, Constants.TOKEN_COOKIENAME, new Guid().ToString(), DateTime.Today.AddHours(1));
        //                }

        //                return Ok("Sesion iniciada correctamente.");
        //            }
        //        }
        //        catch (SqlException sqlex)
        //        {
        //            return StatusCode(
        //                (int)HttpStatusCode.InternalServerError,
        //                new
        //                {
        //                    Message = "Error comunicandose con la base de datos, ver los registros para mas detalles.",
        //                    Errors = sqlex.Message
        //                });
        //        }
        //        catch (Exception ex)
        //        {
        //            return BadRequest(new
        //            {
        //                Message = "Un error ocurrio al iniciar sesion, ver los registros para mas detalles.",
        //                Errors = ex.Message
        //            });
        //        }
        //    }

        //    return BadRequest("Los datos ingresados no son correctos, por favor verificar e intentar nuevamente.");
        //}

        //[HttpPost]
        //[Route("logout")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Logout()
        //{
        //    try
        //    {
        //        await _signInManager.SignOutAsync();
        //    }
        //    catch (SqlException sqlex)
        //    {
        //        return StatusCode(
        //            (int)HttpStatusCode.InternalServerError,
        //            new
        //            {
        //                Message = "Error comunicandose con la base de datos, ver los registros para mas detalles.",
        //                Errors = sqlex.Message
        //            });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new
        //        {
        //            Message = "Un error ocurrio al finalizar sesion, ver los registros para mas detalles.",
        //            Errors = ex.Message
        //        });
        //    }

        //    return Ok("Sesion finalizada correctamente.");
        //}

        //public IActionResult ForgotPassword()
        //{
        //    return PartialView("_ForgotPassword");
        //}

        //public IActionResult ResetPassword(string id, string token)
        //{
        //    return View();
        //}

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> ConfirmEmail(string userId, string code)
        //{
        //    if (userId == null || code == null)
        //    {
        //        return RedirectToLocal(DefaultReturnUrl);
        //    }

        //    var user = await _userManager.FindByIdAsync(userId);
        //    if (user == null)
        //    {
        //        throw new ApplicationException("El usuario no existe.");
        //    }

        //    var result = await _userManager.ConfirmEmailAsync(user, code);
        //    return View(result.Succeeded ? "ConfirmEmail" : "Error");
        //}

        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult ResetPassword(string code = null)
        //{
        //    if (code == null)
        //    {
        //        throw new ApplicationException("El codigo es requerido para reiniciar la contraseña.");
        //    }

        //    var model = new ForgotPasswordViewModel { Code = code };
        //    return View(model);
        //}

        //private IActionResult RedirectToLocal(string returnUrl)
        //{
        //    if (Url.IsLocalUrl(returnUrl))
        //    {
        //        return Redirect(returnUrl);
        //    }
        //    else
        //    {
        //        return RedirectToAction(nameof(HomeController.Index));
        //    }
        //}
    }
}