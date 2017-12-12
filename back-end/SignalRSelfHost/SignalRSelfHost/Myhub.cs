using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalRSelfHost.Dominio.Entidades;
using SignalRSelfHost.infra;
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
        private static int yBola = 300;
        private static int xBola = 300;
        public static Round RoundAtual { get; private set; }
        public static MiniRound miniRoundAtual { get; private set; }
        public static int PontuacaoTotal = 0;
        public static List<Sala> Salas = new List<Sala>();
        public static Timer aTimer { get; private set; }

        private IDuckhunterContext context = new DuckhunterContext();

        public override Task OnConnected()
        {
            Clients.Caller.isConnect(true);
            return base.OnConnected();
        }

        public void SendMessage(double bolaGamma, double bolaAlpha, string token)
        {
            if (token == null)
                return;

            xBola = xBola + ((int)Math.Round(bolaGamma * 30) * -1);
            yBola = yBola + ((int)Math.Round(bolaAlpha * 30) * -1);
            LimitaMovimentoDaMira();
            Clients.Group(token).messageAdded(xBola, yBola, tiros);
            
        }
        public void Atirar(string token)
        {
            if (token == null)
                return;
            bool acertou = false;
            tiros++;

            if (miniRoundAtual != null)
            {
                //variaveis de posicao
                var yPato1 = miniRoundAtual.Pato1.Posicoes[miniRoundAtual.getPosicoes() - 1].PosicaoY;
                var xPato1 = miniRoundAtual.Pato1.Posicoes[miniRoundAtual.getPosicoes() - 1].PosicaoX;

                var yPato2 = miniRoundAtual.Pato2.Posicoes[miniRoundAtual.getPosicoes() - 1].PosicaoY;
                var xPato2 = miniRoundAtual.Pato2.Posicoes[miniRoundAtual.getPosicoes() - 1].PosicaoX;

                if (Between(yBola, yPato1 - 20, yPato1 + 20) && Between(xBola, xPato1 - 20, xPato1 + 20) && miniRoundAtual.Pato1.Vivo)
                {
                    miniRoundAtual.Pato1.Vivo = false;
                    acertou = true;
                }
                if (Between(yBola, yPato2 - 20, yPato2 + 20) && Between(xBola, xPato2 - 20, xPato2 + 20) && miniRoundAtual.Pato2.Vivo)
                {
                    miniRoundAtual.Pato2.Vivo = false;
                    acertou = true;
                }
            }

            Clients.Group(token).atirou(acertou);
        }

        public void RodaRound()
        {
            RoundAtual = new Round();

            for (int i = 0; i < RoundAtual.MiniRounds.Count; i++)
            {
                RodaPatosMiniRound(i);
            }
            PontuacaoTotal = RoundAtual.Pontuacao;
            Clients.All.pontuacao(PontuacaoTotal);
        }

        public void RodaPatosMiniRound(int i)
        {
            miniRoundAtual = RoundAtual.MiniRounds[i];
            aTimer = new Timer();
            aTimer.Elapsed += new ElapsedEventHandler(TrocaPosicaoPatos);
            aTimer.Interval = 1000;
            aTimer.Enabled = true;
            while (miniRoundAtual.getPosicoes() < 5) ;
            aTimer.Close();

        }

        // Specify what you want to happen when the Elapsed event is raised.
        private void TrocaPosicaoPatos(object source, ElapsedEventArgs e)
        {
            var v = Task.Run(() => miniRoundAtual.GetNextPosition());
            v.Wait();
            var t = Task.Run(() => TrocaPosicaoPato1());
            t.Wait();
            var u = Task.Run(() => TrocaPosicaoPato2());
            u.Wait();
        }

        public async void TrocaPosicaoPato1()
        {
            if (miniRoundAtual.Pato1.Vivo)
            {
                await Clients.All.pato1(miniRoundAtual.Pato1.Posicoes[miniRoundAtual.getPosicoes()]);
                await Clients.All.pato1vivo(true);
            }
            else
                await Clients.All.pato1vivo(false);

        }
        public async void TrocaPosicaoPato2()
        {
            if (miniRoundAtual.Pato2.Vivo)
            {
                await Clients.All.pato2(miniRoundAtual.Pato2.Posicoes[miniRoundAtual.getPosicoes()]);
                await Clients.All.pato2vivo(true);
            }
            else
                await Clients.All.pato2vivo(false);
        }

        //faz validção se um numero se encontra dentro dos limites passados
        public bool Between(int num, int lower, int upper, bool inclusive = false)
        {
            return inclusive
                ? lower <= num && num <= upper
                : lower < num && num < upper;
        }

        //Cria limites de movimento da mira;
        private void LimitaMovimentoDaMira()
        {
            if (xBola > 800) xBola = 800;
            if (yBola > 600) yBola = 600;
            if (xBola < 0) xBola = 0;
            if (yBola < 0) yBola = 0;
        }
        public Task EnviaToken(String token)
        {
            
            if (Salas.Where(x => x.Token == token).FirstOrDefault() != null )
            {
                //editar lista q já existe. seila como
                Clients.Caller.redirectMobile(true);
                return Groups.Add(Context.ConnectionId, token.ToString());
            }
            return null;
        }

        //Método que retorna um token aleatório entre 0 e 8999
        public Task GenerateToken()
        {
            Random rand = new Random();
            var result = "";
            result = rand.Next(8999).ToString().PadLeft(4, '0');
            Clients.All.token(result);
            Salas.Add(new Sala(result, Context.ConnectionId));
            return Groups.Add(Context.ConnectionId, result);
        }

    }
}