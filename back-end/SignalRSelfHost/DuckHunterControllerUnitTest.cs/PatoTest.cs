using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SignalRSelfHost.Dominio.Entidades;

namespace DuckHunterControllerUnitTest.cs
{
    [TestClass]
    public class PatoTest
    {
        [TestMethod]
        public void CriaPatoTutirial()
        {
            Pato pato = new Pato(new Posicao(250,250));
            Assert.IsTrue(pato.Posicoes[0].PosicaoX == 250);
            Assert.IsTrue(pato.Posicoes[0].PosicaoY == 250);
            Assert.IsTrue(pato.Vivo);
        }
        [TestMethod]
        public void CriaPato()
        {
            Pato pato = new Pato();
            Assert.IsTrue(pato.Posicoes.Count == 9);
            Assert.IsTrue(pato.Vivo);
        }
    }
}
