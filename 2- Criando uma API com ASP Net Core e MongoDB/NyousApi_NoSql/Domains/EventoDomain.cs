using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NyousApi_NoSql.Domains
{
    public class EventoDomain : BaseDomain
    {   
        public string Nome { get; set; }
        public string UrlImagem { get; set; }
        public string Link { get; set; }
        public DateTime DataInicial { get; set; }
        public DateTime DataFinal { get; set; }
        public string Descricao { get; set; }

        // Não temos mais aquelas relações de foreign key e primary key
        public string Categoria { get; set; } 
    }
}
