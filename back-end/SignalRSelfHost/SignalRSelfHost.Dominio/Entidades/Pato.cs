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
            var t = Task.Run(() => geraPosicoesAleatorias());
            t.Wait();
            Vivo = true;
            Tipo = Tipos.COMUM;
        }
        //Cria pato tutorial
        public Pato(Posicao posicao)
        {
            Vivo = true;
            Tipo = Tipos.TUTORIAL;
            Posicoes.Add(posicao);
        }

        private void geraPosicoesAleatorias()
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

    }
}
