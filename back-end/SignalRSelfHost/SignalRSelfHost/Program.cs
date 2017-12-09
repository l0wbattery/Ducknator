using System;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Hosting;
using Owin;
using Microsoft.Owin.Cors;
using Microsoft.AspNet.SignalR.Hubs;

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

            string url = "http://192.168.0.100:8080";
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

    }
}