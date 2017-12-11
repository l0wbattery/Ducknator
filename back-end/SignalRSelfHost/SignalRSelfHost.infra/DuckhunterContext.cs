using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SignalRSelfHost.Dominio.Entidades;

namespace SignalRSelfHost.infra
{
    public class DuckhunterContext : DbContext, IDuckhunterContext
    {
        public DbSet<Sala> Salas { get ; set ; }
    }
}
