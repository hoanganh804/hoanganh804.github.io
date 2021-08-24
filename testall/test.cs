using System;

namespace Loop
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = 12;
            int answer = 0;
            for (int i = 1; i <= n; i++)
            {
                if (n % i == 0)
                {
                    answer++;
                }
            }
            Console.Write(answer);
        }
    }
}