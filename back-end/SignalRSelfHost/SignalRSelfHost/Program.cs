using System;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Hosting;
using Owin;
using Microsoft.Owin.Cors;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Generic;

namespace SignalRSelfHost
{
    class Program
    {
        static void Main(string[] args)
        {
            // This will *ONLY* bind to localhost, if you want to bind to all addresses
            // use http://*:8080 to bind to all addresses. 
            // See http://msdn.microsoft.com/en-us/library/system.net.httplistener.aspx 
            // for more information.

            string url = "http://192.168.0.13:8080";
            using (WebApp.Start(url))
            {
                Console.WriteLine("Server running on {0}", url);
                Console.ReadLine();
            }
        }
    }
    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR();
        }
    }
    [HubName("HubMessage")]
    public class MyHub : Hub
    {
        int retornoGamma;
        int retornoAlpha;

        private static int tiros = 0;
        private static int yBola = 300;
        private static int xBola = 300;
        public void SendMessage(double bolaGamma, double bolaAlpha)
        {
            xBola = xBola + ((int)Math.Round(bolaGamma * 10) * -1);
            yBola = yBola + ((int)Math.Round(bolaAlpha * 10) * -1);
            if (xBola > 800)
            {
                xBola = 800;
            }
            if(xBola < 0)
            {
                xBola = 0;
            }
            if (yBola > 600)
            {
                yBola = 600;
            }
            if (yBola < 0)
            {
                yBola = 0;
            }

            Clients.All.messageAdded(xBola, yBola, tiros);
        }
        public void Atirar(int posicaoPatoY,int posicaoPatoX)
        {
            bool acertou = false;
            tiros++;
            if (Between(yBola, posicaoPatoY - 20, posicaoPatoY + 20) && Between(xBola, posicaoPatoX - 20, posicaoPatoX + 20))
                acertou = true;
            
            Clients.All.atirou(acertou);
        }

        public bool Between(int num, int lower, int upper, bool inclusive = false)
        {
            return inclusive
                ? lower <= num && num <= upper
                : lower < num && num < upper;
        }

        //Cria limites de movimento da mira;
        // Não estou usando ainda, porem irei utilizar
        private void LimitaMovimentoDaMira(int Gamma, int Alpha)
        {
            if (Gamma > 800) retornoGamma = 800;
            if (Alpha > 600) retornoAlpha = 600;
            if (Gamma < 0) retornoGamma = 0;
            if (Alpha < 0) retornoAlpha = 0;
        }

        //Método que retorna um token aleatório entre 0 e 8999
        //public Object GenerateToken()
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