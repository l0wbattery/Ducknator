using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalRSelfHost.Dominio.Entidades;
using SignalRSelfHost.infra;
using SignalRSelfHost.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace SignalRSelfHost
{
    [HubName("HubMessage")]
    public class MyHub : Hub
    {
        private static int tiros = 0;

        public static int PontuacaoTotal = 0;
        public static List<Sala> Salas = new List<Sala>();

        private IDuckhunterContext context;

        public MyHub(IDuckhunterContext context) : base()
        {
            this.context = context;
        }

        public MyHub() : base()
        {

        }

        public override Task OnConnected()
        {
            Clients.Caller.isConnect(true);
            return base.OnConnected();
        }

        public void SendMessage(double bolaGamma, double bolaAlpha, String token)
        {
            if (token == null)
                return;
            var sala = Salas.Where(x => x.Token == token).FirstOrDefault();
            if (sala == null)
                return;
            var index = Salas.IndexOf(sala);
            Salas[index].xBola = Salas[index].xBola + ((int)Math.Round(bolaGamma * 30) * -1);
            Salas[index].yBola = Salas[index].yBola + ((int)Math.Round(bolaAlpha * 30) * -1);
            Salas[index].LimitaMovimentoDaMira();
            Clients.Group(token).messageAdded(Salas[index].xBola, Salas[index].yBola, tiros);

        }

        public void Atirar(String token)
        {
            if (token == null)
                return;
            var sala = Salas.Where(x => x.Token == token).FirstOrDefault();
            if (sala == null)
                return;
            var index = Salas.IndexOf(sala);
            bool acertou = false;
            tiros++;

            if (Salas[index].MiniRoundAtual != null)
            {
                var count = 0;
                foreach (Pato pato in Salas[index].MiniRoundAtual.Patos)
                {
                    var yPato = pato.Posicoes[Salas[index].MiniRoundAtual.getPosicoes()].PosicaoY;
                    var xPato = pato.Posicoes[Salas[index].MiniRoundAtual.getPosicoes()].PosicaoX;

                    if (Between(Salas[index].yBola, yPato - 20, yPato + 20) && Between(Salas[index].xBola, xPato - 20, xPato + 20) && pato.Vivo)
                    {
                        Salas[index].MiniRoundAtual.Patos[count].Vivo = false;
                        Salas[index].RoundAtual.QntdPatosMortos++;
                        acertou = true;
                    }
                    count++;

                }
                //variaveis de posicao
            }

            Clients.Group(token).atirou(acertou);
        }

        public void FimDeJogo(String token)
        {
            //implementar
        }

        public void RodaRound(String token)
        {
            var salaAtual = Salas.Where(x => x.Token == token).FirstOrDefault();
            if (salaAtual == null)
                return;
            var index = Salas.IndexOf(salaAtual);
            Salas[index].NextRound();

            for (int i = 0; i < Salas[index].RoundAtual.MiniRounds.Count; i++)
                RodaPatosMiniRound(i, token, index);

            /*if (Salas[index].RoundAtual.QntdPatosMortos < 5)
                FimDeJogo(token);*/

            Clients.Group(token).pontuacao(PontuacaoTotal);
        }

        public void RodaPatosMiniRound(int i, String token, int index)
        {
            Salas[index].MiniRoundAtual = Salas[index].RoundAtual.MiniRounds[i];
            Timer aTimer = new Timer();
            aTimer.Elapsed += (sender, e) => TrocaPosicaoPatos(sender, e, token, index);
            aTimer.Interval = 2000;
            aTimer.Enabled = true;
            while (Salas[index].MiniRoundAtual.getPosicoes() < 5) ;
            aTimer.Close();

        }

        //Troca as posicoes dos patos
        private void TrocaPosicaoPatos(object source, ElapsedEventArgs e, String token, int index)
        {
            Salas[index].MiniRoundAtual.GetNextPosition();

            TrocaPosicaoPato(token, index);
        }

        public void TrocaPosicaoPato(String token, int index)
        {
            var count = 0;
            List<PatoModel> patos = new List<PatoModel>();
            foreach (Pato pato in Salas[index].MiniRoundAtual.Patos)
            {
                if (pato.Vivo)
                {
                    patos.Add(new PatoModel(count, pato.Posicoes[Salas[index].MiniRoundAtual.getPosicoes()]));
                }
                count++;
            }
            Clients.Group(token).patos(patos);
        }


        //faz validção se um numero se encontra dentro dos limites passados
        public bool Between(int num, int lower, int upper, bool inclusive = false)
        {
            return inclusive
                ? lower <= num && num <= upper
                : lower < num && num < upper;
        }

        public Task EnviaToken(String token)
        {
            var sala = Salas.Where(x => x.Token == token).FirstOrDefault();
            if (sala == null)
                return null;
            var index = Salas.IndexOf(sala);

            Salas[index].IdsUsuarios.Add(Context.ConnectionId);
            //editar lista q já existe
            var v = Task.Run(() => Clients.Caller.redirectMobile(true));
            v.Wait();
            var t = Task.Run(() => Clients.OthersInGroup(token).redirectNome(true));
            t.Wait();

            return Groups.Add(Context.ConnectionId, token.ToString());
        }

        //Método que retorna um token aleatório entre 0 e 8999
        public Task GenerateToken()
        {
            Random rand = new Random();
            var result = "";
            result = rand.Next(8999).ToString().PadLeft(4, '0');
            Clients.Caller.token(result);
            Salas.Add(new Sala(result, Context.ConnectionId));
            return Groups.Add(Context.ConnectionId, result);
        }

        public void EnviaNick(String nick, String token)
        {
            var sala = Salas.Where(x => x.Token == token).FirstOrDefault();
            if (sala == null)
                return;
            if (nick == null)
                nick = "";

            var index = Salas.IndexOf(sala);
            Salas[index].NomeUsuario = nick;
            Clients.Caller.redirectGame(true);

        }

        public void SalvaPartida(String nome, int pontos, int nivel)
        {
            context.Partidas.Add(new Partida(nome, pontos, nivel));
            context.SaveChanges();
        }
        
        //retorna o ranking geral
        public List<Partida> GetRankingTotal()
        {
            return context.Partidas
                .OrderByDescending(partida => partida.Pontos)
                .ToList();
        }

        //retorna o ranking mensal ou diario
        public List<Partida> GetRankingCOmFiltro(int parametro)
        {
            string formato;

            if (parametro == 1)
                //filtra por mes
                formato = "MM/yyyy";
            else
                //filtra por dia
                formato = "dd/MM/yyyy";

            string dataAtual = DateTime.Now.Date.ToString(formato);

            return context.Partidas
                .Where(partida => partida.Data.Date.ToString(formato).Equals(dataAtual))
                .OrderByDescending(partida => partida.Pontos)
                .ToList();
        }

    }
}