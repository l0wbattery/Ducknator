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
        private static int PosicaoPatoTutorialEmX = 400;
        private static int PosicaoPatoTutorialEmY = 300;
        private static int tiros = 0;
        private static int yBola = 300;
        private static int xBola = 300;
        private Boolean tutorial = false;
        public static Round RoundAtual { get; private set; }
        public static MiniRound miniRoundAtual { get; private set; }
        public static int PontuacaoTotal = 0;
        public static List<Sala> Salas = new List<Sala>();
        public static Timer aTimer { get; private set; }
        public String Token { get; set; }

        private IDuckhunterContext context;

        public MyHub(IDuckhunterContext context) : base()
        {
            this.context = context;
        }

        public MyHub() : base ()
        {

        }

        public override Task OnConnected()
        {
            Clients.Caller.isConnect(true);
            return base.OnConnected();
        }

        public void IniciarTutorial()
        {
            //token
            //Clients.Group(token).messageAdded(xBola, yBola, tiros);
            tutorial = true;
            Clients.All.CriaPatoTutorial(PosicaoPatoTutorialEmX, PosicaoPatoTutorialEmY);
        }

        public void AtiraTutorial()
        {
            if (Between(yBola, PosicaoPatoTutorialEmY - 20, PosicaoPatoTutorialEmY + 20) &&
                Between(xBola, PosicaoPatoTutorialEmX - 20, PosicaoPatoTutorialEmX + 20)
                && tutorial == true)
            {

            }
        }


        public void SendMessage(double bolaGamma, double bolaAlpha, string token)
        {
            token = "10";
            if (token == null)
                return;

            xBola = xBola + ((int)Math.Round(bolaGamma * 30) * -1);
            yBola = yBola + ((int)Math.Round(bolaAlpha * 30) * -1);
            LimitaMovimentoDaMira();
            //
            Clients.All.messageAdded(xBola, yBola, tiros);
            //Clients.Group(token).messageAdded(xBola, yBola, tiros);
            
        }
        public void Atirar(string token)
        {
            token = "10";
            if (token == null)
                return;
            bool acertou = false;
            tiros++;

            if (miniRoundAtual != null)
            {
                var count = 0;
                foreach (Pato pato in miniRoundAtual.Patos)
                {
                    var yPato = pato.Posicoes[miniRoundAtual.getPosicoes() - 1].PosicaoY;
                    var xPato = pato.Posicoes[miniRoundAtual.getPosicoes() - 1].PosicaoX;
                    
                    foreach(Pato patoAlvo in miniRoundAtual.Patos)
                    {
                        if (Between(yBola, yPato - 20, yPato + 20) && Between(xBola, xPato - 20, xPato + 20) && patoAlvo.Vivo)
                        {
                            patoAlvo.Vivo = false;
                            acertou = true;
                        }
                        count++;
                    }
                }
                //variaveis de posicao
            }
            Clients.All.atirou(acertou);
            //Clients.Group(token).atirou(acertou);
        }

        public void RodaRound(String token)
        {
            RoundAtual = new Round();

            for (int i = 0; i < RoundAtual.MiniRounds.Count; i++)
            {
                RodaPatosMiniRound(i,token);
            }
            PontuacaoTotal = RoundAtual.Pontuacao;
            Clients.All.pontuacao(PontuacaoTotal);
        }

        public void RodaPatosMiniRound(int i,String token)
        {//(sender, args) => ElapsedEventHandler(sender, Index);

            Token = token;
            miniRoundAtual = RoundAtual.MiniRounds[i];
            aTimer = new Timer();
            aTimer.Elapsed += new ElapsedEventHandler(TrocaPosicaoPatos);
            aTimer.Interval = 1000;
            aTimer.Enabled = true;  
            while (miniRoundAtual.getPosicoes() < 5) ;
            aTimer.Close();

        }

        //Troca as posicoes dos patos
        private void TrocaPosicaoPatos(object source, ElapsedEventArgs e)
        {
            var v = Task.Run(() => miniRoundAtual.GetNextPosition());
            v.Wait();
            var t = Task.Run(() => TrocaPosicaoPato(Token));
            t.Wait();
        }

        public void TrocaPosicaoPato(String token)
        {
           var count = 0;
           List<PatoModel> patos = new List<PatoModel>();
           foreach(Pato pato in miniRoundAtual.Patos)
           {
                if (pato.Vivo)
                {
                    patos.Add(new PatoModel(count,pato.Posicoes[miniRoundAtual.getPosicoes()]));
                }
                count++;
           }

            //Clients.Group(token).patos(patos);
            Clients.All.patos(patos);
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
            Clients.All.token(result);
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
            var partida = new Partida(nome, pontos, nivel);

            if (partida == null)
                context.Partidas.Add(new Partida(nome, pontos, nivel));

            context.Partidas.Add(partida);
            context.SaveChanges();
        }

    }
}