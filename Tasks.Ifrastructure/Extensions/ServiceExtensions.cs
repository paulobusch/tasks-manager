﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tasks.Ifrastructure.Context;

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
    }
}
