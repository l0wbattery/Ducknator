using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SignalRSelfHost.Dominio.Entidades;
using System.Data.Entity.ModelConfiguration;


namespace SignalRSelfHost.infra.Mappings
{
    public class PartidaMapping : EntityTypeConfiguration<Partida>
    {
        public PartidaMapping()
        {
            ToTable("Partida", "dh");

            HasKey(x => x.Id);

            Property(x => x.NomeUsuario).HasMaxLength(128).IsRequired();

            Property(x => x.Pontos).IsRequired();

            Property(x => x.Nivel).IsRequired();

            Property(x => x.Data).IsRequired();
        }
    }
}
