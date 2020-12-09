using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NyousApi_NoSql.Context;
using NyousApi_NoSql.Interfaces;
using NyousApi_NoSql.Repositories;

namespace NyousApi_NoSql
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
            // Pega as informa��es que est�o no appsettings e configura pra elas estarem nas propriedades do Contexto
            services.Configure<NyousDatabaseSettings>(
                    Configuration.GetSection("NyousDatabaseSettings")
                );
            // Faz a inje��o de depend�ncia
            // Voc� coloca a responsabilidade das classes externas na classe que est� chamando e n�o na classe chamada, ou seja, � uma invers�o de controles
            services.AddSingleton<INyousDatabaseSettings>(
                sp => sp.GetRequiredService<IOptions<NyousDatabaseSettings >> ().Value);

            // Fa�o a inje��o de depend�ncia do repositorio
            services.AddSingleton<IEventoRepository, EventoRepository>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
