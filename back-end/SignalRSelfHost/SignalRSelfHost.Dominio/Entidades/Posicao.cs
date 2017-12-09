using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class Posicao
    {
        public int PosicaoX { get; private set; }
        public int PosicaoY { get; private set; }

        public Posicao()
        {
            Random rnd = new Random();
            PosicaoX = rnd.Next(0, 801);
            PosicaoY = rnd.Next(0, 601);

        }

    }
}
