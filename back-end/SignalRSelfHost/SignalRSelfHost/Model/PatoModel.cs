using SignalRSelfHost.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Model
{
    public class PatoModel
    {
        public int Id { get; set; }
        public Posicao Posicoes { get; set; }

        public PatoModel(int id, Posicao posicoes)
        {
            Id = id;
            Posicoes = posicoes;
        }
    }
}
