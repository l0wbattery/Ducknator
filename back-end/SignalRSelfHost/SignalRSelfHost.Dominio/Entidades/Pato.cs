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
        public Tipos Tipo { get; set; }
        public bool Vivo { get; set; }
        public Pato()
        {
            var t = Task.Run(() => GeraPosicoesAleatorias());
            t.Wait();
            Vivo = true;
            Tipo = GeraTipoPato();
        }
        //Cria pato tutorial
        public Pato(Posicao posicao)
        {
            Vivo = true;
            Tipo = Tipos.TUTORIAL;
            Posicoes.Add(posicao);
        }

        private void GeraPosicoesAleatorias()
        {
            //limbo
            Posicoes.Add(new Posicao(500, 550));
            //posicao inicial
            Posicoes.Add(new Posicao(500, 550));
            int contador = 0;
            while (contador <= 5)
            {
                Posicoes.Add(new Posicao(r.Next(20, 690), r.Next(20,375)));
                contador++;
            }
            //posicao final
            Posicoes.Add(new Posicao(500, -100));
        }

        private Tipos GeraTipoPato()
        {
            var chance = r.NextDouble();

            if (chance <= 0.75)
            {
                return Tipos.COMUM;
            }
            else if (chance > 0.75 && chance <= 0.95)
            {
                return Tipos.RARO;
            }
            else
            {
                return Tipos.LENDARIO;
            }

        }

    }
}
