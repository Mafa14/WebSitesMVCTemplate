using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace WebSitesMVCTemplate
{
    public class Startup
    {
        private IServiceCollection _services;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        //public void ConfigureProductionServices(IServiceCollection services)
        //{
        //    services.AddDbContext<DataContext>(c => c.UseSqlServer(Configuration.GetConnectionString("DataConnection")));
        //    services.AddDbContext<IdentityContext>(i => i.UseSqlServer(Configuration.GetConnectionString("IdentityConnection")));
        //    ConfigureServices(services);
        //}

        //public void ConfigureDevelopmentServices(IServiceCollection services)
        //{
        //    ConfigureProductionServices(services);
        //}

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddIdentity<ApplicationUser, IdentityRole>()
            //    .AddEntityFrameworkStores<IdentityContext>()
            //    .AddDefaultTokenProviders();

            //services.ConfigureApplicationCookie(options =>
            //{
            //    options.Cookie.HttpOnly = true;
            //    options.ExpireTimeSpan = TimeSpan.FromHours(1);
            //    options.LoginPath = "/Account/Login";
            //    options.LogoutPath = "/Account/Logout";
            //    options.Cookie = new CookieBuilder
            //    {
            //        IsEssential = true // required for auth to work without explicit user consent; adjust to suit your privacy policy
            //    };
            //});

            //services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            //services.AddScoped(typeof(IAsyncRepository<>), typeof(Repository<>));
            //services.AddScoped(typeof(IAppLogger<>), typeof(AppLogger<>));
            //services.AddTransient<IEmailSender, EmailSender>();

            services.AddMemoryCache();
            
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            _services = services;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //ListAllRegisteredServices(app);
                //app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        //private void ListAllRegisteredServices(IApplicationBuilder app)
        //{
        //    app.Map("/allservices", builder => builder.Run(async context =>
        //    {
        //        var sb = new StringBuilder();
        //        sb.Append("<h1>All Services</h1>");
        //        sb.Append("<table><thead>");
        //        sb.Append("<tr><th>Type</th><th>Lifetime</th><th>Instance</th></tr>");
        //        sb.Append("</thead><tbody>");
        //        foreach (var svc in _services)
        //        {
        //            sb.Append("<tr>");
        //            sb.Append($"<td>{svc.ServiceType.FullName}</td>");
        //            sb.Append($"<td>{svc.Lifetime}</td>");
        //            sb.Append($"<td>{svc.ImplementationType?.FullName}</td>");
        //            sb.Append("</tr>");
        //        }
        //        sb.Append("</tbody></table>");
        //        await context.Response.WriteAsync(sb.ToString());
        //    }));
        //}
    }
}
