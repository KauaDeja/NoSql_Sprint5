using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NyousApi_NoSql.Context
{
    public class NyousDatabaseSettings : INyousDatabaseSettings
    {
        public string EventosCollectionName { get; set; }
        public string ConnectionString { get; set ; }
        public string DatabaseName { get ; set; }
    }

    public interface INyousDatabaseSettings
    {   
        // Difinimos nossas propriedadas referentes a interface, em relação as do appsettings.json
        public string EventosCollectionName { get; set; }
        public string ConnectionString{ get; set; }
        public string DatabaseName { get; set; }


    }

}
