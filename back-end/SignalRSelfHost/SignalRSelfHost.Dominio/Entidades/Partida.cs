using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class Partida
    {
        public int Id { get; private set; }
        public String NomeUsuario { get; private set; }
        public int Pontos { get; private set; }
        public int Nivel { get; private set; }
        public DateTime Data { get; private set; }

        public Partida()
        {

        }

        public Partida(string nomeUsuario, int pontos, int nivel)
        {
            NomeUsuario = nomeUsuario;
            Pontos = pontos;
            Nivel = nivel;
            Data = DateTime.Now;
        }


    }
}
