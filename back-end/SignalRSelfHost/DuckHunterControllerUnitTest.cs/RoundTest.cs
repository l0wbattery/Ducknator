using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SignalRSelfHost.Dominio.Entidades;

namespace DuckHunterControllerUnitTest.cs
{
    [TestClass]
    public class RoundTest
    {
        [TestMethod]
        public void GeraRound()
        {
            Round round = new Round();
            Assert.IsTrue(round.MiniRounds.Count == 5);
            Assert.IsTrue(round.Pontuacao == 0);
            Assert.IsTrue(round.QntdPatosMortos == 0);
        }
    }
}
