using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using SignalRSelfHost.Dominio.Entidades;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.infra
{
    public interface IDuckhunterContext
    {
        int SaveChanges();

        DbSet<Partida> Partidas { get; set; }
    }
}
