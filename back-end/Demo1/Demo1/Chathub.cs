using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalRChat
{
    [HubName("HubMessage")]
    public class MyHub : Hub
    {
        public void SendMessage(string remetente, string destinatario, string message)
        {
            Clients.All.messageAdded(remetente, destinatario, message);
        }
    }
}