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
            string url = "http://192.168.15.179:8081";
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
        private static int tiros = 0;
        public void SendMessage(double bolaGamma, double bolaAlpha)
        {
            int retornoGamma = (int)Math.Round(bolaGamma * 10);
            int retornoAlpha = (int)Math.Round(bolaAlpha * 10);
            Clients.All.messageAdded(retornoGamma, retornoAlpha, tiros);
        }
        public void Atirar(double bolaGamma, double bolaAlpha)
        {
            tiros++;
            int retornoGamma = (int)Math.Round(bolaGamma * 10);
            int retornoAlpha = (int)Math.Round(bolaAlpha * 10);
            Clients.All.messageAdded(retornoGamma, retornoAlpha, tiros);
        }
    }
}