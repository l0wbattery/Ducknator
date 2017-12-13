using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRSelfHost.Model
{
    public class LeaderBoardModel
    {
        public String Nome { get; set; }
        public int Pontos { get; set; }
        public LeaderBoardModel(String nome, int pontos)
        {
            Nome = nome;
            Pontos = pontos;
        }
    }
}
