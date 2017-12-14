using System;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Hosting;
using Owin;
using Microsoft.Owin.Cors;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Generic;
using System.Timers;

namespace SignalRSelfHost
{
    public class Program
    {
        public static int int2 = 0;
        static void Main(string[] args)
        {
            // This will *ONLY* bind to localhost, if you want to bind to all addresses
            // use http://*:8080 to bind to all addresses. 
            // See http://msdn.microsoft.com/en-us/library/system.net.httplistener.aspx 
            // for more information.

<<<<<<< HEAD
            string url = "http://10.99.198.115:8081";
=======
            string url = "http://10.99.30.61:8080";
>>>>>>> a2ad82fab8a9f63e2f5af8b0b3e2cfb533f7ab5e


            using (WebApp.Start(url))
            {
                Console.WriteLine("Server running on {0}", url);
                Console.ReadLine();
            }
            
        }
       
    }

    
   
}