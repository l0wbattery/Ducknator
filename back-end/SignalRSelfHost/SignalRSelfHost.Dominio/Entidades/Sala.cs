using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class Sala
    {
        public int Id { get; private set; }
        public String Token { get; private set; }
        public String NomeUsuario { get; set; }
        public List<String> IdsUsuarios { get; private set; }
        public int Pontos { get; private set; }
        public int Nivel { get; private set; }
        public MiniRound MiniRoundAtual { get; private set; }
        public Round RoundAtual { get; private set; }

        public void NextRound()
        {
            RoundAtual = new Round();
        }
        public void NextMiniRound()
        {
            RoundAtual.NextMiniRound();
            MiniRoundAtual = RoundAtual.MiniRounds[RoundAtual.MiniRoundIterator-1];
        }

        public Sala(String token, String id)
        {
            Token = token;
            IdsUsuarios = new List<String>();
            IdsUsuarios.Add(id);
            Pontos = 0;
            Nivel = 0;
            RoundAtual = new Round();
        }
        
    }
}
