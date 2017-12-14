using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Dominio.Entidades
{
    public class Partida
    {
        public int Id { get; set; }
        public String NomeUsuario { get; set; }
        public int Pontos { get; set; }
        public int Nivel { get; set; }
        public DateTime Data { get; set; }

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
