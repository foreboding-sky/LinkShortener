using InforceTestingApp.Data;
using Microsoft.EntityFrameworkCore;
using InforceTestingApp.Data;
using InforceTestingApp.Models;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using FluentValidation;
using InforceTestingApp.Filters;
using InforceTestingApp.Profiles;
using System.Reflection;
using AutoMapper;
using InforceTestingApp.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllersWithViews(options => options.Filters.Add(new ValidationFilter()));

builder.Services.AddMvc(
       options =>
       {
           options.EnableEndpointRouting = false;
           options.Filters.Add(new ValidationFilter());
       });

builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;

                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -._@+";

                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 5;
                options.Password.RequiredUniqueChars = 1;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            }
            ).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

var jwtSection = builder.Configuration.GetSection("JwtBearerTokenSettings");
builder.Services.Configure<JwtBearerTokenSettings>(jwtSection);
var jwtBearerTokenSettings = jwtSection.Get<JwtBearerTokenSettings>();
var key = Encoding.ASCII.GetBytes(jwtBearerTokenSettings.SecretKey);

builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = jwtBearerTokenSettings.Issuer,
                        ValidateAudience = true,
                        ValidAudience = jwtBearerTokenSettings.Audience,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql("Host=localhost;Port=5432;Database=InforceTestingAppDB;Username=postgres;Password=25112002"));
builder.Services.AddTransient<ILinksRepository, LinksRepository>();
builder.Services.AddTransient<LinkShortenerService>();
builder.Services.AddTransient<DbInitializer>();

builder.Services.AddControllers();
builder.Services.AddSpaStaticFiles(options => options.RootPath = "frontent/build");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSpaStaticFiles();

app.UseRouting();
//app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
           {
               endpoints.MapControllers();
           });

using (var scope = app.Services.CreateScope())
{
    var dbInitializer = scope.ServiceProvider.GetRequiredService<DbInitializer>();
    await dbInitializer.Populate();
}

app.UseSpa(spa =>
 {
     spa.Options.SourcePath = "frontend";
     if (builder.Environment.IsDevelopment())
     {
         spa.UseReactDevelopmentServer(npmScript: "start");
     }
 });

app.UseCors("AllowAll");

app.UseCors(builder =>
            builder
            .WithOrigins("https://localhost:5000", "http://localhost:3000", "http://localhost:5157")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
);

app.Run();