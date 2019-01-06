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

            var response = client.GetAsync(string.Format("/api/accounts/confirm/email")).Result;
            if (response.IsSuccessStatusCode)
            {
                string responseString = response.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<bool>(responseString);
            }

            return false;
        }
    }
}
