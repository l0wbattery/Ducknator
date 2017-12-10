using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class MiniRound
    {
        public Pato Pato1 { get; private set; }
        public Pato Pato2 { get; private set; }
        public int Posicoes { get; private set; }

        public void GetNextPosition()
        {
            Posicoes++;
        }
        public int getPosicoes()
        {
            return Posicoes;
        }
        public MiniRound()
        {
            Posicoes = 0;
            var t = Task.Run(() => Pato1 = new Pato());
            t.Wait();
            var r = Task.Run(() => Pato2 = new Pato());
            r.Wait();
        }

    }
}
