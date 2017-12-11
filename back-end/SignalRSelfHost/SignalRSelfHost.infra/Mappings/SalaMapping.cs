using SignalRSelfHost.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.infra.Mappings
{
    public class SalaMapping : EntityTypeConfiguration<Sala>
    {
        public SalaMapping()
        {
            ToTable("hanking", "dh");

            HasKey(x => x.Id);

            Property(x => x.NomeUsuario).HasMaxLength(128).IsRequired();

            Property(x => x.Token).IsRequired();

            Property(x => x.Pontos).IsRequired();

            Property(x => x.Nivel).IsRequired();
        }
    }
}
