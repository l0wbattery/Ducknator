using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class Sala
    {
        public bool EmTutorial { get; set; }
        public int Id { get; private set; }
        public String Token { get; private set; }
        public String NomeUsuario { get; set; }
        public List<String> IdsUsuarios { get; private set; }
        public int Pontos { get; set; }
        public int Nivel { get; private set; }
        public MiniRound MiniRoundAtual { get; set; }
        public Round RoundAtual { get; private set; }
        public Pato patoTutorial;
        public int yBola = 300;
        public int xBola = 300;

        public void NextRound()
        {
            RoundAtual = new Round();
            Nivel++;
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
            EmTutorial = true;
            patoTutorial = new Pato();
            patoTutorial.Tipo = Tipos.TUTORIAL;
        }

        //Cria limites de movimento da mira;
        public void LimitaMovimentoDaMira()
        {
            if (xBola > 800) xBola = 800;
            if (yBola > 600) yBola = 600;
            if (xBola < 0) xBola = 0;
            if (yBola < 0) yBola = 0;
        }

        public void finalizaTutorial()
        {
            patoTutorial.Vivo = false;
            EmTutorial = false;
        }

        public bool getEstadoTutorial()
        {
            return EmTutorial;
        }

    }
}
