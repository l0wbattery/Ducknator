using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SignalRSelfHost.infra;
using SignalRSelfHost;
using SignalRSelfHost.Dominio.Entidades;
using System.Linq;

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

        

        [TestMethod]
        public void Deve_SalvarPartida_Corretamente()
        {
            var firstResult = testContextInstance.Partidas.ToList().Count();

            myHub.SalvaPartida("Bel", 5, 2);

            var finalResult = testContextInstance.Partidas.ToList().Count();

            Assert.IsTrue(firstResult < finalResult);
            
        }
    }
}
