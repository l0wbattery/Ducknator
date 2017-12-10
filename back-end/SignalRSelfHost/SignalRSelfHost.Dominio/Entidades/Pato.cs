using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class Pato
    {
        public static Random r = new Random();
        public List<Posicao> Posicoes = new List<Posicao>();
        public Tipos Tipo { get; private set; }
        public bool Vivo { get; private set; }
        public Pato()
        {
            var t = Task.Run(() => geraPosicoesAleatorias());
            t.Wait();
            Vivo = true;
        }

        private void geraPosicoesAleatorias()
        {
            
            int contador = 0;

            while (contador <= 5)
            {
                Posicoes.Add(new Posicao(r.Next(0, 801), r.Next(0,601)));
                contador++;
            }
        }

    }
}
