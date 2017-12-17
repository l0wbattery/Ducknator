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
        private const int yPatoConst = 31;
        private const int xPatoConst = 43;
        private static int tiros = 0;

        public static List<Sala> Salas = new List<Sala>();

        private IDuckhunterContext context = new DuckhunterContext();

        public MyHub() : base()
        {

        }

        private Sala getSalaAtual(String token)
        {
            try
            {
                return Salas.Where(x => x.Token.Equals(token)).FirstOrDefault();
            }
            catch (Exception e)
            {
                return null;
            }
            
        }

        public override Task OnConnected()
        {
            Clients.Caller.isConnect(true);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var sala = Salas.Where(x => x.IdsUsuarios.Contains(Context.ConnectionId)).FirstOrDefault();
            if (sala == null)
                return base.OnDisconnected(stopCalled);
            if (sala.IdsUsuarios.Count > 1)
            {
                FimDeJogo(sala.Token);
            }
            else
            {
                Salas.Remove(sala);
            }
            return base.OnDisconnected(stopCalled);
        }

        public void SendMessage(double bolaGamma, double bolaAlpha, String token, Boolean isChrome)
        {
            if (token == null)
            {
                return;
            }
            var sala = getSalaAtual(token);
            if (sala == null)
            {
                return;
            }

            var index = Salas.IndexOf(sala);
            if (isChrome)
            {
                Salas[index].xBola = Salas[index].xBola + ((int)Math.Round(bolaGamma * 20) * -1);
                Salas[index].yBola = Salas[index].yBola + ((int)Math.Round(bolaAlpha * 20) * -1);
            }
            else
            {
                Salas[index].xBola = Salas[index].xBola + ((int)Math.Round(bolaGamma / 3) * -1);
                Salas[index].yBola = Salas[index].yBola + ((int)Math.Round(bolaAlpha / 3) * -1);

            }
            Salas[index].LimitaMovimentoDaMira();
            Clients.Group(token).messageAdded(Salas[index].xBola, Salas[index].yBola, tiros);
        }

        public void Atirar(String token)
        {
            if (token == null)
                return;
            var sala = getSalaAtual(token);
            if (sala == null)
                return;
            var index = Salas.IndexOf(sala);
            bool acertou = false;
            tiros++;

            if (Salas[index].MiniRoundAtual != null || Salas[index].getEstadoTutorial())
            {
                if (Salas[index].getEstadoTutorial())
                {
                    var yPatoTutorial = 250;
                    var xPatoTutorial = 350;
                    if (Between(Salas[index].yBola, yPatoTutorial - yPatoConst, yPatoTutorial + yPatoConst) &&
                        Between(Salas[index].xBola, xPatoTutorial - xPatoConst, xPatoTutorial + xPatoConst) &&
                        Salas[index].patoTutorial.Vivo)
                    {
                        acertou = true;
                        Salas[index].finalizaTutorial();
                        Clients.Group(token).redirectGame(true);
                        Clients.Group(token).atirou(acertou, 0);
                    }
                }
                else
                {
                    var count = 0;
                    foreach (Pato pato in Salas[index].MiniRoundAtual.Patos)
                    {
                        var yPato = pato.Posicoes[Salas[index].MiniRoundAtual.getPosicoes()].PosicaoY;
                        var xPato = pato.Posicoes[Salas[index].MiniRoundAtual.getPosicoes()].PosicaoX;

                        if (Between(Salas[index].yBola, yPato - yPatoConst, yPato + yPatoConst) && Between(Salas[index].xBola, xPato - xPatoConst, xPato + xPatoConst) && pato.Vivo)
                        {
                            Salas[index].MiniRoundAtual.Patos[count].Vivo = false;
                            Salas[index].RoundAtual.QntdPatosMortos++;
                            Salas[index].Pontos += 1500 * (int)pato.Tipo;
                            acertou = true;
                            var patoModel = new PatoModel(count, null, false, pato.Tipo);
                            Clients.Group(token).patoMorreu(patoModel);
                            Clients.Group(token).patosMortos(Salas[index].RoundAtual.QntdPatosMortos);
                            Clients.Group(token).scoreIndividual(Salas[index].Pontos);
                            Clients.Group(token).atirou(acertou, count);
                        }
                        count++;
                    }
                }

            }
        }

        public void FimDeJogo(String token)
        {
            var salaAtual = getSalaAtual(token);
            if (salaAtual == null)
                return;
            SalvaPartida(salaAtual.NomeUsuario, salaAtual.Pontos, salaAtual.Nivel);
            Clients.Group(token).redirectEndGame(true);
            Salas.Remove(salaAtual);
        }

        public void RodaTutorial(String token)
        {
            var salaAtual = getSalaAtual(token);
            if (salaAtual == null)
            {
                return;
            }
            var index = Salas.IndexOf(salaAtual);

            IniciaTutorial(token, index);
        }

        public void RodaRound(String token)
        {
            var salaAtual = getSalaAtual(token);
            if (salaAtual == null)
            {
                return;
            }
            var index = Salas.IndexOf(salaAtual);
            try
            {
                Salas[index].NextRound();
                Clients.Group(token).patosMortos(Salas[index].RoundAtual.QntdPatosMortos);
                Clients.Group(token).roundAtual(Salas[index].Nivel);
                for (int i = 0; i < Salas[index].RoundAtual.MiniRounds.Count; i++)
                {
                    RodaPatosMiniRound(i, token, index);
                }
                
                if (Salas[index].RoundAtual.QntdPatosMortos < 5)
                {
                    FimDeJogo(token);
                }
                Clients.Group(token).fimDeRound(Salas[index].Nivel);
            }
            catch (Exception e)
            {
                return;
            }
        }
        public void RodaPatosMiniRound(int i, String token, int index)
        {
            try
            {
                Salas[index].MiniRoundAtual = Salas[index].RoundAtual.MiniRounds[i];
                Timer aTimer = new Timer();
                aTimer.Elapsed += (sender, e) => TrocaPosicaoPatos(sender, e, token, index);
                aTimer.Interval = Dificuldade(index);
                aTimer.Enabled = true;
                while (Salas[index].MiniRoundAtual.getPosicoes() < 8 && PatosVivos(index, token)) ;
                AtualizaLeaderBoard();
                Clients.Group(token).acabouMiniRound();
                SobeCachorro(token, index);
                aTimer.Close();
            }
            catch (Exception e)
            {

            }

        }
        private int Dificuldade(int index)
        {
            int nivel = Salas[index].Nivel;
            int retorno = 4000 - (300 * nivel);
            if (retorno < 1000)
            {
                retorno = 1000;
            }
            return retorno;
        }

        public void IniciaTutorial(String token, int index)
        {
            Clients.Group(token).criarPatoTutorial(new Pato(new Posicao(350, 250)));
        }

        //metodo para subir o cachorro de acordo com a quantidade de patos
        private void SobeCachorro(String token, int index)
        {
            try
            {
                if (!PatosVivos(index, token))
                {
                    Clients.Group(token).sobeCachorro(2);
                }
                else
                {
                    if (Salas[index].MiniRoundAtual.Patos.Where(x => x.Vivo == true).Count() == 1)
                    {
                        Clients.Group(token).sobeCachorro(1);
                    }
                    else
                    {
                        Clients.Group(token).sobeCachorro(0);
                    }
                }
            }
            catch(Exception e)
            {
                return;
            }
        }

        //verifica se ainda ha patos vivos no round
        private bool PatosVivos(int index, String token)
        {
            try
            {
                foreach (Pato pato in Salas[index].MiniRoundAtual.Patos)
                {
                    if (pato.Vivo)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch(Exception e)
            {

            }
            return false;
        }

        //Troca as posicoes dos patos
        private void TrocaPosicaoPatos(object source, ElapsedEventArgs e, String token, int index)
        {
            try
            {
                Salas[index].MiniRoundAtual.GetNextPosition();

                var count = 0;
                List<PatoModel> patos = new List<PatoModel>();
                foreach (Pato pato in Salas[index].MiniRoundAtual.Patos)
                {
                    if (pato.Vivo)
                    {
                        patos.Add(new PatoModel(count, pato.Posicoes[Salas[index].MiniRoundAtual.getPosicoes()], true, pato.Tipo));
                    }
                    else
                    {
                        patos.Add(new PatoModel(count, pato.Posicoes[Salas[index].MiniRoundAtual.getPosicoes()], false, pato.Tipo));
                    }
                    count++;
                }
                Clients.Group(token).patos(patos);
            }
            catch(Exception f)
            {

            }
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
            var sala = getSalaAtual(token);
            if (sala == null)
            {
                return null;
            }
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
            var result = GeraToken(rand);

            while (Salas.Where(x => x.Token == result).FirstOrDefault() != null)
            {
                result = GeraToken(rand);
            }

            Clients.Caller.token(result);
            Salas.Add(new Sala(result, Context.ConnectionId));
            return Groups.Add(Context.ConnectionId, result);
        }

        public String GeraToken(Random rand)
        {
            return rand.Next(8999).ToString().PadLeft(4, '0');
        }

        public void EnviaNick(String nick, String token)
        {
            var sala = getSalaAtual(token);
            if (sala == null)
            {
                return;
            }
            if (nick == null)
            {
                nick = "";
            }
            var index = Salas.IndexOf(sala);
            Salas[index].NomeUsuario = nick;
            Clients.Caller.redirectTutorial(true);
        }

        public void SalvaPartida(String nome, int pontos, int nivel)
        {
            Partida partidaAdd = new Partida(nome, pontos, nivel);
            context.Partidas.Add(partidaAdd);
            context.SaveChanges();
        }

        //retorna o ranking geral
        public void GetRankingTotal()
        {
            var lista = context.Partidas
                .OrderByDescending(partida => partida.Pontos)
                .ToList();

            Clients.All.rankingTotal(lista);
        }

        public void AtualizaLeaderBoard()
        {
            List<LeaderBoardModel> leader = new List<LeaderBoardModel>();
            foreach (Sala sala in Salas)
            {
                leader.Add(new LeaderBoardModel(sala.NomeUsuario, sala.Pontos));
            }
            leader = leader.OrderByDescending(x => x.Pontos).Take(10).ToList();
            Clients.All.leaderBoard(leader);
        }

        //retorna o ranking mensal ou diario
        public void GetRankingComFiltro(int parametro)
        {
            string formato;

            if (parametro == 1)
            {
                //filtra por mes
                formato = "MM/yyyy";
            }
            else
            {
                //filtra por dia
                formato = "dd/MM/yyyy";
            }

            string dataAtual = DateTime.Now.Date.ToString(formato);
            List<Partida> resultado = new List<Partida>();
            var partidas =  context.Partidas.ToList();
            foreach (var partida in partidas)
            {
                string dataPartida = partida.Data.ToString(formato);
                if (dataPartida.Equals(dataAtual))
                    resultado.Add(partida);
            }

            if(parametro == 1)
                Clients.All.rankingPorMes(resultado);
            else
                Clients.All.rankingPorDia(resultado);
        }


    }
}