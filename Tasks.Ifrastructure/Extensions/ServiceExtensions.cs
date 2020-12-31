﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tasks.Domain._Common.Interfaces;
using Tasks.Domain._Common.Security;
using Tasks.Domain.Developers.Repositories;
using Tasks.Domain.Developers.Services;
using Tasks.Ifrastructure._Common.Repositories;
using Tasks.Ifrastructure.Contexts;
using Tasks.Ifrastructure.Repositories.Developers;

namespace Tasks.Ifrastructure.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureDatabases(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<TasksContext>(
                options => options.UseMySql(configuration.GetConnectionString("Tasks"))
            );
        }

        public static void ConfigureTokenJwt(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration.GetSection("Token").Get<TokenConfiguration>());
        }

        public static void ConfigureServices(this IServiceCollection services) 
        {
            services.AddScoped<IAuthService, AuthService>();
        }   
        public static void ConfigureRepositories(this IServiceCollection services) 
        {
            services.AddScoped(typeof(IRepository<>), typeof(RepositoryBase<>));
            services.AddScoped<IDeveloperRepository, DeveloperRepository>();
        }
    }
}