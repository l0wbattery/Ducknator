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
        private IDuckhunterContext testContextInstance;
        private MyHub myHub = new MyHub();

        public UnitTestMyHub(IDuckhunterContext testContextInstance)
        {
            this.testContextInstance = testContextInstance;
        }

        

        
        [TestMethod]
        public void Deve_SalvarPartida_Corretamente()
        {
            var firstResult = testContextInstance.Partidas.ToList().Count();
            Partida partida = new Partida("Bel", 10, 2);
            testContextInstance.Partidas.Add(partida);
            testContextInstance.SaveChanges();

            var finalResult = testContextInstance.Partidas.ToList().Count();

            Assert.IsTrue(firstResult < finalResult);
            
        }
    }
}
