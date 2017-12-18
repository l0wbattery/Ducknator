using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SignalRSelfHost.Dominio.Entidades;

namespace DuckHunterControllerUnitTest.cs
{
    /// <summary>
    /// Summary description for SalaUnitTest
    /// </summary>
    [TestClass]
    public class SalaUnitTest
    {
        [TestMethod]
        public void Deve_CriarSala_Corretamente ()
        {
            Sala sala = new Sala("2000", "20");

            Assert.AreEqual(sala.NomeUsuario, "Player");
            Assert.AreEqual(sala.Token, "2000");
            Assert.IsTrue(sala.EmTutorial);
            Assert.IsTrue(sala.Nivel == 0);
        }

        [TestMethod]
        public void Deve_SubirDeNivel_Corretamente()
        {
            Sala sala = new Sala("2000", "20");

            for (var i=0; i<10; i++)
            {
                sala.NextRound();
            }

            var resultado = sala.Nivel;

            Assert.IsTrue(resultado == 10);
        }

        [TestMethod]
        public void Deve_LimitarMovimentoDaMira_Corretamente()
        {
            Sala sala = new Sala("2000", "20");

            sala.xBola = 1000;
            sala.yBola = 1000;

            sala.LimitaMovimentoDaMira();

            Assert.IsTrue(sala.xBola == 710);
            Assert.IsTrue(sala.yBola == 510);
        }

        [TestMethod]
        public void Deve_FinalizarTutorial_Corretamente()
        {
            Sala sala = new Sala("2000", "20");

            var estadoInicialPatoTutorial = sala.patoTutorial.Vivo;
            var estadoInicialSala = sala.getEstadoTutorial();

            sala.finalizaTutorial();

            var estadoFinalPatoTutorial = sala.patoTutorial.Vivo;
            var estadoFinalSala = sala.getEstadoTutorial();

            Assert.IsTrue(estadoInicialPatoTutorial);
            Assert.IsTrue(estadoInicialSala);

            Assert.IsFalse(estadoFinalPatoTutorial);
            Assert.IsFalse(estadoFinalSala);
        }
    }
}
