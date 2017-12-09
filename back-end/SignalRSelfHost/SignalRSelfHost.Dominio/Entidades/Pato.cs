using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class Pato
    {
        public List<Posicao> Posicoes { get; private set; }
        public Tipos Tipo { get; private set; }
        public bool Vivo { get; private set; }

        public Pato()
        {

        }

        public List<Posicao> GeraLista()
        {
            List<Posicao> retorno = new List<Posicao>();
            for (int i = 0; i< 5; i++)
            {
                Posicao posicao = new Posicao();
                retorno.Add(posicao);
            }

            return retorno;
        } 

    }
}
