using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalRSelfHost.Dominio.Entidades;
using System;
using System.Threading.Tasks;
using System.Timers;

namespace SignalRSelfHost
{
    [HubName("HubMessage")]
    public class MyHub : Hub
    {
        private int aux = 0;
        private static int tiros = 0;
        private static int yBola = 300;
        private static int xBola = 300;
        public static MiniRound miniRoundAtual { get; private set; }
        public static Timer aTimer { get; private set; }
        public async void SendMessage(double bolaGamma, double bolaAlpha)
        {
            xBola = xBola + ((int)Math.Round(bolaGamma * 10) * -1);
            yBola = yBola + ((int)Math.Round(bolaAlpha * 10) * -1);
            LimitaMovimentoDaMira();
            await Clients.All.messageAdded(xBola, yBola, tiros);
        }
        public void Atirar()
        {
            bool acertou = false;
            tiros++;
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


            Clients.All.atirou(acertou);
        }


        public void RodaPatosMiniRound()
        {
            miniRoundAtual = new MiniRound();
            aTimer = new Timer();
            aTimer.Elapsed += new ElapsedEventHandler(TrocaPosicaoPatos);
            aTimer.Interval = 5000;
            aTimer.Enabled = true;
         
              
        }

        // Specify what you want to happen when the Elapsed event is raised.
        private void TrocaPosicaoPatos(object source, ElapsedEventArgs e)
        {
            if (aux > 3)
            {
                aTimer.AutoReset = false;
            }
            var t = Task.Run(() => TrocaPosicaoPato1());
            t.Wait();
            var u = Task.Run(() => TrocaPosicaoPato2());
            u.Wait();
            var v = Task.Run(() => miniRoundAtual.GetNextPosition());
            v.Wait();
            this.aux++;
            
            
        }

        public async void TrocaPosicaoPato1()
        {
            await Clients.All.pato1(miniRoundAtual.Pato1.Posicoes[miniRoundAtual.getPosicoes()]);
        }
        public async void TrocaPosicaoPato2()
        {
             await Clients.All.pato2(miniRoundAtual.Pato2.Posicoes[miniRoundAtual.getPosicoes()]);
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

        //Método que retorna um token aleatório entre 0 e 8999
        //public Sala GenerateToken()
        //{
        //    Random rand = new Random();
        //    var result = "";
        //    while(context.Salas.map(x => x.getToken()).toList().toString.contains(result) = true)
        //    {                
        //        result = rand.Next(8999).ToString().PadLeft(4, '0');
        //    }

        //Cria uma sala para a pessoa
        //Sala sala = new Sala(Int32.Parse(result));

        //return sala;
        //    return null;
        //}

        //Método que recebe o token da pessoa e conecta ela em uma sala
        //public Object ReceberToken(int token)
        //{
        //faz um get nas salas livres (com 1 conexao)
        //List<Sala> salasLivres = xontext.Salas.where(x -> x.numeroParticipantes = 1).toList();
        //verificar se o token recebido é igual ao token de alguma

        //return salasLivres.Where(x => x.token.Equals(token)).firstOrDefault();
        //    return null;
        //}

    }
}
