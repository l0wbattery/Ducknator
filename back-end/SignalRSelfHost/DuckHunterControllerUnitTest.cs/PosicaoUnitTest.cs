using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SignalRSelfHost.Dominio.Entidades;

namespace DuckHunterControllerUnitTest.cs
{
    /// <summary>
    /// Summary description for PosicaoUnitTest
    /// </summary>
    [TestClass]
    public class PosicaoUnitTest
    {
        [TestMethod]
        public void Deve_GerarDuasPosicoes_Corretamente ()
        {
            Posicao posicao = new Posicao();

            Assert.IsTrue(posicao.PosicaoX > 0 && posicao.PosicaoX < 801);
            Assert.IsTrue(posicao.PosicaoY > 0 && posicao.PosicaoY < 601);
        }

        [TestMethod]
        public void Deve_ReceberDuasPosicoes_Corretamente()
        {
            Posicao posicao = new Posicao(120, 140);

            Assert.IsTrue(posicao.PosicaoX == 120);
            Assert.IsTrue(posicao.PosicaoY == 140);
        }
    }
}
