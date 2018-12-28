using Microsoft.AspNetCore.Http;
using System;

namespace WebSitesMVCTemplate.Helpers
{
    public static class CookiesManager
    {
        public static string GetCookie(HttpContext context, string cookieKey)
        {
            if (context.Request.Cookies.ContainsKey(cookieKey))
            {
                return context.Request.Cookies[cookieKey];
            }

            return null;
        }

        public static bool SetCookie(HttpContext context, string cookieKey, string cookieValue, DateTime cookieExpirationTime)
        {
            if (context.Request.Cookies.ContainsKey(cookieKey))
            {
                CookieOptions option = new CookieOptions();
                option.Expires = cookieExpirationTime;

                context.Response.Cookies.Append(cookieKey, cookieValue, option);
                return true;
            }

            return false;
        }

        public static void RemoveCookie(HttpContext context, string cookieKey)
        {
            context.Response.Cookies.Delete(cookieKey);
        }
    }
}
