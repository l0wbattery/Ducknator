using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SignalRSelfHost.infra;
using SignalRSelfHost;
using SignalRSelfHost.Dominio.Entidades;
using System.Linq;
using Microsoft.AspNet.SignalR.Hubs;
using System.Dynamic;
using Moq;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace DuckHunterControllerUnitTest.cs
{
    /// <summary>
    /// Summary description for UnitTestMyHub
    /// </summary>
    [TestClass]
    public class UnitTestMyHub
    {
        private IDuckhunterContext testContextInstance = new DuckhunterContext();
        private MyHub myHub = new MyHub();

        private void groupManagerSetup(Mock<IGroupManager> groupManagerMock, string connectionId)
        {
            var groupsJoined = new List<string>();
            groupManagerMock.Setup(g => g.Add(connectionId, It.IsAny<string>()))
                    .Returns(Task.FromResult<object>(null))
                    .Callback<string, string>((cid, groupToJoin) =>
                        groupsJoined.Add(groupToJoin));
        }

        private HubCallerContext criaContexto(string connectionId)
        {
            return new HubCallerContext(request: null,
                                         connectionId: connectionId);
        }

        [TestMethod]
        public void Deve_SalvarPartida_Corretamente()
        {
            var firstResult = testContextInstance.Partidas.ToList().Count();

            //equivalente ao método myHub.SalvaPartida("Bel", 5, 2);
            testContextInstance.Partidas.Add(new Partida("Bel", 20, 3));
            testContextInstance.SaveChanges();

            var finalResult = testContextInstance.Partidas.ToList().Count();

            Assert.IsTrue(firstResult < finalResult);

        }
        [TestMethod]
        public void Deve_RetornarRanking_Corretamente()
        {
            var result = testContextInstance.Partidas.OrderByDescending(x => x.Pontos).ToList();

            Assert.IsTrue(result[0].Pontos == 20);
        }
        [TestMethod]
        public void CriarSalaTest()
        {
            var groupManagerMock = new Mock<IGroupManager>();
            string connectionId = Guid.NewGuid().ToString();
            bool sendCalled = false;
            var mockClients = new Mock<IHubCallerConnectionContext<dynamic>>();
            myHub.Clients = mockClients.Object;
            myHub.Context = criaContexto(connectionId);
            myHub.Groups = groupManagerMock.Object;
            dynamic all = new ExpandoObject();
            string tokenSala = null;
            all.token = new Action<string>((token) =>
            {
                sendCalled = true;
                tokenSala = token;
            });
            mockClients.Setup(m => m.Caller).Returns((ExpandoObject)all);
            myHub.GenerateToken();
            Assert.IsTrue(sendCalled);
            Assert.IsNotNull(tokenSala);
        }
        [TestMethod]
        public void TestaGeradorToken()
        {
            var hub = new MyHub();
            string token = hub.GeraToken(new Random());
            Assert.AreEqual(4, token.Length);
        }
        [TestMethod]
        public void EnviarNickTest()
        {
            var groupManagerMock = new Mock<IGroupManager>();
            string connectionId = Guid.NewGuid().ToString();
            var mockClients = new Mock<IHubCallerConnectionContext<dynamic>>();
            myHub.Clients = mockClients.Object;
            myHub.Context = criaContexto(connectionId);
            myHub.Groups = groupManagerMock.Object;
            dynamic all = new ExpandoObject();
            string tokenSala = null;
            all.token = new Action<string>((token) =>
            {
                tokenSala = token;
            });
            mockClients.Setup(m => m.Caller).Returns((ExpandoObject)all);
            myHub.GenerateToken();
            dynamic enviaNick = new ExpandoObject();
            bool redirectTrue = false;
            enviaNick.redirectTutorial = new Action<bool>((redirect) =>
            {
                redirectTrue = redirect;
            });
            mockClients.Setup(m => m.Caller).Returns((ExpandoObject)enviaNick);
            myHub.EnviaNick("teste",tokenSala);
            Assert.IsTrue(redirectTrue);
        }

    }
}
