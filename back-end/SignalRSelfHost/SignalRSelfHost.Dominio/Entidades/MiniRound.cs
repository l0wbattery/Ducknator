using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class MiniRound
    {
        public List<Pato> Patos { get; private set; }
        public int Posicoes { get; private set; }

        public void GetNextPosition()
        {
            if (Posicoes < Patos[0].Posicoes.Count)
            {
                Posicoes++;
            }
        }
        public int getPosicoes()
        {
            return Posicoes;
        }
        public MiniRound()
        {
            Patos = new List<Pato>();
            Posicoes = 0;
            for (int i = 0; i < 2; i++)
                Patos.Add(new Pato());
        }

    }
}
