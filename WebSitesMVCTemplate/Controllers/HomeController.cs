﻿using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebSitesMVCTemplate.Models;

namespace WebSitesMVCTemplate.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "TituloPorDefecto";
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}