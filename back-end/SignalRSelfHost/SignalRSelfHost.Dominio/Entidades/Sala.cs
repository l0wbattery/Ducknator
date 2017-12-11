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
        public int Token { get; private set; }
        public String NomeUsuario { get; private set; }
        public DateTime Data { get; private set; }
        public int Pontos { get; private set; }
        public int Nivel { get; private set; }
        public int NumeroUsuarios { get; private set; }
        public bool isAtiva { get; private set; }

        public Sala()
        {

        }

        public Sala(int token)
        {
            this.Nivel = 1;
            this.Pontos = 0;
            this.Data = DateTime.Now;
            this.NomeUsuario = "Nickname";
            this.Token = Token;
            this.NumeroUsuarios = 1;
            this.isAtiva = true;
        }

        public void Update(String nome)
        {
            this.NomeUsuario = nome;
            this.NumeroUsuarios += 1;
        }

        public void LevelUp()
        {
            this.Nivel += 1;
        }

        public void Matei(int pontos)
        {
            this.Pontos += pontos;
        }

        public void ConexaoEncerrada()
        {
            this.isAtiva = false;
        }
    }
}
