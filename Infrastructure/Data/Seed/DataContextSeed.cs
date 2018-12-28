using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Infrastructure.Data.Seed
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory, int? retry = 0)
        {
        }
    }
}
