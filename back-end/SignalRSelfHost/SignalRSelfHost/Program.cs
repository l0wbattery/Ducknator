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
            string url = "http://192.168.15.179:8082";
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
        public void SendMessage(double bolaGamma, double bolaAlpha)
        {
            retornoGamma = (int)Math.Round(bolaGamma * 10);
            retornoAlpha = (int)Math.Round(bolaAlpha * 10);

            LimitaMovimentoDaMira(retornoGamma, retornoAlpha);

            Clients.All.messageAdded(retornoGamma, retornoAlpha, tiros);
        }
        public void Atirar(double bolaGamma, double bolaAlpha)
        {
            tiros++;
            retornoGamma = (int)Math.Round(bolaGamma * 10);
            retornoAlpha = (int)Math.Round(bolaAlpha * 10);

            LimitaMovimentoDaMira(retornoGamma, retornoAlpha);

            Clients.All.messageAdded(retornoGamma, retornoAlpha, tiros);
        }

        //Cria limites de movimento da mira;
        private void LimitaMovimentoDaMira(int Gamma, int Alpha)
        {
            if (Gamma > 800) retornoGamma = 800;
            if (Alpha > 600) retornoAlpha = 600;
            if (Gamma < 0) retornoGamma = 0;
            if (Alpha < 0) retornoAlpha = 0;
        }

    }
}