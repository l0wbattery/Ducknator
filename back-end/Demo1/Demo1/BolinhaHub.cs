using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Demo1
{
    [HubName("HubBolinha")]
    public class BolinhaHub : Hub
    {
        public void SendMessage(string x, string y)
        {
            Clients.All.messageAdded(x,y);
        }
    }
}