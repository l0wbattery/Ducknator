using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace ConsoleApp1
{
    class Program
    {
        public static int i = 0;
        public static void Main()
        {
            System.Timers.Timer aTimer = new System.Timers.Timer();
            aTimer.Elapsed += new ElapsedEventHandler(OnTimedEvent);
            aTimer.Interval = 1000;
            aTimer.Enabled = true;
            while (i < 5) ;
            Console.WriteLine("Acabou?");
        }

        // Specify what you want to happen when the Elapsed event is raised.
        private static void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            i++;
            Console.WriteLine("Hello World!");
        }
    }
}
