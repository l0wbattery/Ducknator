using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SignalRSelfHost.Dominio.Entidades;

namespace DuckHunterControllerUnitTest.cs
{
    /// <summary>
    /// Summary description for MiniRoundUnitTest
    /// </summary>
    [TestClass]
    public class MiniRoundUnitTest
    {
        [TestMethod]
        public void Deve_CriarMiniRound_Corretamente()
        {
            MiniRound miniRound = new MiniRound();

            Assert.IsTrue(miniRound.Patos.Count == 2);
            Assert.IsTrue(miniRound.Posicoes == 0);
        }

        [TestMethod]
        public void Deve_AumentarPosicoes_Corretamente()
        {
            MiniRound miniRound = new MiniRound();

            for (var i=0; i<=10; i++)
            {
                miniRound.GetNextPosition();
            }

            var resultado = miniRound.getPosicoes();

            Assert.IsTrue(miniRound.Patos.Count == 2);
            Assert.IsTrue(miniRound.Posicoes == 10);
        }
    }
}
