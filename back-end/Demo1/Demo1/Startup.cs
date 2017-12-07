using Demo1;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(SignalRChat.Startup))]
namespace SignalRChat
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Map("/signalr", map =>
            {
                //worry about locking it down to specific origin later
                map.UseCors(CorsOptions.AllowAll);
                
                map.RunSignalR(new HubConfiguration());
            });
            //now start the WebAPI app
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}