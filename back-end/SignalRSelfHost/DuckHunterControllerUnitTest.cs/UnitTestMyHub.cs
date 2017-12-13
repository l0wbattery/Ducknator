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
    }
}
