using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SignalRSelfHost.Dominio.Entidades;
using SignalRSelfHost.infra.Mappings;

namespace SignalRSelfHost.infra
{
    public class DuckhunterContext : DbContext, IDuckhunterContext
    {
        public DuckhunterContext() : this("name=duckhunter") { }

        public DuckhunterContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Partida> Partidas { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new PartidaMapping());
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
