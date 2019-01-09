using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace WebSitesMVCTemplate.Helpers
{
    public static class WebAPICaller
    {
        public static bool ConfirmEmailCall(string id, string token)
        {
            HttpClient client;
            string url = "https://localhost:44397";
            client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.PostAsync(string.Format("/api/accounts/confirm/email?id={0}&token={1}", id, token), null).Result;
            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            return false;
        }
    }
}
