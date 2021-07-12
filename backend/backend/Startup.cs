using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using backend.models;
using Microsoft.IdentityModel.Tokens;


namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("*");
                        builder.WithMethods("POST", "PUT", "GET", "DELETE");
                        builder.WithHeaders("Content-Type", "Authorization");
                    });
            });

            services.AddDbContext<WishlistContext>(opt =>
                                               opt.UseInMemoryDatabase("wishlists"));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "backend", Version = "v1" });
            });
            
            services.AddAuthentication()
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = GetCognitoTokenValidationParams();
                });
        }
        
        private TokenValidationParameters GetCognitoTokenValidationParams()
        {
            var cognitoIssuer = $"https://cognito-idp.{Configuration["region"]}.amazonaws.com/{Configuration["userPoolId"]}";
            var jwtKeySetUrl = $"{cognitoIssuer}/.well-known/jwks.json";
            var cognitoAudience = Configuration["appClientId"];

            return new TokenValidationParameters
            {
                IssuerSigningKeyResolver = (s, securityToken, identifier, parameters) =>
                {
                    var json = new WebClient().DownloadString(jwtKeySetUrl);
                    return new JsonWebKeySet(json).GetSigningKeys();
                },
                ValidIssuer = cognitoIssuer,
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateLifetime = true,
                ValidateAudience = false
                // ValidAudience = cognitoAudience
            };
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "backend v1"));
            }

            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
