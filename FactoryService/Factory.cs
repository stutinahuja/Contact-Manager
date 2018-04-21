using DataAccessLayer;
using Interfaces;

namespace FactoryService
{
    public static class Factory
    {
        public static IDataAccessManager GetDataAccessManager()
        {
            return new DataAccessManager();
        }
    }
}
